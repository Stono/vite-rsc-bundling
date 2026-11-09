import { createFromReadableStream } from "@vitejs/plugin-rsc/browser";
import { hydrateRoot } from "react-dom/client";

const response = await fetch(`${window.location.pathname}.rsc`);
const root = await createFromReadableStream(response.body);
hydrateRoot(document, root);
