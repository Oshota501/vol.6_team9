"use client";

import { useState, useEffect, useRef } from "react";
import type { CSSProperties } from "react"; // CSSPropertiesは型としてインポート
import "./t2.css";

// --- 型定義 ---
// 1. CSSの型をより具体的にする
interface Card {
  id: number; // ← 修正点: keyに使うためのユニークなIDを追加
  code: CSSProperties; // ← 修正点: objectからCSSPropertiesに変更
  looks: string;
  view_code: string;
  lv: number;
}

interface GameObject {
  id: number; // ← 修正点: こちらもkey用にIDを追加
  style: CSSProperties; // ← 修正点: objectからCSSPropertiesに変更
  text: string;
}

type CardProps = {
  card: Card;
  selected: boolean;
  onClick: () => void;
};

type GameProps = {
  goj: GameObject;
  onClick: () => void;
}

// --- 初期データ生成 ---
const DATABASE_CARD: Omit<Card, 'id'>[] = [ // ← 修正点: idを除いた型を指定
    /*文字色*/
    { code: { color: "yellow" }, looks: "線の色を変えます。", view_code: "color:yellow;", lv: 1 },
    { code: { color: "blue" }, looks: "線の色を変えます。", view_code: "color:blue;", lv: 1 },
    { code: { color: "green" }, looks: "線の色を変えます。", view_code: "color:green;", lv: 1 },
    { code: { color: "red" }, looks: "線の色を変えます。", view_code: "color:red;", lv: 1 },
    { code: { color: "white" }, looks: "線の色を変えます。", view_code: "color:white;", lv: 1 },
    { code: { color: "orange" }, looks: "線の色を変えます。", view_code: "color:orange;", lv: 1 },
    { code: { color: "lightgreen" }, looks: "線の色を変えます。", view_code: "color:lightgreen;", lv: 1 },
    { code: { color: "lightblue" }, looks: "線の色を変えます。", view_code: "color:lightblue;", lv: 1 },
    { code: { color: "pink" }, looks: "線の色を変えます。", view_code: "color:pink;", lv: 1 },
    { code: { color: "gray" }, looks: "線の色を変えます。", view_code: "color:gray;", lv: 1 },
    /*背景色*/
    { code: { background: "black" }, looks: "背景の色を変えます。", view_code: "background:black;", lv: 1 },
    { code: { background: "white" }, looks: "背景の色を変えます。", view_code: "background:white;", lv: 1 },
    { code: { background: "green" }, looks: "背景の色を変えます。", view_code: "background:green;", lv: 1 },
    { code: { background: "red" }, looks: "背景の色を変えます。", view_code: "background:red;", lv: 1 },
    { code: { background: "yellow" }, looks: "背景の色を変えます。", view_code: "background:yellow;", lv: 1 },
    { code: { background: "blue" }, looks: "背景の色を変えます。", view_code: "background:blue;", lv: 1 },
    { code: { background: "linear-gradient(to right,yellow,red,yellow,red,yellow)" }, looks: "背景の色を変えます。", view_code: "background:linear-gradient(to right,yellow,red,yellow,red,yellow);", lv:4 },
    { code: { background: "linear-gradient(to right,green,blue,green,blue,green,blue)" }, looks: "背景の色を変えます。", view_code: "background:linear-gradient(to right,green,blue,green,blue,green,blue);", lv: 4  },
    { code: { background: "linear-gradient(to right,red,orange,yellow,lightgreen,green,blue,purple)" }, looks: "背景の色を変えます。", view_code: "background:linear-gradient(to right,red,orange,yellow,lightgreen,green,blue,puaple);", lv: 5  },
    { code: { background: "linear-gradient(135deg,rgba(255,0,125,0.5),rgba(255,0,255,0.5),rgba(125,0,255,0.5),rgba(0,0,255,0.5),rgba(0,125,255,0.5),rgba(0,255,255,0.5),rgba(0,255,125,0.5),rgba(0,255,0,0.5),rgba(125,255,0,0.5),rgba(255,255,0,0.5),rgba(255,125,0,0.5),rgba(255,0,0,0.5)),linear-gradient(45deg,rgba(255,0,0,0.5),rgba(255,125,0,0.5),rgba(255,255,0,0.5),rgba(125,255,0,0.5),rgba(0,255,0,0.5),rgba(0,255,125,0.5),rgba(0,255,255,0.5),rgba(0,125,255,0.5),rgba(0,0,255,0.5),rgba(125,0,255,0.5),rgba(255,0,255,0.5),rgba(255,0,125,0.5))" }, looks: "背景の色を変えます。", view_code: "background:linear-gradient(135deg,rgba(255,0,125,0.5),rgba(255,0,255,0.5),rgba(125,0,255,0.5),rgba(0,0,255,0.5),rgba(0,125,255,0.5),rgba(0,255,255,0.5),rgba(0,255,125,0.5),rgba(0,255,0,0.5),rgba(125,255,0,0.5),rgba(255,255,0,0.5),rgba(255,125,0,0.5),rgba(255,0,0,0.5)),linear-gradient(45deg,rgba(255,0,0,0.5),rgba(255,125,0,0.5),rgba(255,255,0,0.5),rgba(125,255,0,0.5),rgba(0,255,0,0.5),rgba(0,255,125,0.5),rgba(0,255,255,0.5),rgba(0,125,255,0.5),rgba(0,0,255,0.5),rgba(125,0,255,0.5),rgba(255,0,255,0.5),rgba(255,0,125,0.5));", lv: 20  },
    /*文字スタイル*/
    { code: { fontSize: "12px" }, looks: "文字の大きさを変更します。", view_code: "font-size:12px;", lv: 1 },
    { code: { fontSize: "15px" }, looks: "文字の大きさを変更します。", view_code: "font-size:15px;", lv: 1 },
    { code: { fontSize: "19px" }, looks: "文字の大きさを変更します。", view_code: "font-size:19px;", lv: 1 },
    { code: { fontSize: "23px" }, looks: "文字の大きさを変更します。", view_code: "font-size:23px;", lv: 1 },
    { code: { fontSize: "26px" }, looks: "文字の大きさを変更します。", view_code: "font-size:26px;", lv: 1 },
    { code: { fontSize: "31px" }, looks: "文字の大きさを変更します。", view_code: "font-size:31px;", lv: 1 },
    { code: { fontSize: "31px" }, looks: "文字の大きさを変更します。", view_code: "font-size:50px;", lv: 2 },
    /*文字太さ*/ 
    { code: { fontWeight: "900", }, looks: "文字の太さを変更します。", view_code: "font-weight:900;", lv: 3 },
    { code: { fontWeight: "500", }, looks: "文字の太さを変更します。", view_code: "font-weight:500;", lv: 3 },
    /*border*/
    { code: { border: "1px solid", }, looks: "枠線の設定を変更します。", view_code: "border:1px solid;", lv: 1 },
    { code: { border: "2px solid", }, looks: "枠線の設定を変更します。", view_code: "border:2px solid;", lv: 1 },
    { code: { border: "3px solid", }, looks: "枠線の設定を変更します。", view_code: "border:3px solid;", lv: 1 },
    { code: { border: "1px double", }, looks: "枠線の設定を変更します。", view_code: "border:1px double;", lv: 2 },
    { code: { border: "2px double", }, looks: "枠線の設定を変更します。", view_code: "border:1px double;", lv: 2 },
    { code: { border: "3px double", }, looks: "枠線の設定を変更します。", view_code: "border:1px double;", lv: 2 },
    { code: { border: "3px inset", }, looks: "枠線の設定を変更します。", view_code: "border:3px inset;", lv: 2 },
    { code: { borderRadius: "3px ", }, looks: "枠線の設定を変更します。", view_code: "border-radius:3px;", lv: 2 },
    { code: { borderRadius: "5px", }, looks: "枠線の設定を変更します。", view_code: "border-radius:5px;", lv: 2 },
    { code: { borderRadius: "10px", }, looks: "枠線の設定を変更します。", view_code: "border-radius:10px;", lv: 2 },
    { code: { borderRadius: "50%", }, looks: "枠線の設定を変更します。", view_code: "border-radius:50%;", lv: 2 },

    /*移動変形*/
    { code: { transform: "rotate(45deg)", }, looks: "移動変形させます。", view_code: "transfrom:rotate(45deg);", lv: 2 },
    // { code: { transform: "scale(1.5,0,7)", }, looks: "移動変形させます。", view_code: "transfrom:scale(1.5,0,7);", lv: 2 },
    { code: { transform: "tranlate(10px)", }, looks: "移動変形させます。", view_code: "transfrom:tranlate(10px);", lv: 2 },
    { code: { transform: "skew(30deg, 20deg)", }, looks: "移動変形させます。", view_code: "transform: skew(30deg, 20deg);", lv: 2 },
    { code: { transform: "rotate(180deg)", }, looks: "移動変形させます。", view_code: "transfrom:rotate(45deg);", lv: 2 },
    { code: { transform: "rotate(30deg)", }, looks: "移動変形させます。", view_code: "transfrom:rotate(45deg);", lv: 2 },
    { code: { transform: "rotate(-30deg)", }, looks: "移動変形させます。", view_code: "transfrom:rotate(45deg);", lv: 2 },
    { code: { transform: "rotate(-45deg)", }, looks: "移動変形させます。", view_code: "transfrom:rotate(45deg);", lv: 2 },
    //margin
    
    //padding
    { code: { padding: "20px 20px", }, looks: "余裕を確保します。", view_code: "padding:20px 20px;", lv: 2 },
    { code: { padding: "4px 4px", }, looks: "余裕を確保します。", view_code: "padding:4px 4px;", lv: 3 },
    { code: { padding: "10px 0px", }, looks: "余裕を確保します。", view_code: "padding:10px 0px;", lv: 3 },
    //text-align
    
    //animation
    { code: { animation: " 3s ease-in 1s infinite reverse both running slide-in", }, looks: "アニメーションを追加します。", view_code: "animation: 3s ease-in 1s infinite reverse both running slide-in;", lv: 4 },
    { code: { animation: "3s linear 1s infinite running slide-in", }, looks: "アニメーションを追加します。", view_code: "animation: 3s linear 1s infinite running slide-in;", lv: 4 },
    { code: { animation: "3s linear 1s infinite alternate slide-in", }, looks: "アニメーションを追加します。", view_code: "animation: 3s linear 1s infinite alternate slide-in;", lv: 4 },
    { code: { animation: " 0.5s linear 1s infinite alternate slide-in", }, looks: "アニメーションを追加します。", view_code: "animation: 0.5s linear 1s infinite alternate slide-in;", lv: 5 },
];

