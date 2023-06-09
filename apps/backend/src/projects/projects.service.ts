import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Project } from './schemas/project.schema'
import { CreateProjectDto } from './dto/create-project.dto'
@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    // eslint-disable-next-line new-cap
    const createdTask = new this.projectModel(createProjectDto)
    return createdTask.save()
  }

  async findAll(): Promise<Project[]> {
    return this.projectModel.find().exec()
  }

  async findOne(id: string): Promise<Project> {
    return this.projectModel.findById(id).exec()
  }
}
