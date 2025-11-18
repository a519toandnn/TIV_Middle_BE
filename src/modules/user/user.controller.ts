import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  create(@Body('user') createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('users/login')
  login(@Body('user') createUserDto: CreateUserDto) {
    return this.userService.login(createUserDto);
  }

  @Get('user')
  findAll() {
    return this.userService.findAll();
  }

  @Put('user')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

}