function createInitialCards(): Card[] {
    let rand: Card[] = [];
    for (let i = 0; i < 15; i++) {
        const randomCard = DATABASE_CARD[Math.floor(Math.random() * DATABASE_CARD.length)];
        rand.push({ 
            ...randomCard,
            id: i, // ← 修正点: IDをここで付与（より堅牢にするならuuidなど）
        });
    }
    return rand;
};
  
const initialGameObjs: GameObject[] = [
  {
    id:0,
    style:{},
    text:"他力本願寺",
  },{
    id:1,
    style:{},
    text:"2025年8月28日オープン。",
  },{
    id:2,
    style:{},
    text:"概要",
  },{
    id:3,
    style:{},
    text:"初日訪問者3.1415人。",
  },{
    id:4,
    style:{},
    text:"全米が鼻で笑ったこのお寺に宗派はありません。React.jsによって環境構築されたこのお寺は、環境が重すぎてどうやってもマージし切れないくらいの規模になりました。",
  },{
    id:5,
    style:{},
    text:"住職はブランチを10個近く作ったのにも関わらず一度も使っていないブランチが複数個あることは悲しい限りです。",
  },{
    id:6,
    style:{},
    text:"京都の下町、西陣にて降臨爆誕したこのお寺には毎日円周率よりわずかに少ない量の人が訪問し、お賽銭をネイピア数を僅かに下回る量のお金入れていってくれません。",
  },{
    id:7,
    style:{},
    text:"法人名、意気込み",
  },{
    id:8,
    style:{},
    text:"他力本願寺",
  },{
    id:9,
    style:{},
    text:"私たちは他人に任せて私たちはただ飯を食うことを目指して、他にもない素晴らしいプロダクトを提供したいです。",
  },{
    id:10,
    style:{},
    text:"住所",
  },{
    id:11,
    style:{},
    text:"日本",
  },{
    id:12,
    style:{},
    text:"電話番号",
  },{
    id:13,
    style:{},
    text:"00000000000000000000000",
  },{
    id:14,
    style:{},
    text:"日本",
  },{
    id:15,
    style:{},
    text:"0.000000000006ベネズエラボリバル",
  },{
    id:16,
    style:{},
    text:"開発メンバー",
  },{
    id:17,
    style:{},
    text:"ryuki,jin,seiya,oshota",
  }
];


