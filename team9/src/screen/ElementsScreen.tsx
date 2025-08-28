"use client";
import "./ElementsScreen.css";
// 子コンポーネントである個々のブロックをインポート
import GameOfElement from "../card/Element";
import type { CSSProperties } from 'react';

// TypeScript用の型定義
interface Block {
  id: number;
  content: string;
}
interface BlockGroup {
  id: string;
  blockIds: number[];
  styles: CSSProperties;
}
// このコンポーネントが受け取るProps(親からのデータ)の型
interface ElementsScreenProps {
    blocks: Block[];
    groups: BlockGroup[];
    selectedBlockIds: number[];
    onBlockClick: (id: number) => void;
}

// 舞台コンポーネント本体
export default function ElementsScreen({ blocks, groups, selectedBlockIds, onBlockClick }: ElementsScreenProps) {
    console.log("blocks", blocks);
    console.log("groups", groups)
    

    // --- 描画前の準備 ---
    // 現在グループ化されているブロックのIDを全てリストアップ
    const groupedBlockIds = groups.flatMap(group => group.blockIds);
    // 全ブロックの中から、まだグループ化されていないブロックだけを抽出
    const ungroupedBlocks = blocks.filter(block => !groupedBlockIds.includes(block.id));


    // --- JSX（画面の見た目）エリア ---
    return (
        // パズルエリア全体を囲むコンテナ
        <div className="puzzle-container">
            {/* まず、作成されたグループをmap関数で一つずつ描画します */}
            {groups.map(group => (
                // グループの親div。page.tsxから渡されたスタイルがここに適用される
                <div key={group.id} style={group.styles} className="block-group">
                    {/* グループに属するブロックIDを元に、ブロックを一つずつ描画 */}
                    {group.blockIds.map(blockId => {
                        const block = blocks.find(b => b.id === blockId);
                        if (!block) return null;
                        return (
                            // 個々のブロックコンポーネントを呼び出す
                            <GameOfElement
                                key={block.id}
                                content={block.content}
                                isSelected={selectedBlockIds.includes(block.id)}
                                onClick={() => onBlockClick(block.id)}
                            />
                        );
                    })}
                </div>
            ))}

            {/* 次に、まだグループ化されていないブロックを初期位置に描画します */}
            {ungroupedBlocks.map((block) => {
                // 初期位置を決めるためのCSSクラス名を変数に入れる
                let initialPositionClass = '';
                if (block.id === 1) initialPositionClass = 'item-top-left';
                if (block.id === 2) initialPositionClass = 'item-bottom-right';

                return (
                    // 個々のブロックコンポーネントを呼び出す
                    <GameOfElement
                        key={block.id}
                        content={block.content}
                        isSelected={selectedBlockIds.includes(block.id)}
                        onClick={() => onBlockClick(block.id)}
                        initialPositionClass={initialPositionClass}
                    />
                );
            })}
        </div>
    );
}