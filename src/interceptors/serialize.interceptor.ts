import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export class SerializeInterceptor implements NestInterceptor{
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Run something before a request is handled
    console.log('running before', context);

    return next.handle().pipe(
      map((data:any) => {
        // Run something before the response is sent out
        console.log('running after', data);
      })
    );
  }
}
