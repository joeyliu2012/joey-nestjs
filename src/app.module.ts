import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './modules/posts/posts.module';
import { DemoMiddleware } from './core/middlewares/demo.middleware';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { DemoRolesGuard } from './core/guards/demo-roles.guard';
import { LogginInterceptor } from './core/interceptors/loggin.interceptor';

@Module({
  imports: [PostsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: DemoRolesGuard
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LogginInterceptor
    }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DemoMiddleware)
      .forRoutes('posts');
  }
}
