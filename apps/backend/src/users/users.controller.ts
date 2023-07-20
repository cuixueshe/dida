import {
  Body,
  Controller,
  HttpException,
  Inject,
  Post,
  ValidationPipe,
} from '@nestjs/common'
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
  async signin(@Body(ValidationPipe) signinUserDto: SigninUserDto) {
    const user = await this.usersService.signin(signinUserDto)

    if (user) {
      const token = await this.signToken(user)
      return this.mapResponse(user, token)
    }
    else {
      throw new HttpException('登录失败', 200)
    }
  }

  @Post('signup')
  async signup(@Body(ValidationPipe) signupUserDto: SignupUserDto) {
    if (signupUserDto.password !== signupUserDto.confirmPassword)
      throw new HttpException('两次输入的密码不一致', 200)

    const user = await this.usersService.signup(signupUserDto)

    if (user) {
      const token = await this.signToken(user)
      return this.mapResponse(user, token)
    }
    else {
      throw new HttpException('注册失败', 200)
    }
  }

  private async signToken(user) {
    const token = await this.jwtService.signAsync({
      user: {
        id: user.id,
        username: user.username,
      },
    })

    return token
  }

  private mapResponse(user, token) {
    return {
      user: {
        username: user.username,
      },
      token,
    }
  }
}
