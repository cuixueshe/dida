import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CatsModule } from './cats/cats.module'
import { TasksModule } from './tasks/tasks.module'

@Module({
  imports: [
    CatsModule,
    TasksModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/dida'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
