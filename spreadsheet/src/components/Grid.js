// src/components/Grid.js
import React, { useState } from 'react';
import useStore from '../store/useStore';
import Cell from './Cell';

const Grid = () => {
  const { cells, setCell, searchQuery, setSearchQuery, undo, redo, isCellDisabled } = useStore();
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 20; // Number of rows per page
  const colsPerPage = 50; // Number of columns per page

  const handleCellChange = (row, col, value) => {
    useStore.getState().addToUndoStack();
    setCell(row, col, value);
  };

  const filteredCells = cells
    .slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage)
    .map(row => row.map(cell => cell.includes(searchQuery) ? cell : '')); // Apply search filter

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex flex-col md:flex-row items-center">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-2 p-2 border border-gray-300 rounded w-full md:w-1/4"
        />
        <button onClick={() => undo()} className="p-2 bg-blue-500 text-white rounded mx-2">Undo</button>
        <button onClick={() => redo()} className="p-2 bg-blue-500 text-white rounded">Redo</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-10 gap-1">
        {filteredCells.flat().map((cell, index) => {
          const row = Math.floor(index / colsPerPage);
          const col = index % colsPerPage;
          return (
            <Cell
              key={`${row}-${col}`}
              row={row}
              col={col}
              value={cell}
              onChange={(value) => handleCellChange(row, col, value)}
              isDisabled={isCellDisabled(row, col)}
            />
          );
        })}
      </div>
      <div className="flex justify-between mt-4">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>
          Previous
        </button>
        <span>Page {currentPage + 1}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={(currentPage + 1) * rowsPerPage >= cells.length}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Grid;
