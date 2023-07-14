export const setBoardSize = (columnCount, rowCount) => ({
    type: 'SET_BOARD_SIZE',
    payload: {
      columnCount,
      rowCount,
    },
});

const initialState = {
    columnCount: 7,
    rowCount: 6,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_BOARD_SIZE':
        return {
            ...state,
            columnCount: action.payload.columnCount,
            rowCount: action.payload.rowCount,
        };
        default:
        return state;
    }
};

export default reducer;