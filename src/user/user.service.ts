import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userData = this.userRepository.create(createUserDto);
    return await this.userRepository.save(userData);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User | null> {
    console.log(`Searching for user with ID: ${id}`);
    const user = await this.userRepository.findOne({ where: { id } });
    console.log(`User found:`, user);
    return user || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return (await this.userRepository.findOne({ where: { email } })) || null;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const existingUser = await this.userRepository.findOne({ where: { id } });
    if (!existingUser) {
      throw new HttpException('User Not Found', 404);
    }
    const userData = this.userRepository.merge(existingUser, updateUserDto);
    return await this.userRepository.save(userData);
  }

  async remove(id: string) {
    const existingUser = await this.userRepository.findOne({ where: { id } });
    if (!existingUser) {
      throw new HttpException('User Not Found', 404);
    }
    return await this.userRepository.remove(existingUser);
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    if (!createUserDto.firstName) {
      throw new HttpException('firstName is required', 400);
    }
    const userExists = await this.userRepository.findOne({
      where: { firstName: createUserDto.firstName },
    });
    if (userExists) {
      throw new HttpException('User already exists', 400);
    }
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  async login(loginUserDto: LoginUserDto): Promise<User> {
    const { id, password } = loginUserDto;
    const user = await this.findOne(id);
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    if (user.password !== password) {
      throw new HttpException('Incorrect password', 400);
    }
    return user;
  }
}
