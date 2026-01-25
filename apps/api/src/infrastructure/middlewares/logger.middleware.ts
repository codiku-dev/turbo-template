import { TRPCMiddleware, MiddlewareOptions } from 'nestjs-trpc';
import { Inject, Injectable, ConsoleLogger } from '@nestjs/common';

@Injectable()
export class LoggedMiddleware implements TRPCMiddleware {
    constructor(
        @Inject(ConsoleLogger) private readonly consoleLogger: ConsoleLogger
    ) { }

    async use(opts: MiddlewareOptions) {
        const start = Date.now();
        const { next, path, type } = opts;
        const result = await next();

        const durationMs = Date.now() - start;
        const meta = { path, type, durationMs }

        console.log(`[${new Date().toISOString()}]\nREQUEST : http://localhost:3090/trpc/` + path, "\nMETA : ", JSON.stringify(meta, null, 2), "\nRESPONSE : ", JSON.stringify(result.data, null, 2), "\n\n");

        return result;
    }
}