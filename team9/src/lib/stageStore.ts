import { create } from "zustand";
import type { CSSProperties } from "react";

// ブロック・カード型定義
type Block = { id: number; content: string; };
type CardData = { explain: string; code: CSSProperties; bew: string; isSelect: boolean; };

type StageData = {
  blocks: Block[];
  cards: CardData[];
};

type StageStore = {
  currentStage: number;
  stages: StageData[];
  setStage: (idx: number) => void;
};

export const useStageStore = create<StageStore>((set) => ({
  currentStage: 0,
  stages: [
    {
      blocks: [
        { id: 1, content: "あ" },
        { id: 2, content: "い" },
      ],
      cards: [
        { explain: "ブロックを水平に並べる", code: { display: "flex", flexDirection: "row", gap: "10px" }, bew: "flex-direction: row;", isSelect: true },
      ],
    },
    {
      blocks: [
        { id: 1, content: "A" },
        { id: 2, content: "B" },
        { id: 3, content: "C" },
      ],
      cards: [
        { explain: "縦に並べる", code: { display: "flex", flexDirection: "column", gap: "10px" }, bew: "flex-direction: column;", isSelect: true },
        { explain: "横に並べる", code: { display: "flex", flexDirection: "row", gap: "10px" }, bew: "flex-direction: row;", isSelect: true },
      ],
    },
    {
      blocks: [
        { id: 1, content: "A" },
        { id: 2, content: "B" },
        { id: 3, content: "C" },
        { id: 4, content: "D" },
      ],
      cards: [
        {explain: "グリッドに並べる",code: { display: "grid" },bew: "display: grid;",isSelect: true,},
        {explain: "2列に分ける",code: { gridTemplateColumns: "1fr 1fr" ,display:"grid",},bew: "display: grid;\ngrid-template-columns: 1fr 1fr;",isSelect: true,},
        {explain: "セル間に隙間を作る",code: { gap: "16px" ,display:"grid",},bew: "gdisplay: grid;\nap: 16px;",isSelect: true,},
      ],
    },

    // ...必要に応じてステージ追加
  ],
  setStage: (idx) => set({ currentStage: idx }),
}));