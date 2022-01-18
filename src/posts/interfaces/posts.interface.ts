import { Document } from 'mongoose';

export interface Post extends Document {
  readonly title: string;
  readonly content: string;
}
