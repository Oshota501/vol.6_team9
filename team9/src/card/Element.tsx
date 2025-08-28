"use client";
import "./styleE.css";

// このコンポーネントが受け取るPropsの型
type setting = {
    content: string; // 表示する文字 ('あ' など)
    isSelected: boolean; // 自分が選択されているか (true/false)
    onClick: () => void; // クリックされた時に呼び出す関数
    initialPositionClass?: string; // 初期位置を決めるCSSクラス名 (オプショナル)
}

// ブロック役者コンポーネント本体
export default function GameOfElement({ content, isSelected, onClick, initialPositionClass = '' }: setting) {
    // isSelected の値(true/false)に応じて、CSSクラス名 'selected' を付けたり消したりする
    // これにより、選択されたときだけ見た目が変わる
    const className = `obj ${initialPositionClass} ${isSelected ? 'selected' : ''}`.trim();

    return (
        // このdivがブロック本体。クリックされたら親から渡されたonClick関数を実行する
        <div className={className} onClick={onClick}>
            {content}
        </div>
    );
}
