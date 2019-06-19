import { Controller, Get, Headers, Param, Post, Body, HttpException, HttpStatus, ForbiddenException, UseFilters, ValidationPipe, UsePipes, ParseIntPipe, UseGuards, SetMetadata, UseInterceptors, Req } from '@nestjs/common';
import { CreatePostDto } from './post.dto';
import { DemoService } from './providers/demo/demo.service';
import { DemoFilter } from '../../core/filters/demo.filter';
import { DemoAuthGuard } from '../../core/guards/demo-auth.guard';
import { Roles } from '../../core/decorators/roles.decorator';
import { LogginInterceptor } from '../../core/interceptors/loggin.interceptor';
import { TransformInterceptor } from '../../core/intereptors/transform.interceptor';
import { ErrorsInterceptor } from '../../core/interceptors/errors.interceptor';
import { User } from '../../core/decorators/user.decorator';

@Controller('posts')
// @UseFilters(DemoFilter)
// @UseGuards(DemoAuthGuard)
// @UseInterceptors(LogginInterceptor)
export class PostsController {
    constructor(private readonly demoService: DemoService){}

    @Get()
    // @UseInterceptors(TransformInterceptor)
    @UseInterceptors(ErrorsInterceptor)
    index() {
        throw new ForbiddenException();
        // return this.demoService.findAll();
    }

    @Get(':id')
    show(@Param('id', ParseIntPipe) id ) {
        console.log('id', typeof id);
        return {
            title: `Post ${id}`
        }
    }

    @Post()
    @UsePipes(ValidationPipe)
    // @SetMetadata('roles', ['member'])
    @Roles('member')
    // @UseFilters(DemoFilter)
    store(@Body() post: CreatePostDto, @User('demo') user) {
        console.log(user);
        
        // throw new HttpException('没有权限', HttpStatus.FORBIDDEN);
        // throw new ForbiddenException('没有权限');
        this.demoService.create(post);
    }
}
