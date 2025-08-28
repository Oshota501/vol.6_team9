export default function Background() {
    return (
        <div style={{
            // 1. ビューポート基準で位置を固定
            position: "fixed",
            
            // 2. 他のすべての要素より背面に配置
            zIndex: -1,
            
            // 3. 画面全体に広げる
            width: "100vw", // 100% of viewport width
            height: "100vh", // 100% of viewport height
            top: 0,
            left: 0,

            // 4. 背景画像の見栄えを良くする設定
            backgroundImage: "url(/background.png)", // パスの修正
            backgroundSize: "cover",
            backgroundPosition: "center",
        }} />
    );
}