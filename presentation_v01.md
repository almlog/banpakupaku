---
title: '夏休みの自由研究：AIとの協業によるリアルタイム旅行計画アプリ『banpakupaku』の開発'
subtitle: 'Gemini & Claude-code, AWS, GitHubを活用した父子二人旅のDX体験'
author: 'スズキ'
date: '2025/08/15'
---

# 夏休みの自由研究
## AIとの協業によるリアルタイム旅行計画アプリ『banpakupaku』の開発
<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Press Space for next page <carbon:arrow-right class="inline"/>
  </span>
</div>

---
layout: intro
---

# はじめに
## なぜ、ただの旅行計画ではダメだったのか？

- **The Trip:** 父(42)と子(6)の大阪万博二人旅という、変数だらけのプロジェクト
- **The Problem:** 6歳児の体力と興味は予測不能。固定されたスケジュールは高確率で破綻する
- **The Goal:** 状況の変化にリアルタイムで対応できる**「生きている」旅行計画**が不可欠だった

---
layout: default
---

# 解決策：AIアシスタントとの協業

## 対話によるアジャイルな計画策定

- **Main Planner:** Google **Gemini** （全体構成、技術選定、リアルタイムな軌道修正）
- **Sub Planner:** Anthropic **Claude3** （アイデアの壁打ち、多角的な視点の獲得）

**プロセス**
1. 曖昧な要望（「男二人旅サイコープラン」）から対話を開始
2. 交通手段、チケット、興味などの情報をインプット
3. AIが最適なプラン、代替案、リスクを提案
4. 人間が最終決定を下し、AIが計画書を更新

<br>
::: bottom
💡 AIを単なる検索エンジンではなく、**「優秀な旅行コンサルタント」**として活用
:::

---
layout: default
---

# システム化：AIが設計したWebアプリ『banpakupaku』

## AWS上にデプロイされたサーバーレス・アプリケーション

AI（Gemini）に依頼し、企画書・設計書・開発ロードマップを数分で作成。

- **Frontend:** React.js (on **AWS Amplify Hosting**)
- **Backend:** **AWS Lambda** & **API Gateway**
- **Database:** **Amazon DynamoDB**
- **GPS Tracking:** **Amazon Location Service**

<br>
<img src="https://i.imgur.com/Gj3Hq4F.png" class="h-60 mx-auto" alt="System Architecture Diagram">

::: bottom
💡 サーバー管理不要で、低コストかつスケーラブルな構成をAIが提案
:::

---
layout: default
---

# 計画と現実：現場で何が起きたか？

## 計画通りだったこと
- 午前中の「直たこ焼きプラン」は大成功
- AIが提案した優先度付けによるパビリオン巡りも有効
- 帰路のタイムマネジメントも完璧

## 想定外だったこと
- **【！】メインイベントの「ドローンショー」が当日に中止に！**

<br>
計画の根幹が揺らぐ緊急事態。リアルタイムでの**再プランニング**が必須となった。

---
layout: two-cols
---

# 課題：現場で発覚したシステムの限界

## 悔しかったポイント

**The Problem**
ドローンショー中止を受け、スマホでGeminiと緊急会議。夜の代替プラン（ミニ花火＋プロジェクションマッピング）を即座に再策定。

**The Pain Point**
この**新しいプランを、デプロイ済みのWebアプリ『banpakupaku』に反映できなかった。**

**Why?**
- システムの更新には、ローカルPCでのコード修正 → ビルド → デプロイが必要
- 旅行中のスマホからでは、この開発サイクルを回せない
- 結果として、最新の計画は口頭やチャットで共有するしかなかった

::right::

<img src="https://i.imgur.com/Gv6tG7C.png" class="h-90 mx-auto" alt="Pain Point Diagram">

---
layout: default
---

# 改善案：AIとシステムを繋ぐ「Git連携」

## AIとの対話だけで本番システムを更新する仕組み

**Proposed Workflow**
1. **User:** (スマホで) Geminiに「ドローンショー中止！代替プランは？」と相談
2. **AI (Gemini):** 新しいスケジュール（JSON形式など）を生成
3. **AI (Gemini):** 生成したデータをプロジェクトの**GitHubリポジトリ**に自動で`Commit` & `Push`
4. **AWS Amplify:** GitHubへの`Push`をトリガーに、自動でビルド＆デプロイを開始
5. **Result:** 数分後には、家族が見ている『banpakupaku』のスケジュールが最新版に！

<br>
::: bottom
💡 **開発環境が手元になくても、AIとの対話だけで本番システムを更新できる**
:::

---
layout: intro
---

# まとめ
## 今回の自由研究で得られたこと

- **AIとの協業は極めて有効：** 複雑な要件整理、専門知識（AWS設計）の補完において、人間を超えるパフォーマンスを発揮した。
- **現場の即時性が重要：** "計画"と"実行"の間のタイムラグをなくすことが、DXの価値を最大化する。
- **今後の展望：** AIがコードや設定ファイルを直接書き換え、Gitを通じて本番環境に反映させる**「AI-driven DevOps」**の可能性。

<br>
### "AIを使いこなす"ことで、仕事もプライベートも、もっとクリエイティブで面白くなる！

---
layout: default
---

# ご清聴ありがとうございました

## Q & A