import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Node } from 'src/pagination/models/node.models';
import { User } from 'src/users/models/user.model';
import { Comment } from 'src/comment/models/comment.model';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  RelationId,
  OneToMany,
} from 'typeorm';

@Entity()
@ObjectType()
export class Article extends Node {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column()
  title: string;

  @Field(() => String)
  @Column()
  description: string;

  @Field(() => String)
  @Column()
  image: string;

  @ManyToOne(() => User, (user) => user.articles)
  @JoinColumn()
  author: User;

  @RelationId((self: Article) => self.author)
  readonly authorId: User['id'];

  @OneToMany(() => Comment, (comment) => comment.article)
  @JoinColumn()
  comments: Comment;
}
