import { Controller, Logger, Post, Body, OnModuleInit, Get, Query } from '@nestjs/common';
import { IGrpcService } from './grpc.interface';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { microserviceOptions } from './grpc.options';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';


interface IHealth {
  status: string;
}

@Controller('new')
export class AppController {
  constructor(private readonly http: HttpService) {}
  private logger = new Logger('AppController');

  @Client(microserviceOptions)
  private client: ClientGrpc;

  private grpcService: IGrpcService;



  onModuleInit() {
    this.grpcService = this.client.getService<IGrpcService>('AppController');
  }

  @Post('/add')
  async accumulate(@Body('data') data: number[]) {
    console.log("add:", data)
    const sum = this.grpcService.accumulate({ data });
    console.log("add:", sum);
    return sum;
  }

  @Get('/user')
  async getUserById() {
    const user = this.grpcService.GetUserById({ id: "abc" });
    console.log(user);
    // const myTodo = await this.http.get(user).pipe(
    //   map(resp => resp.data),
    // ).toPromise();
    // return myTodo;
    return  user ;
  }

}