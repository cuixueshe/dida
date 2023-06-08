import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { TaskStatus } from '../const'
import { Project } from '../../projects/schemas/project.schema'

export type TaskDocument = Task & Document

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Task {
  @Prop({ required: true })
  title: string

  @Prop({ default: '' })
  content: string

  @Prop({ enum: Object.values(TaskStatus), default: TaskStatus.ACTIVE })
  status: 'ACTIVE' | 'COMPLETED' | 'REMOVED'

  @Prop({ required: true, type: Types.ObjectId, ref: Project.name })
  projectId: Types.ObjectId

  @Prop({ type: Number })
  position: number
}

export const TaskSchema = SchemaFactory.createForClass(Task)
