import { Observable } from 'rxjs';

export interface IGrpcService {
  accumulate(numberArray: INumberArray): Observable<any>;
  GetUserById(Id: { id: string }): Observable<any>;
}

interface INumberArray {
  data: number[];
}