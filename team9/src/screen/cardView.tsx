import React from 'react';
import { Link } from 'react-router-dom';

const CardView: React.FC = () => {
  return (
    <div className="screen-container">
      <h1>Card View</h1>
      <p>ここでカード選択画面のコンポーネントを作成します。</p>
      <Link to="/" className="button-link">スタート画面に戻る</Link>
    </div>
  );
};

export default CardView;