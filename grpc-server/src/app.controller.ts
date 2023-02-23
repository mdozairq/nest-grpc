import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';
import { IHealth, INumberArray, IString, ISumOfNumberArray, NoArgs } from './interfaces/app.interface';

@Controller()
export class AppController {
  private logger = new Logger('AppController');

  constructor(private appService: AppService) { }

  @GrpcMethod('AppController', 'Accumulate')
  accumulate(numberArray) {
    this.logger.log('Adding ' + numberArray.data);
    console.log(numberArray);
    return { sum: this.appService.accumulate(numberArray.data) };
  }

  @GrpcMethod('AppController', 'GetUserById')
  getUserByIdGRCP(Id) {
    console.log("Hit:", Id.id);
    const user = this.appService.getHello();
    console.log(user);
    return user;
  }

  @Get()
  hellowWorld() {
    return this.appService.getHello();
  }
}