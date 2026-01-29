import { TRPCMiddleware, MiddlewareOptions } from 'nestjs-trpc';
import { Inject, Injectable, ConsoleLogger } from '@nestjs/common';


@Injectable()
export class LoggedMiddleware implements TRPCMiddleware {
    constructor(
        @Inject(ConsoleLogger) private readonly consoleLogger: ConsoleLogger
    ) { }

    private formatLine(label: string, value: unknown): string {
        const str = value !== undefined ? JSON.stringify(value, null, 2) : '';
        return `${label}\n${str}`;
    }

    async use(opts: MiddlewareOptions) {
        const start = Date.now();
        const { next, path, type, input } = opts;
        const meta = { path, type, durationMs: Date.now() - start };
        const request = `${process.env.TRPC_URL}/${path}`;

        const buildLog = (): string => {
            meta.durationMs = Date.now() - start;
            return [
                `REQUEST : ${request}`,
                this.formatLine('INPUT :', input),
                this.formatLine('META :', meta),
            ].join('\n');
        };

        try {
            const result = await next();

            if (result?.ok === false) {
                const errPayload = result?.error ?? result;
                const log = [buildLog(), this.formatLine('ERROR :', errPayload)].join('\n') + '\n';
                this.consoleLogger.error(log);
            } else {
                const payload = result?.data ?? result;
                const log = [buildLog(), this.formatLine('RESPONSE :', payload)].join('\n') + '\n';
                this.consoleLogger.log(log);
            }

            return result;
        } catch (err) {
            const log = [buildLog(), this.formatLine('ERROR :', err)].join('\n') + '\n';
            this.consoleLogger.error("\n\n" + log);
            throw err;
        }
    }
}