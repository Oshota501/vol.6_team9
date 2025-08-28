import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartScreen from './screen/startScreen';
import CardView from './screen/cardView';
import StageSelect from './screen/stageSelecte';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* URLが "/" の時は StartScreen を表示 */}
        <Route path="/" element={<StartScreen />} />

        {/* URLが "/card-view" の時は CardView を表示 */}
        <Route path="/card-view" element={<CardView />} />

        {/* URLが "/stage-select" の時は StageSelect を表示 */}
        <Route path="/stage-select" element={<StageSelect />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
