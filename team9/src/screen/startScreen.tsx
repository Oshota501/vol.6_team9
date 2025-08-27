import React from 'react';
import { Link } from 'react-router-dom';

const StartScreen: React.FC = () => {
  return (
    <div className="screen-container">
      <h1 className="title">StyleBender</h1>
      <div className="button-container">
        <Link to="/card-view" className="button-link">
          カード選択へ
        </Link>
        <Link to="/stage-select" className="button-link">
          ステージ選択へ
        </Link>
      </div>
    </div>
  );
};

export default StartScreen;