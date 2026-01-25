import { All, Controller, Header, Inject, OnModuleInit } from '@nestjs/common';
import { renderTrpcPanel } from 'trpc-ui';
import { AnyRouter } from '@trpc/server';
import { AppRouterHost } from 'nestjs-trpc';


@Controller("docs")
export class TrpcPanelController implements OnModuleInit {
    private appRouter!: AnyRouter;

    constructor(@Inject(AppRouterHost) private readonly appRouterHost: AppRouterHost) { }

    onModuleInit() {
        this.appRouter = this.appRouterHost.appRouter;
    }

    @All()
    @Header('Content-Type', 'text/html')
    panel(): string {
        return renderTrpcPanel(this.appRouter, {
            url: process.env.TRPC_URL,
            meta: {
                title: "API Documentation",
                description:
                    "This is the documentation of the API.",
            },
        })
    }
}