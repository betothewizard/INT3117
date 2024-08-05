import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from 'src/dto/post.dto';

@Injectable()
export class AppService {
  private posts = [
    {
      id: 1,
      title: 'Post 1',
      content: 'This is post 1',
    },
    {
      id: 2,
      title: 'Post 2',
      content:
        'Chia sẻ với các bác 1 kinh nghiệm em mới học được về công cuộc dọn dẹp nhà cửa ạ. Em là em thấy cái dung dịch này nó thần thánh thực sự luôn ý, sạch bong kin kít ạ',
    },
    {
      id: 3,
      title: 'Post 3',
      content: 'NÓNG: MCK cập nhật ảnh mới, lông mày đã mọc trở lại',
    },
  ];

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

  findAll() {
    return this.posts;
  }

  create(createPostDto: CreatePostDto) {
    const newPost = {
      id: this.findNextId(),
      ...createPostDto,
    };
    this.posts.push(newPost);
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
    return this.posts[postIndex];
  }

  delete(id: number) {
    const postIndex = this.findIndex(id);
    this.posts.splice(postIndex, 1);
    return this.posts[postIndex].id;
  }
}
