import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.model';
import { UserMutationsResolver } from './resolvers/user.mutations.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserMutationsResolver],
  exports: [UserService],
})
export class UsersModule {}
