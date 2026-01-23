import { CreateTRPCReact, createTRPCReact, httpBatchLink } from "@trpc/react-query";
import { AppRouter } from "@repo/trpc/router";
import { QueryClient } from "@tanstack/react-query";

export const trpc: CreateTRPCReact<AppRouter, object> = createTRPCReact<AppRouter, object>();

export const queryClient = new QueryClient();

export const trpcClient = trpc.createClient({
    links: [
        httpBatchLink({
            url: "http://localhost:3090/trpc",
        }),
    ],
});