import {
  Body,
  Controller,
  Inject,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common'
import { Response } from 'express'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from './users.service'
import { SignupUserDto } from './dto/signup-user.dto'
import { SigninUserDto } from './dto/signin-user.dto'

@Controller('users')
export class UsersController {
  @Inject(JwtService)
  private jwtService: JwtService

  constructor(private readonly usersService: UsersService) {}

  @Post('signin')
  async signin(@Body(ValidationPipe) signinUserDto: SigninUserDto, @Res({ passthrough: true }) res: Response) {
    const user = await this.usersService.signin(signinUserDto)

    if (user) {
      const token = await this.jwtService.signAsync({
        user: {
          id: user.id,
          username: user.username,
        },
      })

      res.setHeader('authorization', `bearer ${token}`)

      return '登录成功'
    }
    else { return '登录失败' }
  }

  @Post('signup')
  async signup(@Body(ValidationPipe) signupUserDto: SignupUserDto) {
    return await this.usersService.signup(signupUserDto)
  }
}
