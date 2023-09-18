import {
  Controller,
  Get,
  Post,
  HttpCode,
  Header,
  Redirect,
  Query,
  Param,
  Body,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { CatsService } from 'src/cats/cats.service';
import { CreateCatDto } from 'src/create-cat.dto';
import { Cat } from 'src/interfaces/cat.interface';

//Controllers should handle HTTP requests and delegate more complext tasks to the providers.
@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async createCats(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async secondFindAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Post()
  create(): string {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }

  @Get('ab*cd')
  findAllWildcard(): string {
    return 'This is the wildcard version, anything could be in the spot of the * in the path';
  }

  @Post()
  @HttpCode(204)
  createNewHttp() {
    return 'This is how to change the HTTP';
  }

  @Post()
  @Header('Cache-Control', 'none')
  createCache() {
    return 'This creates a custom response header';
  }

  @Get()
  @Redirect('https://nestjs.com', 301)
  findSomething(): string {
    return 'This redirects to the given HTTP statuse code';
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }

  @Get(':id')
  findOne(@Param() params: any): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }

  //This is a way to directly interact with params.
  @Get(':id')
  findAnotherOne(@Param('id') id: string): string {
    return `This action returns a #${id} cat`;
  }

  @Get()
  findAnotherAll(): Observable<any[]> {
    return of([]);
  }

  @Post()
  async useCatDto(@Body() createCatDto: CreateCatDto) {
    return 'This is using another class' + createCatDto.name;
  }
}
