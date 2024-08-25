// src/store/useStore.js
import create from 'zustand';

const useStore = create((set) => ({
  cells: Array.from({ length: 20 }, () => Array(50).fill('')),
  disabledCells: [],
  undoStack: [],
  redoStack: [],
  searchQuery: '',
  setCell: (row, col, value) => set((state) => {
    const newCells = state.cells.map((r, rIndex) =>
      rIndex === row
        ? r.map((c, cIndex) => (cIndex === col ? value : c))
        : r
    );
    return { cells: newCells };
  }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  addToUndoStack: () => set((state) => ({
    undoStack: [...state.undoStack, { cells: state.cells }],
    redoStack: []
  })),
  undo: () => set((state) => {
    if (state.undoStack.length > 0) {
      const previousState = state.undoStack.pop();
      return {
        cells: previousState.cells,
        undoStack: [...state.undoStack],
        redoStack: [...state.redoStack, { cells: state.cells }]
      };
    }
    return state;
  }),
  redo: () => set((state) => {
    if (state.redoStack.length > 0) {
      const nextState = state.redoStack.pop();
      return {
        cells: nextState.cells,
        undoStack: [...state.undoStack, { cells: state.cells }],
        redoStack: [...state.redoStack]
      };
    }
    return state;
  }),
  setDisabledCell: (row, col, isDisabled) => set((state) => {
    const newDisabledCells = [...state.disabledCells];
    if (isDisabled) {
      newDisabledCells.push({ row, col });
    } else {
      const index = newDisabledCells.findIndex(cell => cell.row === row && cell.col === col);
      if (index !== -1) newDisabledCells.splice(index, 1);
    }
    return { disabledCells: newDisabledCells };
  }),
  isCellDisabled: (row, col) => useStore.getState().disabledCells.some(cell => cell.row === row && cell.col === col),
}));

export default useStore;
