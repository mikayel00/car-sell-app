import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToClass } from "class-transformer";

interface ClassConstructor {
  new(...args: any[]): {}
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

// Interceptor uses like middleware for requests and responds
export class SerializeInterceptor implements NestInterceptor{

  constructor(private dto: any) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Run something before a request is handled

    return next
      .handle()
      .pipe(
        map((data:any) => {
          // Run something before the response is sent out
          return plainToClass(this.dto, data, {
            excludeExtraneousValues: true,
          })
        })
      );
  }
}
