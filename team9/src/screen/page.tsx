"use client";
import { Link } from "react-router-dom";
import CardsScreen from "./CardsScreen";
import ElementsScreen from "./ElementsScreen";
import { useState, useEffect } from "react";
import type { CSSProperties } from 'react';
import "./style.css";
import { useStageStore } from "../lib/stageStore";

// ブロック定義
// interface Block {
//     id: number;
//     content: string;
// }

// BlockGroupの入れ子対応
interface BlockGroup {
    id: string;
    blockIds: number[];
    styles: CSSProperties;
    children?: BlockGroup[];
}

type FlatBlockGroup = BlockGroup & { parentId?: string };

// 入れ子グループをフラットに変換
function flattenGroups(groups: BlockGroup[], parentId?: string): FlatBlockGroup[] {
    return groups.flatMap(group => [
        { ...group, parentId },
        ...(group.children ? flattenGroups(group.children, group.id) : [])
    ]);
}

function addGroupWithNest(
    prevGroups: BlockGroup[],
    selectedBlockIds: number[],
    css: CSSProperties
): BlockGroup[] {
    const flatGroups = flattenGroups(prevGroups);
    const groupMap = new Map<number, FlatBlockGroup>();
    flatGroups.forEach(g => g.blockIds.forEach(id => groupMap.set(id, g)));
    const selectedBlockGroups = selectedBlockIds.map(id => groupMap.get(id)).filter(Boolean) as FlatBlockGroup[];
    const parentIds = [...new Set(selectedBlockGroups.map(g => g.parentId))];
    let newGroups = [...prevGroups];

    if (
        selectedBlockGroups.length > 0 &&
        parentIds.length === 1 &&
        parentIds[0]
    ) {
        const updateGroup = (groups: BlockGroup[]): BlockGroup[] =>
            groups.map(g => {
                if (g.id === parentIds[0]) {
                    return {
                        ...g,
                        children: [
                            ...(g.children || []),
                            {
                                id: `group-${Date.now()}`,
                                blockIds: selectedBlockIds,
                                styles: css,
                                children: [],
                            }
                        ]
                    };
                }
                return {
                    ...g,
                    children: g.children ? updateGroup(g.children) : []
                };
            });
        newGroups = updateGroup(prevGroups);
    } else {
        const removeBlocks = (groups: BlockGroup[]): BlockGroup[] =>
            groups
                .map(g => ({
                    ...g,
                    blockIds: g.blockIds.filter(id => !selectedBlockIds.includes(id)),
                    children: g.children ? removeBlocks(g.children) : [],
                }))
                .filter(g => g.blockIds.length > 0 || (g.children && g.children.length > 0));

        const cleanedGroups = removeBlocks(prevGroups);
        newGroups = [
            ...cleanedGroups,
            {
                id: `group-${Date.now()}`,
                blockIds: selectedBlockIds,
                styles: css,
                children: [],
            }
        ];
    }

    return newGroups;
}

// ---- ここから正解例の表示ロジック追加 ----

// ステージごとに正解例（画像or文字）を用意
const stageAnswers: (string | undefined)[] = [
    `
+-------------+
| [あ] [い]    |
+-------------+
    `,
    `
+-----+
| [A] |
| [B] |
| [C] |
+------+
    `,
    `
+-----+
| [A] |
| [B] |
+------+
| [C] |
| [D] |
+------+
    `,
    // 2ステージ目以降は必要に応じて追加
    undefined,
];

// 正解例表示用コンポーネント
function StageAnswer({ answer }: { answer?: string }) {
    if (!answer) return null;
    // 画像ならimg表示、テキストならpreで整形
    const isImage = /^https?:\/\//.test(answer.trim());
    return (
        <div className="card-answer-ex">
            <div className="card-answer-title">正解例</div>
            {isImage ? (
                <img src={answer.trim()} alt="正解例" style={{ maxWidth: "90%", margin: "16px auto", display: "block" }} />
            ) : (
                <pre className="card-answer-diagram">{answer.trim()}</pre>
            )}
        </div>
    );
}

// ---- CSSを追加すること（下記） ----

export default function GameScreenHome() {
    const { currentStage, stages } = useStageStore();
    const stageData = stages[currentStage];

    const [blocks, setBlocks] = useState(stageData.blocks);
    const [selectedBlockIds, setSelectedBlockIds] = useState<number[]>([]);
    const [blockGroups, setBlockGroups] = useState<BlockGroup[]>([]);

    useEffect(() => {
        setBlocks(stageData.blocks);
        setSelectedBlockIds([]);
        setBlockGroups([]);
    }, [stageData]);

    const handleBlockClick = (blockId: number) => {
        setSelectedBlockIds(prevSelectedIds =>
            prevSelectedIds.includes(blockId)
                ? prevSelectedIds.filter(id => id !== blockId)
                : [...prevSelectedIds, blockId]
        );
    };

    const handleCardApply = (css: CSSProperties) => {
        if (selectedBlockIds.length === 0) return;
        setBlockGroups(prevGroups => addGroupWithNest(prevGroups, selectedBlockIds, css));
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
                />
                {/* ここに正解例を追加 */}
                <StageAnswer answer={stageAnswers[currentStage]} />
            </div>
            <Link to="/" className="back-button" title="スタート画面に戻る">
                ←
            </Link>
        </div>
    );
}
