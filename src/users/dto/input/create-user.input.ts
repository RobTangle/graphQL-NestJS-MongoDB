import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  age: number;

  @Field()
  @IsNotEmpty()
  password: string;

  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  isSubscribed?: boolean;
}
