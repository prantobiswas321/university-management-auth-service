import express, { Application } from 'express';
import cors from 'cors';
import globalErrorhandler from './app/middlewares/globalErrorhandler';
import { UserRoutes } from './app/modules/user/user.route';

const app: Application = express();

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Applications routes
app.use('/api/v1/users', UserRoutes);

// testing

// unhandled promise rejection
// app.get('/', async (req: Request, res: Response) => {
//   Promise.reject(new Error('Unhandled Promise Rejection'))
// })

// uncaught exceptions
// app.get('/', async (req: Request, res: Response) => {
//   // eslint-disable-next-line no-console
//   console.log(x)
// })

// error handling by Error class extends
// app.get('/', (req: Request, res: Response) => {
//   // res.send('Working Successfully!')
//   throw new ApiError(400, 'new error found')
// })

// error handling by next function
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   // res.send('Working Successfully!')
//   next('Ore baba error')
// })

// global error handler
app.use(globalErrorhandler);

export default app;
