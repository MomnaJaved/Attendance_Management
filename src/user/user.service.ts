import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities';
import { CreateUserDto } from './dto';
import { UpdateUserDto } from './dto';
import { LoginUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User | null> {
    const userData = this.userRepository.create(createUserDto);
    return await this.userRepository.save(userData);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      console.log(`User with ID ${id} not found`);
      return null;
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      console.log(`User with email ${email} not found`);
      return null;
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    const existingUser = await this.findOne(id);
    if (!existingUser) {
      console.log(`User with ID ${id} not found`);
      return null;
    }
    const updatedUser = this.userRepository.merge(existingUser, updateUserDto);
    return await this.userRepository.save(updatedUser);
  }

  async remove(id: string): Promise<{ message: string } | null> {
    const existingUser = await this.findOne(id);
    if (!existingUser) {
      console.log(`User with ID ${id} not found`);
      return null;
    }
    await this.userRepository.remove(existingUser);
    return { message: 'User deleted successfully' };
  }

  async register(createUserDto: CreateUserDto): Promise<User | null> {
    if (!createUserDto.firstName) {
      console.log('First name is required');
      return null;
    }

    const userExists = await this.userRepository.findOne({
      where: { firstName: createUserDto.firstName },
    });

    if (userExists) {
      console.log('User already exists');
      return null;
    }

    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  async login(loginUserDto: LoginUserDto): Promise<User | null> {
    const { id, password } = loginUserDto;
    const user = await this.findOne(id);

    if (!user) {
      console.log('User not found');
      return null;
    }

    if (user.password !== password) {
      console.log('Incorrect password');
      return null;
    }

    return user;
  }
}
