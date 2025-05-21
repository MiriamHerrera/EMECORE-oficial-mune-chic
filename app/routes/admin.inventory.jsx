// app/routes/admin/inventory.jsx
import { useState, useEffect } from 'react';
import { Form, useActionData, useLoaderData, Outlet, useNavigation } from '@remix-run/react';
import { json, redirect } from '@remix-run/node';
import { prisma } from '~/utils/prisma.server';
import { requireAdmin } from '~/utils/auth.server';
import Swal from 'sweetalert2';

// Loader to fetch products with their details
export async function loader({ request }) {
  // Check if user is authenticated
  await requireAdmin(request);
  
  try {
    const products = await prisma.product.findMany({
      include: {
        brand: true,
        details: true,
        categories: { include: { category: true } },
        tags: {
          include: { tag: true }
        }
      },
      orderBy: { created_at: 'desc' }
    });

    const brands = await prisma.brand.findMany();
    const categories = await prisma.category.findMany();
    const tags = await prisma.tag.findMany();

    return json({ products, brands, categories, tags });
  } catch (error) {
    console.error("Database error:", error);
    return json({ 
      products: [], 
      brands: [], 
      categories: [], 
      tags: [],
      error: "Failed to load data"
    });
  }
}

// Action to handle product creation
export async function action({ request }) {
  // Check if user is authenticated
  await requireAdmin(request);

  const formData = await request.formData();
  const intent = formData.get('intent');

  // Crear producto (ya lo tienes)
  if (intent === 'create') {
    const name = formData.get('name');
    const description = formData.get('description');
    const price = parseFloat(formData.get('price'));
    const brandId = parseInt(formData.get('brandId'));
    const categoryId = parseInt(formData.get('categories'));
    const tagIds = formData.getAll('tags').map(id => parseInt(id));
    
    // Create slug from name
    const slug = name.toLowerCase().replace(/\s+/g, '-');

    try {
      const product = await prisma.product.create({
        data: {
          name,
          slug,
          description,
          price,
          brand_id: brandId,
          categories: {
            create: categoryId ? [{ category: { connect: { id: categoryId } } }] : []
          },
          tags: {
            create: tagIds.map(tagId => ({
              tag: { connect: { id: tagId } }
            }))
          },
          details: {
            create: {
              stock: 0,
              sku: `SKU-${Date.now()}`
            }
          }
        }
      });

      return redirect('/admin/inventory');
    } catch (error) {
      return json({ error: 'Error creating product' }, { status: 400 });
    }
  }

  // Eliminar producto
  if (intent === 'delete') {
    const id = formData.get('id');
    if (id && !isNaN(Number(id))) {
      try {
        // Elimina relaciones hijas primero
        await prisma.productDetail.deleteMany({ where: { productId: Number(id) } });
        await prisma.productCategory.deleteMany({ where: { productId: Number(id) } });
        await prisma.productTag.deleteMany({ where: { productId: Number(id) } });
        // Ahora elimina el producto
        await prisma.product.delete({
          where: { id: Number(id) }
        });
        return redirect('/admin/inventory');
      } catch (error) {
        return json({ error: 'Error deleting product' }, { status: 400 });
      }
    } else {
      return json({ error: 'Invalid product id' }, { status: 400 });
    }
  }

  // Editar producto
  if (intent === 'edit') {
    const id = formData.get('id');
    const name = formData.get('name');
    const description = formData.get('description');
    const price = parseFloat(formData.get('price'));
    const brandId = parseInt(formData.get('brandId'));
    const status = formData.get('status');
    const categoryId = parseInt(formData.get('categoryId'));

    if (id && name && !isNaN(price)) {
      try {
        // Elimina relaciones anteriores
        await prisma.productCategory.deleteMany({ where: { productId: Number(id) } });
        if (categoryId && !isNaN(categoryId)) {
          await prisma.productCategory.create({
            data: {
              productId: Number(id),
              categoryId: categoryId,
            }
          });
        }

        await prisma.product.update({
          where: { id: Number(id) },
          data: {
            name,
            description,
            price,
            brand_id: brandId || null,
            status: status || "active",
          }
        });
        return redirect('/admin/inventory');
      } catch (error) {
        return json({ error: 'Error editing product' }, { status: 400 });
      }
    }
  }

  return json({ error: 'Invalid intent' }, { status: 400 });
}

