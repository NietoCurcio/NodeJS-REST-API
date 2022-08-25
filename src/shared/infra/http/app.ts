import 'dotenv/config';
import 'reflect-metadata';
import '@shared/container';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../../../swagger.json';
import { AppError } from '@shared/errors/AppError';
import { router } from './routes';
import { initDataSource } from '../typeorm';

const app = express();

initDataSource.init();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    });
  }
);

export { app };
/*
API - Application Programming Interface

It's an interface (sets of specifications or documentations) for communication between applications

REST - Representational State Transfer it's a model architecture

6 constraints to be a REST API:

- Client - Server
it's decoupled from each other, 
the client can be another back-end that is consuming another back-end, (GET some resource for example))

- Stateless
The server does not store any state or session of the requests

- Cache
It must allows/supports caching

- Uniform interface (The interface of the resources (routes))
Identify the resources (/users, /products, /products/cpu, /items)
Representation of the Resources, as JSON, XML, HTML, etc
Auto-descriptive messages (status codes, clear responses)
HATEOAS (Hypertext As The Engine Of Application State), return links in the response

- Layers
"REST allows you to use a layered system architecture where you deploy the APIs on
server A, and store data on server B and authenticate requests in Server C"
In other words, use services, like AWS Cognito or Auth0, DynamoDB, Firebase...

- Code on demand
REST API can return also executable code, i.e. pre-rendered code as in SSR
*/
