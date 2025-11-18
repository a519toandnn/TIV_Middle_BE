import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../interfaces/ApiResponse';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {

    private getDefaultMessage(method: string): string {
        switch (method) {
            case 'GET':
                return 'Data retrieved successfully';
            case 'POST':
                return 'Data created successfully';
            case 'PATCH':
                return 'Data updated successfully';
            case 'DELETE':
                return 'Data deleted successfully';
            default:
                return 'Request successful';
        }
    }

    intercept(
        context: ExecutionContext, 
        next: CallHandler
    ): Observable<ApiResponse<T>> {
        const request = context.switchToHttp().getRequest();

        return next
        .handle()
        .pipe(
            map((data: any) => {

                if (data && typeof data === 'object' && 'success' in data && 'message' in data) {
                    return data as ApiResponse<T>;
                }

                let finalMessage = this.getDefaultMessage(request.method);

                if (data && typeof data === 'object' && 'message' in data) {
                    finalMessage = data.message as string;

                    const {message, ...rest} = data;
                    data = Object.keys(rest).length > 0 ? rest : undefined; 
                    if (data && typeof data === 'object' && 'data' in data) {
                        data = data.data as T;
                    }
                }

                return {
                    success: true,
                    message: finalMessage,
                    data: data
                } as ApiResponse<T>;
            }),
        );
    }
}