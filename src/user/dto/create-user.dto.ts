/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  IsString,
  MaxLength,
  MinLength,
  IsEmail,
  IsBoolean,
  IsUUID,
  IsDate,
} from 'class-validator';
import { CreateRoleDto } from 'src/roles/dtos/create-role.dto';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @MaxLength(24)
  firstName: string;

  @IsString()
  @MaxLength(24)
  lastName: string;

  @IsString()
  @MinLength(6, { message: 'Password should have at least 6 characters.' })
  @MaxLength(24)
  password: string;

  @IsString()
  contact: string;

  @IsEmail()
  @MaxLength(56)
  email: string;

  @IsBoolean()
  status: boolean;

  @IsString()
  @MaxLength(8)
  code: string;

  @IsString()
  gender: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  DOB: Date;

  @IsString()
  @MaxLength(16)
  maritalStatus: string;

  @IsString()
  @MaxLength(16)
  CNIC: string;

  @IsString()
  @MaxLength(32)
  designation: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  joiningDate: Date;

  @IsString()
  @MaxLength(16)
  probationPeriod: string;

  @IsUUID()
  lineManagerID: string;

  @IsUUID()
  finalAuthorityID: string;

  role: CreateRoleDto;
}
