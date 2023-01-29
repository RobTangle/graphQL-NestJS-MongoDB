import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import authConstants from './auth/constants';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      driver: ApolloDriver,
    }),
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({ load: [authConstants], isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_DB_URL),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
