import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateJokeDto {
  @ApiProperty({
    description: 'The content of the joke',
    example:
      'Why did the scarecrow win an award? Because he was outstanding in his field!',
  })
  @IsString()
  @IsNotEmpty()
  @Length(5, 500)
  readonly joke: string;

  @ApiProperty({
    description: 'The type of the joke',
    example: 'pun',
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  readonly type: string;
}
