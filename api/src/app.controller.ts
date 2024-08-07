import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreatePostDto } from './dto/post.dto';

@Controller('api/v1/posts')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  findAll(@Query('page') page: number) {
    return this.appService.findAll(page);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appService.findOne(+id);
  }

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.appService.create(createPostDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePostDto: CreatePostDto) {
    return this.appService.update(+id, updatePostDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.appService.delete(+id);
  }
}
