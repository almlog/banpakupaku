# banpakupaku - 大阪万博2025 リアルタイム位置共有アプリ

[![amplify-shield]][amplify-link]

[amplify-shield]: https://img.shields.io/badge/Powered%20by-AWS%20Amplify-orange.svg
[amplify-link]: https://aws.amazon.com/amplify/

## 概要

2025年8月の大阪万博旅行において、旅行者（父・子）の現在地と旅程を、離れた場所にいる家族がリアルタイムで確認し、安心感と感動を共有するためのWebアプリケーションです。

**デプロイ先URL (v0.1):** [https://dev.d28ih72wij22t7.amplifyapp.com](https://dev.d28ih72wij22t7.amplifyapp.com)

## 主な機能

- 旅行計画の表示
- リアルタイムGPS位置追跡
- インタラクティブな地図表示

## 技術スタック

| カテゴリ       | 技術                                   |
| :------------- | :------------------------------------- |
| **フロントエンド** | React, TypeScript                      |
| **バックエンド**   | AWS Amplify, GraphQL (AWS AppSync)     |
| **データベース**   | Amazon DynamoDB                        |
| **ホスティング**   | AWS Amplify Hosting (S3 + CloudFront)  |
| **位置情報**     | Amazon Location Service (予定)         |

## セットアップとローカル開発

#### 前提条件

- [Node.js](https://nodejs.org/) (v18.x 以上)
- [AWS CLI](https://aws.amazon.com/cli/) が設定済みであること
- [AWS Amplify CLI](https://docs.amplify.aws/cli/start/install/) (v12.x 以上)

#### 手順

1.  **リポジトリをクローン**
    ```bash
    git clone https://github.com/almlog/banpakupaku.git
    cd banpakupaku/banpakupaku-app
    ```

2.  **依存関係をインストール**
    ```bash
    npm install
    ```

3.  **Amplifyバックエンドと連携**
    
    AWSプロファイル（本プロジェクトでは `banpakupaku` を使用）を指定して、クラウド上のバックエンド定義を取得します。
    ```bash
    amplify pull --profile banpakupaku
    ```

4.  **開発サーバーを起動**
    ```bash
    npm start
    ```
    ブラウザで `http://localhost:3000` が自動的に開きます。

## 開発ロードマップ

- [x] **フェーズ0: 基盤構築とプロトタイピング**
- [x] **フェーズ1: 旅行計画表示機能の実装 (バックエンド)**
- [ ] **フェーズ2: 旅行計画表示機能の実装 (フロントエンド)**
- [ ] **フェーズ3: GPSリアルタイム追跡機能の実装**
- [ ] **フェーズ4: 最終調整とリリース**

---

*This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and accelerated by AWS Amplify.*