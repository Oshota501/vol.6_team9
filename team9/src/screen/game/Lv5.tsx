import { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import "./gm3.css";

export default function GameLv5() {
    // カード一覧
    const cards = [
        { text: "filter", code: "filter: blur(5px);" },
        { text: "box-shadow", code: "box-shadow: 10px 10px 5px grey;" },
        { text: "", code: "filter: grayscale(100%);" },
        { text: "", code: "box-shadow: none;" },
        { text: "", code: "filter: brightness(2);" },
        { text: "", code: "transition\ntransition: all 0.3s ease;" },
        { text: "", code: "background: purple;" },
        { text: "", code: "color: white;" },
    ];

    // ゲームオブジェクトの初期設定
    const initialGameObjects = [
        { text: "filter", className: "goj2" },
    ];

    // 選択中カードindex
    const [selectedCard, setSelectedCard] = useState<number | null>(null);
    // 各GameObjに適用するstyleの配列
    const [objStyles, setObjStyles] = useState<React.CSSProperties[]>(
        () => initialGameObjects.map(() => ({}))
    );

    // style文字列をオブジェクトに変換
    function parseStyle(styleStr: string): React.CSSProperties {
        const style: any = {};
        styleStr.split(";").forEach(rule => {
            const [prop, value] = rule.split(":").map(s => s && s.trim());
            if (prop && value) {
                // camelCase変換
                const camelProp = prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
                style[camelProp] = value;
            }
        });
        return style;
    }

    // GameObjクリック時（indexを受け取るように変更）
    function handleObjClick(index: number) {
        if (selectedCard !== null) {
            setObjStyles(prevStyles => {
                const newStyles = [...prevStyles];
                newStyles[index] = { ...newStyles[index], ...parseStyle(cards[selectedCard].code) };
                return newStyles;
            });
        }
    }

    return (
        <div className="main_field">
            <div className="field1">
                {/* 複数のGameObjを描画 */}
                {initialGameObjects.map((obj, index) => (
                    <GameObj
                        key={index}
                        text={obj.text}
                        className={obj.className}
                        style={objStyles[index]}
                        onClick={() => handleObjClick(index)} // クリック時にindexを渡す
                    />
                ))}
            </div>
            <div className="field2">
                <div className="card1">
                    所持カード
                    <br/><strong>目標：オブジェクトにホバーしたときに、ぼかしとドロップシャドウを適用してください。</strong>
                </div>
                {cards.map((card, idx) => (
                    <LvGameCard
                        key={idx}
                        text={card.text}
                        code={card.code}
                        selected={selectedCard === idx}
                        onClick={() => setSelectedCard(idx)}
                    />
                ))}
            </div>
            <Link to="/" className="back-button" title="スタート画面に戻る">
                ←
            </Link>
        </div>
    )
}

type lvcard = {
    text : string ;
    code : string ;
    selected?: boolean;
    onClick?: () => void;
}
function LvGameCard({text,code,selected,onClick}:lvcard){
    return (
        <div
            className={`card2${selected ? " selected" : ""}`}
            style={selected ? { border: "2px solid rgba(255, 112, 112, 1)" } : {}}
            onClick={onClick}
        >
            <code>{code}</code><br/>
            {text}
        </div>
    )
}

type gameobj = {
    text : string ;
    className : string ;
    style?: React.CSSProperties;
    onClick?: () => void;
}
function GameObj({text,className,style,onClick}:gameobj){
    return(
        <div className={className} style={style} onClick={onClick}>
            {text}
        </div>
    )
}