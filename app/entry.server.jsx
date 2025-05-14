import { RemixServer } from "@remix-run/react";
import { renderToPipeableStream } from "react-dom/server";

export default function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext
) {
  return new Promise((resolve, reject) => {
    let didError = false;

    const { pipe } = renderToPipeableStream(
      <RemixServer context={remixContext} url={request.url} />,
      {
        onShellReady() {
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(
              new ReadableStream({
                start(controller) {
                  const { Writable } = require("stream");
                  const writable = new Writable({
                    write(chunk, encoding, callback) {
                      controller.enqueue(chunk);
                      callback();
                    },
                    final(callback) {
                      controller.close();
                      callback();
                    }
                  });
                  pipe(writable);
                }
              }),
              {
                status: didError ? 500 : responseStatusCode,
                headers: responseHeaders,
              }
            )
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          didError = true;
          console.error(error);
        },
      }
    );
  });
} 