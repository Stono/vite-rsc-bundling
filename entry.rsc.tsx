import { renderToReadableStream } from "@vitejs/plugin-rsc/rsc/server";

import { App } from "./app.tsx";

export default async function handler(request: Request): Promise<Response> {
  const rscStream = renderToReadableStream(<App />);

  if (new URL(request.url).pathname.endsWith(".rsc")) {
    return new Response(rscStream, {
      headers: { "Content-Type": "text/x-component;charset=utf-8" },
    });
  }

  const ssrEntry = await import.meta.viteRsc.loadModule<typeof import("./entry.ssr.tsx")>(
    "ssr",
    "index",
  );
  const htmlStream = await ssrEntry.handleSsr(rscStream);

  return new Response(htmlStream, {
    headers: { "Content-Type": "text/html;charset=utf-8" },
  });
}

if (import.meta.hot) {
  import.meta.hot.accept();
}
