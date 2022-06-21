import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { Node } from 'src/pagination/models/node.models';
import { User } from 'src/users/models/user.model';
import { Article } from 'src/article/models/article.model';

@Entity()
@ObjectType()
export class Comment extends Node {
  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn()
  author: User;

  @RelationId((self: Comment) => self.author)
  readonly authorId: User['id'];

  @ManyToOne(() => Article, (article) => article.comments)
  @JoinColumn()
  article: Article;

  @RelationId((self: Comment) => self.article)
  readonly articleId: Article['id'];

  @Field(() => String)
  @Column()
  message: string;
}
