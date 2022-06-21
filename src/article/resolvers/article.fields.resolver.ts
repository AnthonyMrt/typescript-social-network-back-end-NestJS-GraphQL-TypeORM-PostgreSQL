import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { UserService } from 'src/users/users.service';
import { User } from 'src/users/models/user.model';
import { Article } from '../models/article.model';
import { ArticleService } from '../article.service';
import { PaginationArgs } from 'src/pagination/dto/pagination.dto';
import { ArticleCommentsPagination } from '../dto/article-comments-pagination.dto';

@Resolver(Article)
export class ArticleFieldsResolver {
  constructor(
    private userService: UserService,
    private articleService: ArticleService,
  ) {}

  @ResolveField(() => User, { nullable: true })
  async author(@Parent() article: Article) {
    if (!article.authorId) {
      return null;
    }
    try {
      return await this.userService.userGetById(article.authorId);
    } catch (e) {
      return null;
    }
  }

  @ResolveField(() => ArticleCommentsPagination)
  async comments(@Parent() article: Article, @Args() args: PaginationArgs) {
    return await this.articleService.articleCommentsPagination(
      article.id,
      args,
    );
  }
}
