import authMultiplier, { authentication } from './auth';
import requestMultiplier from './requests';
import searchMultiplier from './search';
import postMultiplier from './posts';
import { apiMiddleware } from 'redux-api-middleware';

export default [authentication, apiMiddleware, requestMultiplier, authMultiplier, searchMultiplier, postMultiplier];