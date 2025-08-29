import { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import "./gm3.css";

export default function GameLv3() {
    // カード一覧
    const cards = [
        { text: "", code: "background:yellow;\nanimation:5s linear infinite goj1_a;" },
        { text: "", code: "transform:scale(1);\nanimation:20s linear infinite goj1_a;" },
        { text: "", code: "animation:2s linear infinite goj1_a;\ncolor:black;" },
        { text: "font-size", code: "fontSize:14px;\nanimation:2s linear infinite goj1_a;" },
        { text: "font-weight", code: "fontWeight:200;\nborder:0px solid;" },
        { text: "", code: "animation:null;" },
        { text: "", code: "animation:null;\nbackground:white;" },
        { text: "", code: "background:red;\ntransform:translate(2px);" },
        { text: "", code: "animation:2s linear infinite goj1_a;" },
        { text: "", code: "width:500px;height:500px;" },
    ];

    // ゲームオブジェクトの初期設定
    const initialGameObjects = [
        { text: "hello", className: "goj1" },
        { text: "...world...", className: "goj2" },
        { text: "!!!!", className: "goj3" },
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
                newStyles[index] = parseStyle(cards[selectedCard].code);
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
                    <br/><strong>目標：やかましくなくしてください。</strong>
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