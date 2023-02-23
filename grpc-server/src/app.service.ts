import { Injectable } from '@nestjs/common';
import { User } from './interfaces/app.interface';

@Injectable()
export class AppService {


  getHello(): User {
    console.log("call");
    return {
      id: "1",
      name: "Ozair",
      email: "ozair@email.in",
      phone: 9876543210
    };
  }
  public accumulate(data: number[]): number {
    return (data || []).reduce((a, b) => Number(a) + Number(b));
  }
}
