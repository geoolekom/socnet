import authMultiplier, { authentication } from './auth';
import chatMultiplier from './chats';
import friendMultiplier from './friends';
import messageMultiplier from './messages';
import postMultiplier from './posts';
import requestMultiplier from './requests';
import schemaNormalizer from './schema';
import searchMultiplier from './search';
import { apiMiddleware } from 'redux-api-middleware';

export default [
    authentication,
    apiMiddleware,
    authMultiplier,
    chatMultiplier,
    friendMultiplier,
    messageMultiplier,
    postMultiplier,
    requestMultiplier,
    searchMultiplier,
    schemaNormalizer,   // must be last to avoid complications in multipliers
];