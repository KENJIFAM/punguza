import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import authController from './controllers/authController';
import userController from './controllers/userController';
import storageController from './controllers/storageController';
import foodController from './controllers/foodController';
import errorHandler from './middleware/error';
import auth from './middleware/auth';

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authController);
app.use('/user/', auth, userController);
app.use('/storages/', auth, storageController);
app.use('/foods/', auth, foodController);

app.get('/*', (req, res) => res.send('Welcome to Punguza APIs!'));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
