import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsPositive,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @MinLength(6)
  name: string;

  @IsPositive({ message: 'age must greater than zero!' })
  @IsInt()
  age: number;

  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;
}
