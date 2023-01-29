import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

export type UserDocument = User & Document;

@ObjectType()
@Schema()
export class User {
  @Prop({ required: true, unique: true, immutable: true, index: true })
  @Field()
  userId: string;

  @Field()
  @Prop({ required: true, unique: true, immutable: true, index: true })
  email: string;

  @Prop()
  @Field()
  password: string;

  @Prop()
  @Field()
  age: number;

  @Prop()
  @Field({ nullable: true })
  isSubscribed?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
