// src/components/Toolbar.js
import React from "react";
import { IconButton, Select, MenuItem } from "@mui/material";
import { FormatBold, FormatItalic, FormatColorText } from "@mui/icons-material";

const Toolbar = ({ onFormatChange }) => {
    return (
        <div className="toolbar">
            <IconButton onClick={() => onFormatChange("bold")}>
                <FormatBold />
            </IconButton>
            <IconButton onClick={() => onFormatChange("italic")}>
                <FormatItalic />
            </IconButton>
            <Select defaultValue="16px" onChange={(e) => onFormatChange("fontSize", e.target.value)}>
                <MenuItem value="12px">12px</MenuItem>
                <MenuItem value="16px">16px</MenuItem>
                <MenuItem value="20px">20px</MenuItem>
            </Select>
            <IconButton onClick={() => onFormatChange("color", "red")}>
                <FormatColorText />
            </IconButton>
        </div>
    );
};

export default Toolbar;
