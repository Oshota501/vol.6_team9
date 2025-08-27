import React from 'react';
import { Link } from 'react-router-dom';

const StageSelect: React.FC = () => {
  return (
    <div className="screen-container">
      <h1>Stage Select</h1>
      <p>ここでステージ選択画面のコンポーネントを作成します。</p>
      <Link to="/" className="button-link">スタート画面に戻る</Link>
    </div>
  );
};

export default StageSelect;