import { Controller, Get, Response } from '@nestjs/common';
import { ApiBasicAuth, ApiBearerAuth } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/about')
  @ApiBearerAuth('access-token')
  about(@Response() res): string {
    return res.send({
      message: 'About page',
    });
  }
}
