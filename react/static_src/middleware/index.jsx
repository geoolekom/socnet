import requestMiddleware from './requests';
import authMiddleware from './auth';
import { apiMiddleware } from 'redux-api-middleware';

export default [apiMiddleware, authMiddleware, requestMiddleware];