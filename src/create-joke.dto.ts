import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateJokeDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 500)
  readonly joke: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  readonly type: string;
}
