import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor (
    @InjectRepository(UserEntity) private readonly userModel: Repository<UserEntity>,
  ) {
  }

  async create(createUserDto: CreateUserDto) {
    const newUser = this.userModel.create({
      ...createUserDto
    });
    await this.userModel.save(newUser);
    return {
      message: 'User created successfully',
      user: {
        newUser
      },
    };
  }

  async login(createUserDto: CreateUserDto) {
    const {email, username} = createUserDto;
    const user = await this.userModel.findOneBy({ email: email, username: username });
    if (!user) {
      return {
        message: 'Invalid email or username',
      };
    }
    return {
      message: 'Login successful',
      user: {
        ...user
      },
    };
  }

  findAll() {
    return `This action returns all user`;
  }


  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

}
