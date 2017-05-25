export const SEARCH_TRY = 'SEARCH_TRY';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_FAILURE = 'SEARCH_FAILURE';

import { CALL_API } from 'redux-api-middleware';


export const getSearchResults = (q, models) => {
    const query = `q=${encodeURIComponent(q)}&models=${models.join('&models=')}`;
    return {
        [CALL_API]: {
            endpoint: `/search/?${query}`,
            method: 'GET',
            types: [SEARCH_TRY, SEARCH_SUCCESS, SEARCH_FAILURE],
        }
    }
};