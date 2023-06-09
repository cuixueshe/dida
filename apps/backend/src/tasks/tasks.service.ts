import { Model, Types } from 'mongoose'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Task } from './schemas/task.schema'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const position = await this.generatePosition(createTaskDto)
    const projectId = new Types.ObjectId(createTaskDto.projectId)

    // eslint-disable-next-line new-cap
    const createdTask = new this.taskModel({
      ...createTaskDto,
      projectId,
      position,
    })
    return createdTask.save()
  }

  async findAll(projectId?: string, status?: string): Promise<Task[]> {
    const query: {
      projectId?: Types.ObjectId
      status?: string
    } = {}

    if (projectId)
      query.projectId = new Types.ObjectId(projectId)

    if (status)
      query.status = status

    return this.taskModel.find(query).sort({ position: -1 }).exec()
  }

  async findOne(id: string): Promise<Task> {
    return this.taskModel.findById(id).exec()
  }

  async delete(id: string): Promise<Task> {
    return this.taskModel.findByIdAndDelete(id).exec()
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const update: { projectId?: Types.ObjectId } = {}

    if (updateTaskDto.projectId)
      update.projectId = new Types.ObjectId(updateTaskDto.projectId)

    const updatedTask = await this.taskModel
      .findByIdAndUpdate(id, { $set: { ...updateTaskDto, ...update } }, { new: true })
      .exec()

    if (!updatedTask)
      throw new NotFoundException(`Task with ID "${id}" not found`)

    return updatedTask
  }

  async generatePosition(createTaskDto: CreateTaskDto) {
    const highestPositionTask = await this.taskModel
      .findOne({ projectId: new Types.ObjectId(createTaskDto.projectId) })
      .sort({ position: -1 })
      .exec()
    return highestPositionTask ? highestPositionTask.position + 1 : 0
  }
}
