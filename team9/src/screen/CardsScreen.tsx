"use client";
// 子コンポーネントである個々のカードをインポート
import TextCard from "../card/test";
import type { CSSProperties } from "react";

// カード1枚のデータの型
type CardData = {
  explain: string ;
  code: CSSProperties ;
  isSelect: boolean ;
  bew: string ;
}

// このコンポーネントが受け取るPropsの型
type CardsScreenProps = {
    cards: CardData[];
    onCardApply: (css: CSSProperties) => void;
}

// カード置き場コンポーネント本体
export default function CardsScreen({ cards, onCardApply }: CardsScreenProps){
    return (
        // 複数の要素を返すためのReact.Fragment
        <>
            {
                // 親から渡されたcards配列をmap関数で展開し、1枚ずつTextCardコンポーネントとして表示
                cards.map((card, index) => {
                    return (
                        <TextCard
                            key={index}
                            explain={card.explain}
                            code={card.code}
                            bew={card.bew}
                            onCardApply={onCardApply} // クリックされた時の処理をそのまま子に渡す
                        />
                    );
                })
            }
        </>
    );
}