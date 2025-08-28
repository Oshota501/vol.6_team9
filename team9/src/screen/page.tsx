"use client";
import CardsScreen from "./CardsScreen";
import ElementsScreen from "./ElementsScreen";
import { useState, useEffect } from "react"; // ←ここ
import type { CSSProperties } from 'react';
import "./style.css";
import { useStageStore } from "../lib/stageStore"; // ←ここ

interface Block {
    id: number;
    content: string;
  }
  interface BlockGroup {
    id: string;
    blockIds: number[];
    styles: CSSProperties;
  }
  

export default function GameScreenHome() {
    // Zustandから取得
    const { currentStage, stages } = useStageStore();
    const stageData = stages[currentStage];

    // useStateで初期値
    const [blocks, setBlocks] = useState(stageData.blocks);
    const [selectedBlockIds, setSelectedBlockIds] = useState<number[]>([]);
    const [blockGroups, setBlockGroups] = useState<BlockGroup[]>([]); // 型を明確化

    // ステージ切り替え時に初期化
    useEffect(() => {
        setBlocks(stageData.blocks);
        setSelectedBlockIds([]);
        setBlockGroups([]);
    }, [stageData]);

    // --- ロジック（関数）エリア ---
    const handleBlockClick = (blockId: number) => {
        setSelectedBlockIds(prevSelectedIds =>
            prevSelectedIds.includes(blockId)
                ? prevSelectedIds.filter(id => id !== blockId)
                : [...prevSelectedIds, blockId]
        );
    };

    const handleCardApply = (css: CSSProperties) => {
        if (selectedBlockIds.length === 0) return;
    
        setBlockGroups(prevGroups => {
            // 1. 今回選択されたブロックIDに接触する既存グループを全て見つける
            const relevantGroups = prevGroups.filter(group =>
                group.blockIds.some(id => selectedBlockIds.includes(id))
            );
            // 2. 接触しなかった、無関係なグループ
            const unrelatedGroups = prevGroups.filter(group =>
                !group.blockIds.some(id => selectedBlockIds.includes(id))
            );

            // 3. 接触したグループと、今回選択したブロックを全てマージして、
            //    新しいブロックIDのリストを作成する (Setで重複を削除)
            const allIdsToMerge = [
                ...selectedBlockIds,
                ...relevantGroups.flatMap(g => g.blockIds)
            ];
            const mergedBlockIds = [...new Set(allIdsToMerge)].sort((a, b) => a - b);

            // 4. マージ後のスタイルを作成する
            // 接触したグループがあればそのスタイルを引き継ぎ、新しいスタイルで上書きする
            const baseStyles = relevantGroups.length > 0 ? relevantGroups[0].styles : {};
            const mergedStyles = { ...baseStyles, ...css };
    
            // 5. マージされた新しいグループを1つ作成
            const mergedGroup: BlockGroup = {
                id: `group-${Date.now()}`,
                blockIds: mergedBlockIds,
                styles: mergedStyles,
            };

            // 6. 無関係だったグループと、新しくマージしたグループを合わせて返す
            return [...unrelatedGroups, mergedGroup];
        })
        setSelectedBlockIds([]);
    };

    const handleReset = () => {
        setSelectedBlockIds([]);
        setBlockGroups([]);
    };

    const handleUndo = () => {
        if (blockGroups.length > 0) {
            setBlockGroups(prevGroups => prevGroups.slice(0, -1));
        }
    };

    // --- JSX（画面の見た目）エリア ---
    return (
        <div className="main">
            <div className="left_menue">
                <div className="action-buttons-container">
                    <button onClick={handleUndo} className="action-button undo-button">一手戻る</button>
                    <button onClick={handleReset} className="action-button reset-button">リセット</button>
                </div>
                <ElementsScreen
                    blocks={blocks}
                    groups={blockGroups}
                    selectedBlockIds={selectedBlockIds}
                    onBlockClick={handleBlockClick}
                />
            </div>
            <div className="right_menue">
                <div className="cardSelecterh1">所持カード</div>
                <CardsScreen
                    onCardApply={handleCardApply}
                    cards={stageData.cards}
                    // 以下のPropsはCardsScreenが要求するが、今の機能では使わないためダミー値
                    isCard={false} setIsCard={()=>{}} setChCSS={()=>{}} collision={false}
                />
            </div>
        </div>
    );
}