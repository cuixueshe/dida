import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Cat } from './schemas/cat.schema'
import { CreateCatDto } from './dto/create-cat.dto'

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    // eslint-disable-next-line new-cap
    const createdCat = new this.catModel(createCatDto)
    return createdCat.save()
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec()
  }
}
