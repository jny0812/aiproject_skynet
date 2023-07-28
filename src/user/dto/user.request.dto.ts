import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserRequestDto extends Request {

    @ApiProperty()
    @IsString()
    id: string;


}