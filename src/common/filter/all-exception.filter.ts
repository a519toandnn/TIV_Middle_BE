import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiResponse } from '../interfaces/ApiResponse';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  
  private readonly logger = new Logger(AllExceptionFilter.name)  


  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: number;
    let message: string;
    let error: any;

    //Lỗi có chủ đích - HttpException
    if (exception instanceof HttpException) {
        status = exception.getStatus();
        const exceptionResponse = exception.getResponse();

        if (typeof exceptionResponse === 'string') {
            message = exceptionResponse;
        }
        else if (typeof exceptionResponse === 'object') {
            const exceptionResponseObj = exceptionResponse as Record<string, any>;
            message = exceptionResponseObj.message || exceptionResponseObj.error || "Error occurred";
            if (exceptionResponseObj.error){
                error = exceptionResponseObj.error;
            }

            //Lỗi validate DTO
            if (Array.isArray(exceptionResponseObj.message)) {
                message = "Validation failed";
                error = exceptionResponseObj.message;
            }
        }
        else message = 'Error occurred';
        
    }
    else {
        //Lỗi ngoài ý muốn
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Internal server error';
        this.logger.error(exception)
    }

    const errorResponse : ApiResponse<any> = {
        success: false,
        message,
        ...(error && { error })
    }
  }
}