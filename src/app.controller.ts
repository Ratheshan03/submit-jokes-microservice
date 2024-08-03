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
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { AppService } from './app.service';
import { CreateJokeDto } from './create-joke.dto';
import { Joke } from './joke.schema';

@ApiTags('jokes')
@Controller('jokes')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('submit')
  @ApiOperation({ summary: 'Submit a new joke' })
  @ApiResponse({
    status: 201,
    description: 'The joke has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async createJoke(@Body() createJokeDto: CreateJokeDto) {
    return this.appService.createJoke(createJokeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get a list of jokes' })
  @ApiResponse({ status: 200, description: 'The list of jokes.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async getJokes(@Query('limit') limit: number): Promise<Joke[]> {
    return this.appService.getJokes(limit);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a joke by ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The ID of the joke to update',
  })
  @ApiResponse({ status: 200, description: 'The updated joke.' })
  @ApiResponse({ status: 404, description: 'Joke not found' })
  async updateJoke(
    @Param('id') jokeId: string,
    @Body() updateData: Partial<CreateJokeDto>,
  ): Promise<Joke> {
    return this.appService.updateJoke(jokeId, updateData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a joke by ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The ID of the joke to delete',
  })
  @ApiResponse({ status: 200, description: 'The joke was deleted.' })
  @ApiResponse({ status: 404, description: 'Joke not found' })
  async deleteJoke(@Param('id') jokeId: string): Promise<{ deleted: boolean }> {
    return this.appService.deleteJoke(jokeId);
  }
}