export default function AdminInventory() {
  const loaderData = useLoaderData();
  const { products = [], brands = [], categories = [], tags = [] } = loaderData || {};
  const actionData = useActionData();
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const navigation = useNavigation();

  // Cierra el modal de edición cuando la navegación termina y no hay error
  useEffect(() => {
    // Cierra el modal de edición cuando la navegación termina y estaba editando
    if (navigation.state === "idle" && isEditing) {
      setIsEditing(null);
    }
    // Cierra el modal de creación cuando la navegación termina y estaba creando
    if (navigation.state === "idle" && isCreating) {
      setIsCreating(false);
    }
  }, [navigation.state]);
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inventory Management</h1>
        <button
          onClick={() => setIsCreating(true)}
          className="bg-[#B88A1A] text-white px-4 py-2 rounded hover:bg-[#a07616]"
        >
          Add New Product
        </button>
      </div>

      {/* Create Product Form */}
      {isCreating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">Create New Product</h2>
            <Form method="post" className="space-y-4">
              <input type="hidden" name="intent" value="create" />
              
              <div>
                <label className="block mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full border rounded p-2"
                />
              </div>

              <div>
                <label className="block mb-1">Description</label>
                <textarea
                  name="description"
                  className="w-full border rounded p-2"
                />
              </div>

              <div>
                <label className="block mb-1">Price</label>
                <input
                  type="number"
                  name="price"
                  step="0.01"
                  required
                  className="w-full border rounded p-2"
                />
              </div>

              <div>
                <label className="block mb-1">Brand</label>
                <select name="brandId" className="w-full border rounded p-2">
                  <option value="">Select a brand</option>
                  {brands.map(brand => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1">Categories</label>
                <select
                  name="categories"
                  className="w-full border rounded p-2"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1">Tags</label>
                <select
                  name="tags"
                  multiple
                  className="w-full border rounded p-2"
                >
                  {tags.map(tag => (
                    <option key={tag.id} value={tag.id}>
                      {tag.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#B88A1A] text-white px-4 py-2 rounded"
                >
                  Create Product
                </button>
              </div>
            </Form>
          </div>
        </div>
      )}

      {/* Edit Product Form */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
            <Form method="post" className="space-y-4">
              <input type="hidden" name="intent" value="edit" />
              <input type="hidden" name="id" value={isEditing.id} />

              <div>
                <label className="block mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={isEditing.name}
                  required
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block mb-1">Description</label>
                <textarea
                  name="description"
                  defaultValue={isEditing.description}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block mb-1">Price</label>
                <input
                  type="number"
                  name="price"
                  step="0.01"
                  defaultValue={isEditing.price}
                  required
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block mb-1">Brand</label>
                <select
                  name="brandId"
                  defaultValue={isEditing.brand_id || ""}
                  className="w-full border rounded p-2"
                >
                  <option value="">Select a brand</option>
                  {brands.map(brand => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1">Status</label>
                <select
                  name="status"
                  defaultValue={isEditing.status || "active"}
                  className="w-full border rounded p-2"
                  required
                >
                  <option value="active">Activo</option>
                  <option value="inactive">Inactivo</option>
                </select>
              </div>
              <div>
                <label className="block mb-1">Categoría</label>
                <select
                  name="categoryId"
                  defaultValue={
                    isEditing.categories?.[0]?.category_id // o prueba con categoryId si no funciona
                      || isEditing.categories?.[0]?.categoryId
                      || ""
                  }
                  className="w-full border rounded p-2"
                  required
                >
                  <option value="">Selecciona una categoría</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(null)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#B88A1A] text-white px-4 py-2 rounded"
                >
                  Save Changes
                </button>
              </div>
            </Form>
          </div>
        </div>
      )}

      {/* Error message if any */}
      {loaderData?.error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {loaderData.error}
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Brand
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {product.image_url && (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="h-10 w-10 rounded-full mr-3"
                        />
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {product.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {product.brand?.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {product.categories[0]?.category?.name || "—"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {product.price != null && !isNaN(Number(product.price))
                        ? `$${Number(product.price).toFixed(2)}`
                        : "—"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {product.details[0]?.stock || 0}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {product.status || 'inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => setIsEditing(product)}
                      className="text-[#B88A1A] hover:text-[#a07616] mr-3"
                    >
                      Edit
                    </button>
                    <Form
                      method="post"
                      style={{ display: "inline" }}
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const result = await Swal.fire({
                          title: '¿Seguro que deseas eliminar este producto?',
                          text: "Esta acción no se puede deshacer.",
                          icon: 'warning',
                          showCancelButton: true,
                          confirmButtonColor: '#B88A1A',
                          cancelButtonColor: '#d33',
                          confirmButtonText: 'Sí, eliminar',
                          cancelButtonText: 'Cancelar'
                        });
                        if (result.isConfirmed) {
                          e.target.submit();
                        }
                      }}
                    >
                      <input type="hidden" name="intent" value="delete" />
                      <input type="hidden" name="id" value={product.id} />
                      <button
                        type="submit"
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </Form>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Outlet />
    </div>
  );
}