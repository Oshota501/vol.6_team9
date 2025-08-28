import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartScreen from "./screen/startScreen";
import CardView from './screen/cardView';
import StageSelect from "./screen/selectStage";
import GameScreenHome from './screen/page';
import './App.css';

function App() {
    return (
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
            </Routes>
        </BrowserRouter>
    );
}

export default App;
