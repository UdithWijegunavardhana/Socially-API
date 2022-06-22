import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserDto{
    
    @IsString()
    @IsNotEmpty()
    name: string;
   
    @IsString()
    phoneNumber: string;
}

export default CreateUserDto;