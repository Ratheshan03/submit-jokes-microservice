import {
  Body,
  Controller,
  Post,
  Get,
  Query,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateJokeDto } from './create-joke.dto';
import { Joke } from './joke.schema';

@Controller('jokes')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('submit')
  async createJoke(@Body() createJokeDto: CreateJokeDto) {
    return this.appService.createJoke(createJokeDto);
  }

  @Get()
  async getJokes(@Query('limit') limit: number): Promise<Joke[]> {
    return this.appService.getJokes(limit);
  }

  @Put(':id')
  async updateJoke(
    @Param('id') jokeId: string,
    @Body() updateData: Partial<CreateJokeDto>,
  ): Promise<Joke> {
    // console.log('Received update request for Joke ID:', jokeId);
    // console.log('Update Data:', updateData);

    return this.appService.updateJoke(jokeId, updateData);
  }

  @Delete(':id')
  async deleteJoke(@Param('id') jokeId: string): Promise<{ deleted: boolean }> {
    return this.appService.deleteJoke(jokeId);
  }
}
