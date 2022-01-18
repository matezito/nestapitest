import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('/create')
  async create(@Res() res, @Body() createPostDto: CreatePostDto): Promise<any> {
    const post = await this.postsService.create(createPostDto);
    if (!post) {
      return res.status(400).json({
        message: 'Post not created',
        post,
      });
    }

    return res.status(201).json({ message: 'Post created', post });
  }

  @Get('/')
  async findAll(@Res() res): Promise<any> {
    const posts = await this.postsService.findAll();
    if (!posts) {
      return res.status(400).json({
        message: 'Error retrieving posts',
        posts,
      });
    }

    if (posts.length === 0) {
      return res.status(404).json({
        message: 'No posts found',
      });
    }

    return res.status(200).json({ posts });
  }
}
