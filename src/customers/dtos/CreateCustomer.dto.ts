import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  ValidateNested,
  IsNotEmptyObject,
} from 'class-validator';
import { CreateAddressDto } from './CreateAddress.dto';

export class CreateCustomerDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNumberString()
  @IsNotEmpty()
  id: number;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;
}