// --- メインコンポーネント ---
export default function Game() {
  const pDataRef = useRef<HTMLDivElement>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [gameObjs, setGameObjs] = useState<GameObject[]>(initialGameObjs);

  // カードが全て使い切られているか判定
  const allCardsUsed = cards.length === 0;

  useEffect(() => {
    setCards(createInitialCards());
  }, []);
  
  const handleEvaluate = () => {
    if (pDataRef.current) {
        return pDataRef.current.innerHTML;
    }
    return "";
  };

  const handleProblemClick = (gameObjId: number) => {
    if (selectedIndex === null) return;
    const selectedCard = cards.find((_, idx) => idx === selectedIndex);
    if (!selectedCard) return;

    setGameObjs(prev =>
      prev.map(obj =>
        obj.id === gameObjId
          ? { ...obj, style: { ...obj.style, ...selectedCard.code } }
          : obj
      )
    );
    setCards(prev => prev.filter((_, idx) => idx !== selectedIndex));
    setSelectedIndex(null);
  };
  
  return (
    <>
      <div className="game_field">

        <div className="game">
            <div className="menue_game">
                ここで評価。100点満点。<FetchReqButton
                    url="https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"
                    btn_text="評価"
                    GEMINI_API_KEY=""
                    getPrompt = {handleEvaluate}
                    disabled={!allCardsUsed} // ← 追加
                />
                {!allCardsUsed && (
                  <div style={{color: "red", fontWeight: "bold", marginTop: 8}}>
                    全てのカードを使い切るまで評価できません
                  </div>
                )}
            </div>
            <div className="body_games" id="p_data"  ref={pDataRef}>
            {gameObjs.map(elm => (
                <Problem_Website
                key={elm.id} 
                goj={elm}
                onClick={() => handleProblemClick(elm.id)}
                />
            ))}
            </div>
        </div>
        <div className="card_field">
          <div className="card_field_h1">
            カード一覧
          </div>
          {cards.map((elm, index) => (
            <Card_View
              key={elm.id} 
              card={elm}
              selected={selectedIndex === index}
              onClick={() => setSelectedIndex(selectedIndex === index ? null : index)}
            />
          ))}
        </div>
        <a href="/">
          <div className="back_button">
            ←
          </div>
        </a>
      </div>

    </>
  );
}

