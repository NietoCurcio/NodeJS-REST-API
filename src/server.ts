import express from 'express';
import { router } from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger.json';

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.listen(3333, () => console.log('Server running on port 3333'));

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
