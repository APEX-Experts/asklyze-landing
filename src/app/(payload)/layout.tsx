import { RootLayout, handleServerFunctions } from "@payloadcms/next/layouts";
import type { ServerFunctionClientArgs } from "payload";
import "@payloadcms/next/css";
import { importMap } from "@/app/(payload)/admin/importMap";
import config from "@/payload.config";

const configPromise = Promise.resolve(config);

async function payloadServerFunction(args: ServerFunctionClientArgs) {
  "use server";

  return handleServerFunctions({
    ...args,
    config: configPromise,
    importMap,
  });
}

export default function PayloadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return RootLayout({
    children,
    config: configPromise,
    importMap,
    serverFunction: payloadServerFunction,
  });
}
