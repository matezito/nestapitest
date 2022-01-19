import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { Types } from 'mongoose';

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

  @Get('/:id')
  @ApiParam({ name: 'id', type: 'string' })
  async findOne(@Res() res, @Param('id') id: any): Promise<any> {
    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'Invalid id',
      });
    }

    const post = await this.postsService.findOne(new Types.ObjectId(id));
    if (!post) {
      return res.status(400).json({
        message: 'Error retrieving post',
        post,
      });
    }

    if (!post) {
      return res.status(404).json({
        message: 'No post found',
      });
    }

    return res.status(200).json({ post });
  }

  @Delete('/:id')
  @ApiParam({ name: 'id', type: 'string' })
  async delete(@Res() res, @Param('id') id: any): Promise<any> {
    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'Invalid id',
      });
    }

    const post = await this.postsService.delete(new Types.ObjectId(id));
    if (!post) {
      return res.status(400).json({
        message: 'Error deleting post',
        post,
      });
    }

    return res.status(200).json({ message: 'Post deleted', post });
  }

  @Put('/:id')
  @ApiParam({ name: 'id', type: 'string' })
  async update(
    @Res() res,
    @Param('id') id: any,
    @Body() createPostDto: CreatePostDto,
  ): Promise<any> {
    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'Invalid id',
      });
    }

    const post = await this.postsService.update(
      new Types.ObjectId(id),
      createPostDto,
    );
    if (!post) {
      return res.status(400).json({
        message: 'Error updating post',
        post,
      });
    }

    return res.status(200).json({ message: 'Post updated', post });
  }
}
