import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'
import { TaskStatus } from '../const'

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string

  @IsOptional()
  @IsString()
  content?: string

  @IsOptional()
  @IsString()
  projectId?: string

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus

  @IsOptional()
  @IsNumber()
  position?: number
}
