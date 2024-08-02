import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { Joke, JokeSchema } from './joke.schema';

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
