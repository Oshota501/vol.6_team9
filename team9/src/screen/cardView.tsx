import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './cardView.css'; // 新しく作成するCSSファイルをインポート

// 表示するカードのデータ
const cardData = [
  {
    property: 'flex-direction: row',
    description: 'アイテムが水平方向に左から右へと配置されます。',
    detailedDescription: '主軸を水平方向（左から右）に設定し、フレックスアイテムを配置します。これはflex-directionの初期値です。'
  },
  {
    property: 'flex-direction: row-reverse',
    description: 'アイテムが水平方向に右から左へと配置されます。',
    detailedDescription: '主軸を水平方向（右から左）に設定し、フレックスアイテムを逆順に配置します。'
  },
  {
    property: 'flex-direction: column',
    description: 'アイテムが垂直方向に上から下へと配置されます。',
    detailedDescription: '主軸を垂直方向（上から下）に設定し、フレックスアイテムを配置します。'
  },
  {
    property: 'flex-direction: column-reverse',
    description: 'アイテムが垂直方向に下から上へと配置されます。',
    detailedDescription: '主軸を垂直方向（下から上）に設定し、フレックスアイテムを逆順に配置します。'
  },
  // 他のカードもここに追加できます
];

// 型定義: cardDataの各要素の型を定義
type Card = typeof cardData[0];

const CardView: React.FC = () => {
  // ポップアップで表示するカードの情報を管理するState
  // 初期値は null（何も選択されていない状態）
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  // カードがクリックされたら、そのカード情報をStateにセットする
  const handleCardClick = (card: Card) => {
    setSelectedCard(card);
  };

  // ポップアップを閉じる
  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  return (
    <div className="card-view-container">
      <h1>CSSカード一覧</h1>
      <p>学習したいカードをクリックすると詳細が表示されます。</p>
      
      {/* カード一覧をグリッドで表示 */}
      <div className="card-grid">
        {cardData.map((card, index) => (
          <div key={index} className="info-card" onClick={() => handleCardClick(card)}>
            <h3>{card.property}</h3>
            <p>{card.description}</p>
          </div>
        ))}
      </div>

      <Link to="/" className="button-link">スタート画面に戻る</Link>

      {/* ポップアップ（モーダル）表示 */}
      {/* selectedCardに情報がある場合のみ表示される */}
      {selectedCard && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedCard.property}</h2>
            {/* ここに図解などを追加できます */}
            <p>{selectedCard.detailedDescription}</p>
            <button onClick={handleCloseModal} className="close-button">閉じる</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardView;