import { TRPCMiddleware, MiddlewareOptions } from 'nestjs-trpc';
import { Inject, Injectable, ConsoleLogger } from '@nestjs/common';

const SEP = '────────────────────────────────────────────────────────';
const SEP_THIN = '────────────────────────────────────────────────';

@Injectable()
export class LoggedMiddleware implements TRPCMiddleware {
    constructor(
        @Inject(ConsoleLogger) private readonly consoleLogger: ConsoleLogger
    ) { }

    private jsonBlock(value: unknown): string {
        if (value === undefined) return '—';
        const str = JSON.stringify(value, null, 2);
        return str.split('\n').map((line) => '  ' + line).join('\n');
    }

    private buildLog(requestUrl: string, path: string, type: string, durationMs: number, input: unknown): string {
        const lines: string[] = [
            '',
            SEP,
            '  INCOMING REQUEST URL',
            SEP_THIN,
            `  ${requestUrl}`,
            '',
            '  META',
            SEP_THIN,
            `  path       ${path}`,
            `  type       ${type}`,
            `  duration   ${durationMs} ms`,
            '',
        ];
        if (input !== undefined && input !== null && Object.keys(input as object).length > 0) {
            lines.push('  INPUT', SEP_THIN, this.jsonBlock(input), '');
        }
        return lines.join('\n');
    }

    async use(opts: MiddlewareOptions) {
        const start = Date.now();
        const { next, path, type, input } = opts;
        const baseUrl = process.env.TRPC_URL ?? '';
        const requestUrl = `${baseUrl}/${path}`;

        try {
            const result = await next();
            const durationMs = Date.now() - start;
            const header = this.buildLog(requestUrl, path, type, durationMs, input);

            if (result?.ok === false) {
                const errPayload = result?.error ?? result;
                const log =
                    header +
                    '\n  RESPONSE (error)\n' + SEP_THIN + '\n' +
                    this.jsonBlock(errPayload) + '\n' + SEP + '\n';
                this.consoleLogger.error(log);
            } else {
                const payload = result?.data ?? result;
                const log =
                    header +
                    '\n  RESPONSE\n' + SEP_THIN + '\n' +
                    this.jsonBlock(payload) + '\n' + SEP + '\n';
                this.consoleLogger.log(log);
            }

            return result;
        } catch (err) {
            const durationMs = Date.now() - start;
            const log =
                this.buildLog(requestUrl, path, type, durationMs, input) +
                '\n  RESPONSE (thrown)\n' + SEP_THIN + '\n' +
                this.jsonBlock(err instanceof Error ? { message: err.message, name: err.name } : err) + '\n' + SEP + '\n';
            this.consoleLogger.error('\n' + log);
            throw err;
        }
    }
}