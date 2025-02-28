// src/components/FormulaBar.js
import React from "react";

const FormulaBar = ({ formula, onFormulaChange }) => {
    return (
        <div className="formula-bar">
            <span>fx</span>
            <input
                type="text"
                value={formula}
                onChange={(e) => onFormulaChange(e.target.value)}
                placeholder="Enter formula..."
            />
        </div>
    );
};

export default FormulaBar;
