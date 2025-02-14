import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto';
import { UpdateUserDto } from './dto';
import { LoginUserDto } from './dto';
import { AuthGuard } from '../auth/auth.guard';
@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    await this.userService.create(createUserDto);
    return { success: true, message: 'User Created Successfully' };
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    await this.userService.register(createUserDto);
    return { success: true, message: 'User Registered Successfully' };
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const data = await this.userService.login(loginUserDto);
    return { success: true, data, message: 'Login Successful' };
  }

  @Get()
  async findAll() {
    return {
      success: true,
      data: await this.userService.findAll(),
      message: 'Users Fetched Successfully',
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.userService.findOne(id);
    return { success: true, data, message: 'User Fetched Successfully' };
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    await this.userService.update(id, updateUserDto);
    return { success: true, message: 'User Updated Successfully' };
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.userService.remove(id);
    return { success: true, message: 'User Deleted Successfully' };
  }
}
