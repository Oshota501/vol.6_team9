import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStageStore } from "../lib/stageStore";
import "./cssByScreen/selectStage.css";
import "../App.css";

const StageSelect: React.FC = () => {
    const setStage = useStageStore((state) => state.setStage);
    const navigate = useNavigate();

    return (
        <div className="select-stage-container">
            {/* 左上のスタート画面に戻るボタン */}
            <Link to="/" className="back-button" title="スタート画面に戻る">
                ←
            </Link>

            {/* 中央のステージ選択カードコンテナ */}
            <div className="stage-cards-wrapper">
                <div className="stage-card">
                    <button
                        className="start-stage-button"
                        onClick={() => {
                            setStage(0); // ステージ1
                            navigate("/game");
                        }}
                    >
                        <h2>Very Easy</h2>
                        <p>最初のステージです。基本的な操作を学びましょう。</p>
                    </button>
                </div>
                <div className="stage-card">
                    <button
                        className="start-stage-button"
                        onClick={() => {
                            setStage(1); // ステージ2
                            navigate("/game");
                        }}
                    >
                        <h2>Monster</h2>
                        <p>少し難しくなります。新しい要素が登場します。</p>
                    </button>
                </div>
                {/* 必要に応じてステージカードを追加 */}
            </div>

            {/* 下部中央の「スタート」ボタン（任意のステージを選択しない限り非活性等） */}
            <div className="bottom-button-container">
                <Link to="/" className="button-primary">スタート画面へ戻る</Link>
            </div>
        </div>
    );
};

export default StageSelect;