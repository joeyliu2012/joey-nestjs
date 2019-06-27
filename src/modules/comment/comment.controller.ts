import { Controller, Post, UseGuards, UseInterceptors, ClassSerializerInterceptor, Param, ParseIntPipe, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommentDto } from './comment.dto';
import { CommentService } from './comment.service';
import { User as UserEntity } from '../user/user.entity';
import { User } from '../../core/decorators/user.decorator';

@Controller()
export class CommentController {
    constructor(
        private readonly commentService: CommentService
    ) {}

    @Post('posts/:id/comments')
    @UseGuards(AuthGuard())
    @UseInterceptors(ClassSerializerInterceptor)
    async storePostComment(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: CommentDto,
        @User() user: UserEntity
    ) {
        return await this.commentService.storePostComment(id, user, data);
    }
}
