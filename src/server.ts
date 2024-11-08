import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '@../../../swagger.json';
import { css } from './config/css';
import routes from './routes';

const app = express();

const corsOptions: cors.CorsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(routes);

const port = process.env.PORT || 3001;

const options = {
  customCss: css,
};

app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDocument, options));

app.listen(port, () => console.log(`Server is  running on port ${port}`));
