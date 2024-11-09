import {
    Catch,
    ArgumentsHost,
    HttpStatus,
    HttpException,
    All,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';
import { LoggerService } from './logger/logger.service';

type ResponseObj = {
    statusCode: number;
    timestamp: string;
    path: string;
    response: string | object;
};

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    private readonly loggerService = new LoggerService(
        AllExceptionsFilter.name,
    );

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const responseObj: ResponseObj = {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            timestamp: new Date().toISOString(),
            path: request.url,
            response: '',
        };

        if (exception instanceof HttpException) {
            responseObj.statusCode = exception.getStatus();
            responseObj.response = exception.getResponse();
        } else {
            responseObj.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
            responseObj.response = 'Internal Server Error';
        }

        response.status(responseObj.statusCode).json(responseObj);
        this.loggerService.error(
            responseObj.response,
            AllExceptionsFilter.name,
        );
        super.catch(exception, host);
    }
}
