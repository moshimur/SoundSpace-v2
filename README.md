# 🎵 SoundSpace

**3D空間で音楽を創造するWebアプリケーション**

Three.jsとWeb Audio APIを使った、インタラクティブな音楽制作体験。

---

## 🌐 デモ

**👉 [SoundSpace を体験する](https://moshimur.github.io/SoundSpace-v2/)**

---

## ✨ 特徴

### 🎹 シンセサイザー機能
- **4種類の波形**: Sine（柔らか）、Square（8bit）、Sawtooth（太い）、Triangle（中間）
- **ADSRエンベロープ**: Attack（立ち上がり）とRelease（余韻）を自由に調整
- **ローパスフィルター**: 100Hz〜20000Hzの範囲で音色を変化
- **リバーブエフェクト**: 空間的な響きを追加

### 🎨 3Dビジュアル
- **4つのサウンドキューブ**: Cメジャーコード（C-E-G-C）を表現
- **リアルタイムライティング**: 動的な光源とシャドウマップ
- **パーティクルシステム**: 1000個の浮遊粒子による幻想的な空間
- **自動カメラ回転**: ゆっくりと回転する視点

### 💻 インタラクション
- **マウスクリック**: キューブをクリックして音を鳴らす
- **ホバーエフェクト**: マウスオーバーで視覚的フィードバック
- **リアルタイムコントロール**: 音量、リバーブ、波形をその場で調整
- **統計表示**: 演奏回数と最後の音階を記録

---

## 🎮 使い方

1. **ページを開く** - ローディング後、自動的に3D空間が表示されます
2. **「▶️ Start Audio」をクリック** - オーディオシステムを起動
3. **キューブをクリック** - 音を鳴らして演奏
4. **パラメータを調整** - 右側のパネルで音色をカスタマイズ

### 🎛️ コントロールパネル

#### 基本コントロール
- **Volume**: マスター音量（0〜100%）
- **Reverb**: リバーブの深さ（0〜100%）

#### シンセサイザー
- **波形**: 音の基本形状を選択
- **Attack**: 音の立ち上がり速度（0〜0.5秒）
- **Release**: 音の消え方の速度（0〜2秒）
- **Filter**: カットオフ周波数（100〜20000Hz）

---

## 🎼 音階

| キューブ | 音階 | 周波数 | 色 |
|---------|------|--------|-----|
| 1 | C4（ド） | 261.63Hz | 🔴 赤 |
| 2 | E4（ミ） | 329.63Hz | 🟢 青緑 |
| 3 | G4（ソ） | 392.00Hz | 🔵 青 |
| 4 | C5（ド-高） | 523.25Hz | 🟢 緑 |

---

## 🛠️ 技術スタック

### フロントエンド
- **HTML5** - セマンティックマークアップ
- **CSS3** - モダンスタイリング、グラデーション、アニメーション
- **Vanilla JavaScript** - フレームワークレス実装

### ライブラリ
- **[Three.js](https://threejs.org/)** (r128) - 3Dグラフィックスレンダリング
- **[Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)** - 音響処理

### デプロイ
- **GitHub Pages** - 静的サイトホスティング
- **GitHub Actions** - 自動デプロイメント

---

## 📂 プロジェクト構成

```
SoundSpace-v2/
├── index.html          # メインHTML
├── style.css           # スタイルシート
├── app.js              # メインロジック
└── README.md           # このファイル
```

---

## 🎯 実装の特徴

### 音響処理
```javascript
// Web Audio APIによるシンセサイザー実装
- OscillatorNode: 波形生成
- GainNode: 音量制御とADSRエンベロープ
- BiquadFilterNode: ローパスフィルター
- 複数ノードの接続による音響処理チェーン
```

### 3Dレンダリング
```javascript
// Three.jsによる3Dシーン構築
- PerspectiveCamera: 視点制御
- WebGLRenderer: ハードウェアアクセラレーション
- MeshStandardMaterial: PBRマテリアル
- Raycaster: マウスインタラクション
```

---

## 🚀 ローカル開発

### セットアップ
```bash
# リポジトリをクローン
git clone https://github.com/moshimur/SoundSpace-v2.git
cd SoundSpace-v2

# ローカルサーバーを起動（例：Python）
python -m http.server 8000

# ブラウザで開く
open http://localhost:8000
```

### 必要環境
- モダンブラウザ（Chrome、Firefox、Safari、Edge）
- WebGL対応
- Web Audio API対応

---

## 💡 おすすめの使い方

### 🎵 ファミコン風サウンド
1. 波形: **Square**
2. Attack: **0%**
3. Release: **20%**
4. Filter: **50%**

### 🌊 アンビエント・パッド
1. 波形: **Sawtooth**
2. Attack: **80%**
3. Release: **100%**
4. Reverb: **70%**

### 🎸 ベース音
1. 波形: **Sine**
2. Attack: **5%**
3. Release: **30%**
4. Filter: **30%**

---

## 📊 パフォーマンス

- **ファイルサイズ**: 約50KB（HTML+CSS+JS）
- **レンダリング**: 60 FPS
- **レイテンシー**: <10ms（オーディオ）
- **対応デバイス**: デスクトップ、タブレット

---

## 🎓 学習ポイント

このプロジェクトで学べる技術：

1. **Web Audio API** - リアルタイム音響処理
2. **Three.js** - 3Dグラフィックス基礎
3. **シンセサイザー理論** - ADSR、フィルター、波形
4. **インタラクティブUI** - リアルタイムパラメータ調整
5. **パフォーマンス最適化** - アニメーションループ、メモリ管理

---

## 🔮 今後の可能性

Phase3以降で追加可能な機能：
- 🎹 キーボード演奏（QWERTY対応）
- 🎼 音階の拡張（1オクターブ以上）
- 📝 録音・再生機能
- 🎚️ 追加エフェクト（Delay、Chorus、Distortion）
- 🎮 MIDIキーボード対応
- 👥 マルチプレイヤーモード
※Phase3以降の機能を追加したら動かなくなったため、Phase2に戻したSoundSpace-v2を新規作成した

---

## 📜 ライセンス

MIT License

---

## 👨‍💻 作者

**moshimur**

- GitHub: [@moshimur](https://github.com/moshimur)

---

## 🙏 謝辞

- **Three.js** - 素晴らしい3Dライブラリ
- **Web Audio API** - ブラウザネイティブな音響処理
- **GitHub Pages** - 無料ホスティング

---

**🎵 Let's create music in 3D space! 🎵**
