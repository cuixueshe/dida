import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TasksModule } from './tasks/tasks.module'
import { ProjectsModule } from './projects/projects.module'
import { HttpExceptionFilter } from './core/filter/http-exception/http-exception.filter'
import { TransformInterceptor } from './core/interceptor/transform/transform.interceptor'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.env.production'
          : '.env.development',
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: 'cuixueshe-dida',
      signOptions: {
        expiresIn: '7d',
      },
    }),
    ProjectsModule,
    TasksModule,
    MongooseModule.forRoot(process.env.MONGODB_URL),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    AppService,
  ],
})
export class AppModule {}
