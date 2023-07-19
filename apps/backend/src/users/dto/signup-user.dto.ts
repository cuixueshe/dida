import { Equals, IsNotEmpty, IsString, Length } from 'class-validator'

export class SignupUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(6, 30)
  username: string

  @IsString()
  @IsNotEmpty()
  @Length(6, 30)
  password: string

  @IsString()
  @IsNotEmpty()
  @Length(6, 30)
  @Equals('password', { message: '确认密码必须和密码一致' })
  confirmPassword: string
}