// --- 子コンポーネント ---
function Card_View({ card, selected, onClick }: CardProps) {
  const r = "★".repeat(card.lv); 
  const bc_style = selected ? "rgba(255, 255, 94, 1)" : "beige";

  return (
    <div
      className="card_"
      style={{ background: bc_style, cursor: "pointer" }}
      onClick={onClick}
    >
      <code>{card.view_code}</code>
      <br /> 
      {card.looks}
      <br />
      レア度：<span>{r}</span>
    </div>
  );
}

function Problem_Website({ goj, onClick }: GameProps) {
  return (
    <div
      className="game_body"
      style={goj.style}
      onClick={onClick}
    >
      {goj.text}
    </div>
  );
}


type FetchReq = {
    // send http reqest
    url : string ;
    btn_text : string ;
    GEMINI_API_KEY : string ;
    getPrompt: () => string;
    disabled?: boolean; // ← 追加
}

// FetchReqButtonコンポーネント内
export function FetchReqButton({ url, btn_text, GEMINI_API_KEY, getPrompt, disabled }: FetchReq) {
    const [resultStr, setResultStr] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    async function SendReq(prompt: string): Promise<string> {
        console.log("SendReqが実行されました。送信するPrompt:", prompt); // 確認用のlog
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("X-goog-api-key", GEMINI_API_KEY);
            const res = await fetch(url, {
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: "<!DOCTYPE html><html><head><meta charset='utf-8'/><title>他力本願寺</title></head><body>" + prompt + "</body></html>\n\nあなたはwebデザイナーです。このhtmlを100点満点で厳しく採点して、その理由も簡潔にマークダウンを用いずに教えてください。。なお200字程度でお願いします。class名には触れず、色使い等に触れてください。"
                                }
                            ]
                        }
                    ]
                }),
                method: "POST",
                headers: myHeaders,
            });
            if (!res.ok) {
                throw new Error(`レスポンスステータス: ${res.status}`);
            }
            const json = await res.json();
            // APIからのレスポンスがない場合のフォールバック
            return json.candidates?.[0]?.content?.parts?.[0]?.text ?? "有効なレスポンスがありませんでした。";
        } catch (e) {
            console.error("APIリクエストエラー:", e);
            return "サーバーでエラーが発生しました。";
        }
    }

    const handleClick = async () => {
        setLoading(true); // ローディング開始
        try {
            const currentPrompt = getPrompt();
            const data = await SendReq(currentPrompt);
            setResultStr(data);
        } catch (error) {
            console.error("handleClick内エラー:", error);
            setResultStr("エラーが発生しました");
        } finally {
            setLoading(false); // ✅ 正しくはfalseにしてローディングを終了させる
        }
    };

    return (
        <>
            <button onClick={handleClick} disabled={loading || disabled}>
                {loading ? '読み込み中...' : btn_text}
            </button>
            <p>
                {resultStr}
            </p>
        </>
    );
}
// export function FetchReqButton({url,btn_text,GEMINI_API_KEY,getPrompt}:FetchReq){
//     const [resultStr,setResultStr] = useState<string>("") ;
//     const [loading, setLoading] = useState<boolean>(false);

