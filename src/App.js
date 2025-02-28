// src/App.js
import React from "react";
import Spreadsheet from "./components/Spreadsheet";

const App = () => {
  const handleCellSelect = (row, col) => {
    console.log(`Cell selected: Row ${row}, Col ${col}`);
  };

  return (
    <div>
      <h1>Google Sheets Clone</h1>
      <Spreadsheet onCellSelect={handleCellSelect} />
    </div>
  );
};

export default App;
