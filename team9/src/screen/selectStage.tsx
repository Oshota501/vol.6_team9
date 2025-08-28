import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const StageSelect: React.FC = () => {
    return (
        <div className="screen-container">
            <Link to="/" className="back">
                ←
            </Link>
        </div>
    );
};

export default StageSelect;
