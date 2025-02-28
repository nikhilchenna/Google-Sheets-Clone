import React, { useState, useEffect, useCallback } from 'react';
import './Spreadsheet.css';

const Spreadsheet = () => {
    const ROWS = 22;
    const COLUMNS = 25;
    const columnLabels = [...Array(COLUMNS)].map((_, i) => String.fromCharCode(65 + i));
    const rowLabels = [...Array(ROWS)].map((_, i) => (i + 1).toString().padStart(2, '0'));

    const [data, setData] = useState({});
    const [formulas, setFormulas] = useState({});

    const getCellKey = (row, col) => `${columnLabels[col]}${rowLabels[row]}`;

    const handleChange = (row, col, value) => {
        const key = getCellKey(row, col);
        if (value.startsWith('=')) {
            setFormulas((prev) => ({ ...prev, [key]: value }));
        }
        setData((prev) => ({ ...prev, [key]: value }));
    };

    const evaluateFormula = (formula) => {
        try {
            if (/^=SUM\((\w+\d+):(\w+\d+)\)$/.test(formula)) {
                const match = formula.match(/^=SUM\((\w+\d+):(\w+\d+)\)$/);
                if (!match) return 'ERR';
                const [_, startCell, endCell] = match;
                const startCol = startCell.charAt(0);
                const startRow = parseInt(startCell.slice(1), 10);
                const endCol = endCell.charAt(0);
                const endRow = parseInt(endCell.slice(1), 10);

                let sum = 0;
                for (let r = startRow; r <= endRow; r++) {
                    for (let c = startCol.charCodeAt(0); c <= endCol.charCodeAt(0); c++) {
                        const cellKey = `${String.fromCharCode(c)}${r.toString().padStart(2, '0')}`;
                        sum += parseFloat(data[cellKey]) || 0;
                    }
                }
                return sum;
            }
            return 'ERR';
        } catch (error) {
            return 'ERR';
        }
    };

    useEffect(() => {
        const updatedData = { ...data };
        Object.entries(formulas).forEach(([key, formula]) => {
            updatedData[key] = evaluateFormula(formula);
        });
        setData(updatedData);
    }, [formulas]);

    return (
        <div className="spreadsheet-container">
            <div className="spreadsheet">
                <div className="header-row">
                    <div className="corner-cell"></div>
                    {columnLabels.map((label, colIdx) => (
                        <div key={colIdx} className="column-header">{label}</div>
                    ))}
                </div>
                {rowLabels.map((rowLabel, rowIdx) => (
                    <div key={rowIdx} className="spreadsheet-row">
                        <div className="row-header">{rowLabel}</div>
                        {columnLabels.map((_, colIdx) => (
                            <input
                                key={colIdx}
                                className="cell"
                                value={data[getCellKey(rowIdx, colIdx)] || ''}
                                onChange={(e) => handleChange(rowIdx, colIdx, e.target.value)}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Spreadsheet;
