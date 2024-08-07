import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from 'src/dto/post.dto';
import * as fs from 'fs';

@Injectable()
export class AppService {
  private posts = JSON.parse(fs.readFileSync('src/mock.json', 'utf-8'));

  private LIMIT = 4;

  private writeFile(posts) {
    fs.writeFileSync('src/mock.json', JSON.stringify(posts, null, 2));
  }

  private findNextId() {
    const ids = new Set(this.posts.map((post) => post.id));
    for (let i = 1; i <= ids.size; i++) {
      if (!ids.has(i)) {
        return i;
      }
    }
    return ids.size + 1;
  }

  private findIndex(id: number) {
    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (postIndex === -1) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    return postIndex;
  }

  findAll(page: number = 1) {
    const startIndex = (page - 1) * this.LIMIT;
    const endIndex = startIndex + this.LIMIT;
    const total = this.posts.length;
    const paginatedPosts = this.posts.slice(startIndex, endIndex);
    return {
      data: paginatedPosts,
      meta: {
        page,
        totalPages: Math.ceil(total / this.LIMIT),
        limit: this.LIMIT,
        total,
      },
    };
  }

  create(createPostDto: CreatePostDto) {
    if (createPostDto.title === '' || !createPostDto.title) {
      throw new BadRequestException('Post title cannot be empty');
    }

    const newPost = {
      id: this.findNextId(),
      title: createPostDto.title,
      content: createPostDto.content || '',
    };
    this.posts.push(newPost);
    this.writeFile(this.posts);
    return newPost;
  }

  findOne(id: number) {
    const postIndex = this.findIndex(id);
    return this.posts[postIndex];
  }

  update(id: number, updatePostDto: CreatePostDto) {
    const postIndex = this.findIndex(id);
    this.posts[postIndex] = {
      ...this.posts[postIndex],
      ...updatePostDto,
    };
    this.writeFile(this.posts);
    return this.posts[postIndex];
  }

  delete(id: number) {
    const postIndex = this.findIndex(id);
    const deletedPost = this.posts.splice(postIndex, 1)[0].id;
    this.writeFile(this.posts);
    return deletedPost.id;
  }
}
