import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Joke, JokeSchema } from './joke.schema';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://ratheshan:rathe03@jokes-db.jnk3auf.mongodb.net/?retryWrites=true&w=majority&appName=jokes-db',
    ),
    MongooseModule.forFeature([{ name: Joke.name, schema: JokeSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
