import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ArticleService } from '../article.service';
import {
  ArticleCreateOutput,
  ArticleCreateInput,
} from '../dto/article-create.dto';
import { ArticleDeleteOutput } from '../dto/article-delete.dto';
import {
  ArticleUpdateInput,
  ArticleUpdateOutput,
} from '../dto/article-update.dto';
import { Article } from '../models/article.model';
import { JWTPayload } from 'src/auth/auth.service';
import { CurrentUser, JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver(Article)
export class ArticleMutationResolver {
  constructor(private readonly ArticleService: ArticleService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ArticleCreateOutput)
  async articleCreate(
    @CurrentUser() user: JWTPayload,
    @Args('input') input: ArticleCreateInput,
  ) {
    return this.ArticleService.articleCreate(user, input);
  }

  @Mutation(() => ArticleUpdateOutput)
  async articleUpdate(
    @CurrentUser() user: JWTPayload,
    @Args({ name: 'articleId', type: () => ID }) articleId: Article['id'],
    @Args('input') input: ArticleUpdateInput,
  ) {
    return this.ArticleService.articleUpdate(articleId, input);
  }

  @Mutation(() => ArticleDeleteOutput)
  async articleDelete(
    @CurrentUser() user: JWTPayload,
    @Args({ name: 'articleId', type: () => ID }) articleId: Article['id'],
  ) {
    return this.ArticleService.articleDelete(articleId);
  }
}
