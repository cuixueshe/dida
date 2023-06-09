import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ProjectsService } from './projects.service'
import { Project } from './schemas/project.schema'
import { CreateProjectDto } from './dto/create-project.dto'

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectsService.create(createProjectDto)
  }

  @Get()
  findAll() {
    return this.projectsService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Project> {
    return this.projectsService.findOne(id)
  }
}
