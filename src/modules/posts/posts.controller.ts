import { Controller, Get, Headers, Param, Post, Body, HttpException, HttpStatus, ForbiddenException, UseFilters, ValidationPipe, UsePipes, ParseIntPipe, UseGuards, SetMetadata, UseInterceptors } from '@nestjs/common';
import { CreatePostDto } from './post.dto';
import { DemoService } from './providers/demo/demo.service';
import { DemoFilter } from '../../core/filters/demo.filter';
import { DemoAuthGuard } from '../../core/guards/demo-auth.guard';
import { Roles } from '../../core/decorators/roles.decorator';
import { LogginInterceptor } from '../../core/interceptors/loggin.interceptor';

@Controller('posts')
// @UseFilters(DemoFilter)
// @UseGuards(DemoAuthGuard)
@UseInterceptors(LogginInterceptor)
export class PostsController {
    constructor(private readonly demoService: DemoService){}

    @Get()
    index() {
        return this.demoService.findAll();
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
    store(@Body() post: CreatePostDto) {
        // throw new HttpException('没有权限', HttpStatus.FORBIDDEN);
        // throw new ForbiddenException('没有权限');
        this.demoService.create(post);
    }
}
