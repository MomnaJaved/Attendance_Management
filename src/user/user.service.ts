import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
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

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userData = this.userRepository.create(createUserDto);
    return await this.userRepository.save(userData);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user)
      throw new NotFoundException(`User with email ${email} not found`);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.findOne(id);
    const updatedUser = this.userRepository.merge(existingUser, updateUserDto);
    return await this.userRepository.save(updatedUser);
  }

  async remove(id: string): Promise<{ message: string }> {
    const existingUser = await this.findOne(id);
    await this.userRepository.remove(existingUser);
    return { message: 'User deleted successfully' };
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    if (!createUserDto.firstName) {
      throw new BadRequestException('First name is required');
    }

    const userExists = await this.userRepository.findOne({
      where: { firstName: createUserDto.firstName },
    });

    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  async login(loginUserDto: LoginUserDto): Promise<User> {
    const { id, password } = loginUserDto;
    const user = await this.findOne(id);

    if (user.password !== password) {
      throw new BadRequestException('Incorrect password');
    }

    return user;
  }
}
