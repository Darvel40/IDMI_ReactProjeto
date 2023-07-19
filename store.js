import { createStore } from 'redux';
import { createSelector } from 'reselect';

// Ação para definir o tamanho do tabuleiro
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

// Redutor
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

// Seletor para obter o valor de columnCount do estado
export const getColumnCount = state => state.columnCount;

// Seletor para obter o valor de rowCount do estado
export const getRowCount = state => state.rowCount;

// Seletor utilizando createSelector para obter o tamanho do tabuleiro
export const getBoardSize = createSelector(
  [getColumnCount, getRowCount],
  (columnCount, rowCount) => ({ columnCount, rowCount })
);

// Criar a store com o redutor
const store = createStore(reducer);

export default store;
