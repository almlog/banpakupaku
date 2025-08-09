# banpakupaku - 大阪万博2025 リアルタイム位置共有アプリ

## 概要
2025年8月13日の大阪万博旅行（父子2人旅）において、家族がリアルタイムで旅行者の位置を追跡し、安心感と感動を共有するためのWebアプリケーション。

## 主な機能
- 旅行計画の表示
- リアルタイムGPS位置追跡
- インタラクティブな地図表示

## 技術スタック
### フロントエンド
- React.js
- TypeScript
- MapLibre GL JS
- AWS Amplify Hosting

### バックエンド
- AWS API Gateway
- AWS Lambda (Node.js)
- Amazon DynamoDB
- Amazon Location Service

## プロジェクト構成
```
banpakupaku/
├── banpakupaku-app/     # Reactアプリケーション
│   ├── src/             # ソースコード
│   ├── public/          # 静的ファイル
│   └── amplify/         # Amplify設定
├── banpaku-mission.md   # 旅行計画書
└── banpakupaku.md       # プロジェクト仕様書
```

## セットアップ
### 前提条件
- Node.js 18.x以上
- AWS CLI
- Amplify CLI

### インストール
```bash
# Amplify CLIのインストール
npm install -g @aws-amplify/cli

# プロジェクトディレクトリへ移動
cd banpakupaku-app

# 依存関係のインストール
npm install

# Amplifyの初期化
amplify init

# バックエンドのデプロイ
amplify push
```

### ローカル開発
```bash
cd banpakupaku-app
npm start
```

## デプロイ
```bash
amplify publish
```

## 開発ロードマップ
- [x] フェーズ0: 基盤構築とプロトタイピング
- [ ] フェーズ1: 旅行計画表示機能の実装
- [ ] フェーズ2: GPSリアルタイム追跡機能の実装
- [ ] フェーズ3: 最終調整とリリース

## ライセンス
Private Project

## 作成者
スズキ シュンペイ