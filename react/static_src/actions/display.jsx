export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';
export const RESIZE = 'RESIZE';
export const SCROLL = 'SCROLL';

export const toggleChatSidebarVisibility = () => ({
    type: TOGGLE_SIDEBAR
});

export const setWindowSize = () => ({
    type: RESIZE,
    size: {
        width: window.innerWidth,
        height: window.innerHeight
    }
});

export const setScroll = (event) => ({
    type: SCROLL,
    scroll: {
        top: event.nativeEvent.target.scrollTop
    }
});
