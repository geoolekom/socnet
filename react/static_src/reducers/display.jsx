const defaultState = {
    unreadCount: 0,
};

export default (display = defaultState, action) => {
    switch (action.type) {
        default:
            return display;
    }
}
