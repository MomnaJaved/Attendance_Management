/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userData = this.userRepository.create(createUserDto);
    return await this.userRepository.save(userData);
  }

  async findAll() {
    return (await this.userRepository.find()) as User[];
  }

  async findOne(id: string) {
    const userData = await this.userRepository.findOneBy({ id });
    if (!userData) {
      throw new HttpException('User Not Found', 404);
    }
    return userData;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const existingUser = await this.findOne(id);
    const userData = this.userRepository.merge(existingUser, updateUserDto);
    return await this.userRepository.save(userData);
  }

  async remove(id: string) {
    const existingUser = await this.findOne(id);
    return await this.userRepository.remove(existingUser);
  }
}

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async login(id: string, password: string) {
    const userData = await this.userRepository.findOneBy({ id });
    if (!userData) {
      throw new HttpException('login failed, User not found in database.', 404);
    } else {
      if (userData.password !== password) {
        throw new HttpException('Login failed, Incorrect password.', 400);
      }
      return userData;
    }
  }
}

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const userData = this.userRepository.create(createUserDto);
    return await this.userRepository.save(userData);
  }
}
