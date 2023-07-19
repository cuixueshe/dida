import { HttpException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { md5 } from '../utils/md5'
import { SignupUserDto } from './dto/signup-user.dto'
import { User } from './schemas/user.schema'
import { SigninUserDto } from './dto/signin-user.dto'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async signin(signinUserDto: SigninUserDto) {
    const user = await this.userModel.findOne({
      username: signinUserDto.username,
    })

    if (!user)
      throw new HttpException('帐号或密码错误', 200)

    if (user.password !== md5(signinUserDto.password))
      throw new HttpException('帐号或密码错误', 200)

    return user
  }

  async signup(signupUserDto: SignupUserDto) {
    const user = await this.userModel
      .findOne({
        username: signupUserDto.username,
      })
      .exec()

    if (user)
      throw new HttpException('用户已存在', 200)

    try {
      // eslint-disable-next-line new-cap
      const createUser = new this.userModel({
        username: signupUserDto.username,
        password: md5(signupUserDto.password),
      })

      createUser.save()
      return '注册成功'
    }
    catch (e) {
      return '注册失败'
    }
  }
}
