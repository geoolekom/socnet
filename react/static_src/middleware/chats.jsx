import { getMessages } from '../actions/messages';
import { CHATS_SUCCESS, getChats } from '../actions/chats';
import { TOGGLE_SIDEBAR } from '../actions/display';


export default store => next => action => {
    switch (action.type) {
        case CHATS_SUCCESS:
            const chatIds = action.payload.map(chat => chat.id);
            console.log(chatIds);
            store.dispatch(getMessages({chat_id: chatIds}));
            break;
        case TOGGLE_SIDEBAR:
            console.log(store.getState().display);
            if (!store.getState().display.sidebarVisibility) {
                store.dispatch(getChats());
            }
            break;
        default:
            break;
    }
    return next(action);
}