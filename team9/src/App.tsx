import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartScreen from "./screen/startScreen";
import CardView from './screen/cardView';
import StageSelect from "./screen/selectStage";
import GameScreenHome from './screen/page';
import './App.css';
import Game from "./endless/page";
import Background from "./background";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* スタート画面をルートパスに設定 */}
                    <Route path="/" element={<StartScreen />} />
                    {/* カード選択画面のルートを設定 */}
                    <Route path="/card-view" element={<CardView />} />
                    {/* ステージ選択画面のルートを設定 */}
                    <Route path="/StageSelect" element={<StageSelect />} />
                    
                    {/* ↓↓↓ ここを追記 ↓↓↓ */}
                    {/* URLが "/game" の時は page.tsx (GameScreenHome) を表示 */}
                    <Route path="/game" element={<GameScreenHome />} />

                    <Route path="/endless_game" element={<Game />} />
                </Routes>
            </BrowserRouter>
            <Background/>
            <img src="/public/background.png"/>
        </>
    );
}

export default App;
