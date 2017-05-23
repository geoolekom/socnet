import requestMiddleware from './requests';
import { apiMiddleware } from 'redux-api-middleware';

export default [apiMiddleware, requestMiddleware];