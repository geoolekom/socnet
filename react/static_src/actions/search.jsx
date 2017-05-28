export const SEARCH_TRY = 'SEARCH_TRY';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_FAILURE = 'SEARCH_FAILURE';

import { CALL_API } from 'redux-api-middleware';
import { objectToQuery } from '../helpers/web';


export const getSearchResults = (params) => ({
    [CALL_API]: {
        endpoint: `/search/${objectToQuery(params)}`,
        method: 'GET',
        types: [{ type: SEARCH_TRY, payload: params.q }, SEARCH_SUCCESS, SEARCH_FAILURE],
    }
});
