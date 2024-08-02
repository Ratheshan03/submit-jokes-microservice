import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateJokeDto } from './create-joke.dto';
import { Joke } from './joke.schema';

@Injectable()
export class AppService {
  constructor(@InjectModel(Joke.name) private jokeModel: Model<Joke>) {}

  async createJoke(createJokeDto: CreateJokeDto): Promise<Joke> {
    try {
      const createdJoke = new this.jokeModel(createJokeDto);
      return await createdJoke.save();
    } catch (error) {
      throw new BadRequestException('Failed to create joke');
    }
  }

  async getJokes(limit: number = 10): Promise<Joke[]> {
    return this.jokeModel.find().limit(limit).exec();
  }

  async updateJoke(
    jokeId: string,
    updateData: Partial<CreateJokeDto>,
  ): Promise<Joke> {
    // console.log('Updating joke with ID:', jokeId);
    // console.log('Update Data:', updateData);

    const joke = await this.jokeModel.findByIdAndUpdate(
      jokeId,
      { $set: updateData },
      { new: true },
    );

    if (!joke) {
      throw new NotFoundException('Joke not found');
    }

    console.log('Updated Joke:', joke);
    return joke;
  }

  async deleteJoke(jokeId: string): Promise<{ deleted: boolean }> {
    console.log(`Attempting to delete joke with ID: ${jokeId}`);
    const result = await this.jokeModel.deleteOne({ _id: jokeId }).exec();
    if (result.deletedCount === 0) {
      console.log(`Joke with ID ${jokeId} not found`);
      throw new NotFoundException('Joke not found');
    }
    console.log(`Joke with ID ${jokeId} deleted`);
    return { deleted: true };
  }
}
