"use client";
import "./style.css"; // カード用のCSSをインポート
import type { CSSProperties } from "react";

// このコンポーネントが受け取るPropsの型
type TextCardProps = {
    explain: string; // カードの説明文
    code: CSSProperties; // 適用するCSSスタイルオブジェクト
    bew: string; // カードに表示するCSS文字列
    onCardApply: (css: CSSProperties) => void; // クリックされた時に呼び出す関数
};

// CSSカード役者コンポーネント本体
export default function TextCard({ explain, code, bew, onCardApply }: TextCardProps) {
    // このdivがカード本体。クリックされたら親から渡されたonCardApply関数を実行する
    // 引数として、このカードが持つCSSスタイル(code)を渡す
    return (
        <div className="card" onClick={() => onCardApply(code)}>
            <div className="code-box">
                <code>{bew}</code>
            </div>
            <p className="explain-text">{explain}</p>
        </div>
    );
}