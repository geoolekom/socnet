import { SCROLL, TOGGLE_SIDEBAR, RESIZE } from '../actions/display';
import update from 'react-addons-update';

const defaultState = {
    unreadCount: 0,
    sidebarVisibility: false,
    scroll: {
        top: 0
    },
    size: {
        width: window.innerWidth,
        height: window.innerHeight
    }
};

export default (display = defaultState, action) => {
    switch (action.type) {
        case SCROLL:
            return update(
                display,
                { scroll: { $merge: action.scroll } }
            );
        case RESIZE:
            return update(
                display,
                { size: { $merge: action.size } }
            );
        case TOGGLE_SIDEBAR:
            return update(
                display,
                { sidebarVisibility: { $set: !display.sidebarVisibility } }
            );
        default:
            return display;
    }
}
