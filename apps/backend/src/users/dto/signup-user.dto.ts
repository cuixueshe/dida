import { IsString, Length } from 'class-validator'

export class SignupUserDto {
  @IsString()
  @Length(6, 30)
  username: string

  @IsString()
  @Length(6, 30)
  password: string

  @IsString()
  @Length(6, 30)
  confirmPassword: string
}
