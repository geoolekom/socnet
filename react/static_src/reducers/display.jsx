import { NAV_KEY } from '../actions/display';

const defaultState = {
    navKey: window.location.pathname.substr(1),
    unreadCount: 0,
};

export default (display = defaultState, action) => {
    switch (action.type) {
        case NAV_KEY:
            return {
                navKey: action.navKey,
                unreadCount: display.unreadCount,
            };
        default:
            return display;
    }
}
