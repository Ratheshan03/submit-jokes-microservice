import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Joke extends Document {
  @Prop({ required: true })
  @ApiProperty({ description: 'The type of the joke', example: 'pun' })
  type: string;

  @Prop({ required: true })
  @ApiProperty({
    description: 'The content of the joke',
    example:
      'Why did the scarecrow win an award? Because he was outstanding in his field!',
  })
  content: string;

  @Prop({ default: false })
  @ApiProperty({
    description: 'Indicates if the joke is moderated',
    example: false,
  })
  is_moderated: boolean;
}

export const JokeSchema = SchemaFactory.createForClass(Joke);
