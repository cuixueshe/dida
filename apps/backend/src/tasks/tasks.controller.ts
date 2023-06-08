import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { Task } from './schemas/task.schema'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(createTaskDto)
  }

  @Get()
  findAll(@Query('projectId') projectId?: string, @Query('status') status?: string) {
    return this.tasksService.findAll(projectId, status)
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Task> {
    return this.tasksService.findOne(id)
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Task> {
    return this.tasksService.delete(id)
  }

  @Patch(':id')
  async update(
  @Param('id') id: string,
  @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.update(id, updateTaskDto)
  }
}
