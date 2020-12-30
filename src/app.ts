import express, {Request, Response, Application} from 'express';
import config from './config';
import morgan from 'morgan';
import cors from 'cors';
import productsRoute from './routes/products.routes';
import authRoute from './routes/auth.routes';
import { createRoles } from './libs/InitialSetUp';

const app: Application = express();
createRoles();

app.set('port', config.PORT);

//Middleware

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//App Routes Definition

app.get('/', (req: Request, res: Response) => res.json('Welcome!'));
app.use('/api/products', productsRoute);
app.use('/api/auth', authRoute);

export default app;