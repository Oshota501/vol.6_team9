import React from "react";
import { Link } from "react-router-dom";
import "./cssByScreen/startScreen.css";

const StartScreen: React.FC = () => {
    return (
        <div className="screen-container">
            <h1 className="title">Style Bender</h1>
            <div className="operation">
                <Link to="./viewCards.tsx" classNameName="content">
                    <button className="card">カード</button>
                    <p className="card-hover-text">
                        カード一覧を見ることができます
                    </p>
                </Link>
                <Link to="./selectStage.tsx" className="content">
                    <button className="card">ステージ</button>
                    <p className="card-hover-text">
                        ステージ一覧を見ることができます
                    </p>
                </Link>
            </div>
        </div>
    );
};

export default StartScreen;
