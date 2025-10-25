# 🎵 SoundSpace

**3D空間で音楽を創造するWebアプリケーション**

Three.jsとWeb Audio APIを使った、インタラクティブな音楽体験プラットフォームです。

![SoundSpace Preview](https://via.placeholder.com/800x400/667eea/ffffff?text=SoundSpace)

## ✨ 特徴

- 🎹 **3Dインタラクション**: 美しい3D空間で音楽を視覚的に体験
- 🎵 **リアルタイム音響**: Web Audio APIによる高品質なサウンド
- 🎨 **モダンUI**: グラスモーフィズムを採用した洗練されたデザイン
- 📱 **レスポンシブ対応**: デスクトップ・タブレット・スマートフォンで動作
- ⚡ **軽量**: CDNのみで動作、ビルド不要

## 🚀 デモ

[Live Demo](https://your-username.github.io/SoundSpace/)

## 🎮 使い方

1. ページを開く
2. **「▶️ Start Audio」**ボタンをクリック
3. カラフルなキューブをクリックして音を鳴らす
4. マウスドラッグで視点を変更（自動回転中）
5. サイドバーのスライダーで音量・リバーブを調整

### 音階

- 🔴 赤いキューブ: C (ド)
- 🔵 シアンのキューブ: E (ミ)
- 💙 青いキューブ: G (ソ)
- 💚 緑のキューブ: C (ド-高音)

## 🛠️ 技術スタック

- **Three.js** (r128) - 3Dグラフィックス
- **Web Audio API** - 音声合成・処理
- **Vanilla JavaScript** - フレームワークなし
- **CSS3** - モダンスタイリング
- **GitHub Pages** - ホスティング

## 📦 インストール

```bash
# リポジトリをクローン
git clone https://github.com/your-username/SoundSpace.git

# ディレクトリに移動
cd SoundSpace

# ブラウザで開く
open index.html
```

## 🌐 デプロイ

### GitHub Pages

1. GitHubリポジトリの Settings > Pages
2. Source: Deploy from a branch
3. Branch: `main` / `root`
4. Save

数分後に `https://your-username.github.io/SoundSpace/` でアクセス可能になります。

## 📂 プロジェクト構造

```
SoundSpace/
├── index.html      # メインHTMLファイル
├── style.css       # スタイルシート
├── app.js          # JavaScriptロジック
└── README.md       # このファイル
```

## 🔧 カスタマイズ

### 音階を変更

`app.js` の `notes` 配列を編集：

```javascript
const notes = [
    { name: 'C4', frequency: 261.63, color: 0xff6b6b, position: { x: -3, y: 0, z: 0 } },
    // 追加の音階...
];
```

### キューブの数を増やす

配列に新しい音階オブジェクトを追加するだけ！

### カラースキームの変更

`style.css` のグラデーションを編集：

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

## 🎯 今後の予定 (Phase 2-4)

- [ ] シンセサイザー機能（波形選択、ADSR）
- [ ] エフェクト追加（ディレイ、フィルター、コンプレッサー）
- [ ] MIDIキーボード対応
- [ ] レコーディング機能
- [ ] マルチプレイヤー対応（WebRTC）
- [ ] プリセット保存・共有

## 🤝 コントリビューション

プルリクエスト大歓迎です！

1. このリポジトリをフォーク
2. 新しいブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを開く

## 📄 ライセンス

MIT License - 自由に使用・改変・配布できます

## 👨‍💻 作者

Created with ❤️ by [Your Name]

- GitHub: [@your-username](https://github.com/your-username)
- Twitter: [@your-twitter](https://twitter.com/your-twitter)

## 🙏 謝辞

- [Three.js](https://threejs.org/) - 素晴らしい3Dライブラリ
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) - ブラウザでの音声処理

---

⭐ このプロジェクトが気に入ったらスターをお願いします！
