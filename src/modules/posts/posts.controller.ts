import { Controller, Get, Headers, Param, Post, Body, HttpException, HttpStatus, ForbiddenException, UseFilters, ValidationPipe, UsePipes } from '@nestjs/common';
import { CreatePostDto } from './post.dto';
import { DemoService } from './providers/demo/demo.service';
import { DemoFilter } from '../../core/filters/demo.filter';

@Controller('posts')
// @UseFilters(DemoFilter)
export class PostsController {
    constructor(private readonly demoService: DemoService){}

    @Get()
    index() {
        return this.demoService.findAll();
    }

    @Get(':id')
    show(@Param() params ) {
        return {
            title: `Post ${params.id}`
        }
    }

    @Post()
    @UsePipes(ValidationPipe)
    // @UseFilters(DemoFilter)
    store(@Body() post: CreatePostDto) {
        // throw new HttpException('没有权限', HttpStatus.FORBIDDEN);
        // throw new ForbiddenException('没有权限');
        this.demoService.create(post);
    }
}
