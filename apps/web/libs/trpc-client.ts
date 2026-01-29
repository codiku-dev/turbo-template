import { CreateTRPCReact, createTRPCReact, httpBatchLink, loggerLink } from "@trpc/react-query";
import { AppRouter } from "@repo/trpc/router";
import { QueryClient } from "@tanstack/react-query";

export const trpc: CreateTRPCReact<AppRouter, object> = createTRPCReact<AppRouter, object>();

export const queryClient = new QueryClient();

export const trpcClient = trpc.createClient({

    links: [
        loggerLink({
            enabled: (opts) =>
                (process.env.NODE_ENV === 'development' &&
                    typeof window !== 'undefined') ||
                (opts.direction === 'down' && opts.result instanceof Error),
        }),
        httpBatchLink({
            url:
                typeof window !== "undefined"
                    ? (process.env.NEXT_PUBLIC_TRPC_URL ?? "")
                    : (process.env.TRPC_URL ?? "http://localhost:3090/trpc"),
        }),
    ],
});