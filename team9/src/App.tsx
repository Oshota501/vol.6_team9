import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartScreen from "./screen/startScreen";
import CardView from './screen/cardView';
import StageSelect from "./screen/selectStage";
import GameScreenHome from './screen/page';
import './App.css';
import Game from "./endless/page";
import Background from "./background";
import GameLv3 from "./screen/game/Lv3"
import GameLv4 from "./screen/game/Lv4"
import GameLv5 from "./screen/game/Lv5"
import GameExplain from "./endless/explain"

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

                    <Route path="/endless_game/start" element={<Game />} />
                    <Route path="/endless_game" element={<GameExplain />} />

                    <Route path="/game/lv3" element={<GameLv3 />} />
                    <Route path="/game/lv4" element={<GameLv4 />} />
                    <Route path="/game/lv5" element={<GameLv5 />} />

                    x
                </Routes>
            </BrowserRouter>
            <Background/>
        </>
    );
}

export default App;
