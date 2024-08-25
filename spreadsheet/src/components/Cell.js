// src/components/Cell.js
import React from 'react';

const Cell = ({ row, col, value, onChange, isDisabled }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={isDisabled}
      className="border border-gray-300 p-2 w-full h-full text-center"
    />
  );
};

export default Cell;
