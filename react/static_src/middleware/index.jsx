import requestMultiplier from './requests';
import authMultiplier, { authentication } from './auth';
import { apiMiddleware } from 'redux-api-middleware';

export default [authentication, apiMiddleware, requestMultiplier, authMultiplier];