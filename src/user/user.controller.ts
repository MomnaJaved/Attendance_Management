import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Public } from 'src/auth/public.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  private handleError(error: unknown, status: HttpStatus) {
    throw new HttpException(
      error instanceof Error ? error.message : 'An unexpected error occurred',
      status,
    );
  }
  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      await this.userService.create(createUserDto);
      return { success: true, message: 'User Created Successfully' };
    } catch (error) {
      this.handleError(error, HttpStatus.BAD_REQUEST);
    }
  }
  @Public()
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      await this.userService.register(createUserDto);
      return { success: true, message: 'User Registered Successfully' };
    } catch (error) {
      this.handleError(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Public()
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      const data = await this.userService.login(loginUserDto);
      return { success: true, data, message: 'Login Successful' };
    } catch (error) {
      this.handleError(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll() {
    try {
      return {
        success: true,
        data: await this.userService.findAll(),
        message: 'Users Fetched Successfully',
      };
    } catch (error) {
      this.handleError(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const data = await this.userService.findOne(id);
      if (!data)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      return { success: true, data, message: 'User Fetched Successfully' };
    } catch (error) {
      this.handleError(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      if (!(await this.userService.update(id, updateUserDto))) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return { success: true, message: 'User Updated Successfully' };
    } catch (error) {
      this.handleError(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      if (!(await this.userService.remove(id))) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return { success: true, message: 'User Deleted Successfully' };
    } catch (error) {
      this.handleError(error, HttpStatus.BAD_REQUEST);
    }
  }
}