//     async function SendReq (prompt: string) : Promise<string>{
//         try{
//             const myHeaders = new Headers();
//             myHeaders.append("Content-Type", "application/json");
//             myHeaders.append("X-goog-api-key",GEMINI_API_KEY)
//             const res = await fetch(url,{
//                 body: JSON.stringify(
//                     {
//                         contents: [
//                         {
//                             parts: [
//                                 {
//                                     text: "<!DOCTYPE html><html><head><meta charset='utf-8'/><title>他力本願寺</title></head><body>" + prompt + "</body>/html>\n\nあなたはwebプログラマーです。このhtmlを100点満点で厳しく採点して、その理由も簡潔にマークダウンを用いずに教えてください。。なお200字程度でお願いします。"
//                                 }
//                             ]
//                         }
//                         ]
//                     }
//                 ),
//                 method : "POST" ,
//                 headers: myHeaders,
//             } );
//             if (!res.ok) {
//                 throw new Error(`レスポンスステータス: ${res.status}`);
//             }
//             const json = await res.json();
//             return await json.candidates[0].content.parts[0].text ;
//         }catch(e){
//             console.error("エラー:", e);
//             return "server is not found or stoping now ."
//         }
//     }
    
//     const handleClick = async () => {
//         setLoading(true);
//         try {
//             // 6. getPrompt関数を実行して最新のpromptを取得し、SendReqに渡す
//             const currentPrompt = getPrompt(); 
//             const data = await SendReq(currentPrompt);
//             setResultStr(data);
//         } catch (error) {
//             setResultStr("エラーが発生しました");
//         } finally{
//             setLoading(true) ;
//         }
//     };

//     return (
//         <>
//             <button onClick={handleClick} disabled={loading}>
//                 {loading ? '読み込み中...' : btn_text}
//             </button>
//             <p>
//                 {resultStr}
//             </p>
//         </>
//     );
// }
