import { Link } from "react-router";
import "./style.css" ;

export default function GameExplain(){
    // function handleClick(){

    // }
    return (
        <> 
            <div>
                <div className="m1">CSS力Testへようこそ</div>
                <div className="m2">ここではあなたがどれくらいcssを理解しているか確認することができます。</div>
                <div className="m1">Gemini先生の評価</div>
                <div className="m2">GeminiAPIを用いた高性能LLMによる正確かつ公正なな評価を受けることができます。</div>
                <div className="m1">成長と進化</div>
                <div className="m2">何度でも挑戦して学習することで自身で成長を促すことが可能です。</div>
                <Link to="/endless_game_start"><div className="btn_start">今すぐスタート</div></Link>
            </div>
            <Link to="/">
                <div className="back_button">
                    ←
                </div>
            </Link>
        </>
    )
}