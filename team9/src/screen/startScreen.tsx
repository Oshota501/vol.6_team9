import React from "react";
import { Link } from "react-router-dom";
import "./cssByScreen/startScreen.css";
import "../App.css";

const StartScreen: React.FC = () => {
    return (
        <>
            <h1 className="title">Style Bender</h1>
            <div className="operation">
                <Link to="/card-view" className="content">
                    <button className="card">カード</button>
                    <p className="card-hover-text">
                        カード一覧を見ることができます
                    </p>
                </Link>
                <Link to="/StageSelect" className="content">
                    <button className="card">ステージ</button>
                    <p className="card-hover-text">
                        ステージ一覧を見ることができます
                    </p>
                </Link>
            </div>
        </>
    );
};

export default StartScreen;
