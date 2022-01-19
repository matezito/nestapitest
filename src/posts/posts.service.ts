import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './interfaces/posts.interface';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(@InjectModel('Post') private readonly postModel: Model<Post>) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const post = new this.postModel(createPostDto);
    return await post.save();
  }

  async findAll(): Promise<Post[]> {
    return await this.postModel.find();
  }

  async findOne(id: any): Promise<Post> {
    return await this.postModel.findById(id);
  }

  async delete(id: any): Promise<Post> {
    return await this.postModel.findByIdAndRemove(id);
  }

  async update(id: any, createPostDto: CreatePostDto): Promise<Post> {
    return await this.postModel.findByIdAndUpdate(id, createPostDto, {
      new: true,
    });
  }
}
