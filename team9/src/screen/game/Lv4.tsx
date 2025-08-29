import { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import "./gm3.css";

export default function GameLv4() {
    // カード一覧
    const cards = [
        { text: "transform", code: "transform: rotate(90deg) scale(2);" },
        { text: "transition", code: "transition: transform 0.5s ease-in-out;" },
        { text: "", code: "transform: rotate(45deg);" },
        { text: "", code: "transform: scale(1.5);" },
        { text: "", code: "transition: transform 0.2s linear;" },
        { text: "", code: "transform-origin\ntransform-origin: top left;" },
        { text: "", code: "background: blue;" },
        { text: "", code: "border-radius: 50%;" },
    ];

    // ゲームオブジェクトの初期設定
    const initialGameObjects = [
        { text: "transform", className: "goj2" },
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
                    <br/><strong>目標：オブジェクトをホバーしたときに、右に90度回転し、2倍のサイズにしてください。</strong>
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