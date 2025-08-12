import React, { useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import * as mutations from './graphql/mutations';
import * as queries from './graphql/queries';

const client = generateClient();

const itineraryData = [
  // 8月12日（月）
  { startTime: "2025-08-12T21:30:00", title: "西船橋駅南口 高速バス乗り場 集合", points: "トイレを済ませ、飲み物などを準備。バスは定刻に出発します。早めの行動を心がけましょう。" },
  { startTime: "2025-08-12T22:10:00", title: "夜行バス乗車・大阪へ出発！", points: "大阪での大冒険を夢見て、おやすみなさい。リラックスできる服装がおすすめです。" },
  
  // 8月13日（火）【Hybrid Plan A: 桜島駅前降車の場合】
  { startTime: "2025-08-13T08:40:00", title: "🚌 桜島駅前（リーベルホテル前）降車", points: "【Plan A最高シナリオ】運転手さんの好意に感謝！目の前がJR桜島駅。時間節約40分、費用節約700円、体力温存！" },
  { startTime: "2025-08-13T08:45:00", title: "🚶 JR桜島駅へ移動", points: "徒歩1分、エレベーター完備。改札まですぐです。" },
  { startTime: "2025-08-13T08:50:00", title: "🚃 JRゆめ咲線乗車", points: "ユニバーサルシティ駅まで1駅2分（180円）。朝の空いている時間帯でラッキー！" },
  { startTime: "2025-08-13T09:00:00", title: "🎪 UCW到着・早朝作戦開始", points: "3階メインエントランスから入場。まだ人が少ない黄金タイム！" },
  { startTime: "2025-08-13T09:05:00", title: "🍿 ポップコーンパパ（3階）", points: "⭐朝9時開店の貴重な店！32種類から選ぶ楽しさ。おすすめ：キャラメル、チーズ、抹茶味" },
  { startTime: "2025-08-13T09:30:00", title: "🏪 ローソンで飲み物購入", points: "レストラン開店前の水分補給対策。子供用のお茶も忘れずに。" },
  { startTime: "2025-08-13T09:45:00", title: "🛍️ ユニバーサル・スタジオ・ストア", points: "10時開店と同時に入店！ミニオン、マリオグッズをチェック。混雑前の特権。" },
  { startTime: "2025-08-13T10:15:00", title: "📸 写真撮影タイム", points: "アメリカンな街並みで記念撮影。人が少ない朝の特権！インスタ映え確実。" },
  { startTime: "2025-08-13T10:30:00", title: "🎁 Little OSAKA（3階）", points: "大阪土産の下見（ビリケンさん、たこ焼きグッズ）。帰りに買うものをチェック。" },
  { startTime: "2025-08-13T10:50:00", title: "🚻 トイレ休憩・準備", points: "TAKOPA開店前の最終準備。手を洗って、たこ焼きに備えよう！" },
  { startTime: "2025-08-13T11:00:00", title: "🐙 TAKOPA開店ダッシュ！", points: "⭐開店と同時に入店で混雑回避！推奨：道頓堀くくる、甲賀流の2店舗制覇。熱々注意！" },
  { startTime: "2025-08-13T11:30:00", title: "🍴 たこ焼き満喫", points: "冷まし時間含む、お子様は4個セットがベスト。フードコートでゆっくり。" },
  { startTime: "2025-08-13T11:45:00", title: "🚃 万博会場へ出発", points: "JRで桜島駅→シャトルバスで西ゲート（12:00,12:15発）https://www.expo2025.or.jp/access/" },
  
  // 万博会場内
  { startTime: "2025-08-13T12:00:00", title: "🎊 万博西ゲート到着・入場！", points: "QRコードで素早く入場。いよいよ万博の冒険開始！" },
  { startTime: "2025-08-13T12:10:00", title: "📱 当日予約バトル", points: "⚡ガンダムパビリオン12時枠に挑戦！予約サイトに事前ログインしておくこと。取れなくても大丈夫！" },
  { startTime: "2025-08-13T12:30:00", title: "🗺️ 案内所で情報収集", points: "「6歳が楽しめる空いているパビリオン」を聞く。リアルタイム混雑情報をゲット！" },
  { startTime: "2025-08-13T12:45:00", title: "🍙 軽食タイム", points: "混雑前にお昼ごはん（おにぎり等）。ガンダム横の芝生広場がおすすめ。" },
  { startTime: "2025-08-13T13:00:00", title: "🌍 パビリオン巡り開始", points: "予約不要ベスト5：🇳🇱オランダ（オーブ体験）、🇨🇭スイス（球体シアター）、🇩🇪ドイツ（循環都市）、🇦🇺オーストラリア（動物）、🇺🇸アメリカ（宇宙）" },
  { startTime: "2025-08-13T15:00:00", title: "各パビリオン攻略中", points: "各パビリオン30-45分（待ち時間含む）、移動10-15分、30分ごとに5分休憩を忘れずに！" },
  { startTime: "2025-08-13T17:00:00", title: "🎭 予約済みミュージカル鑑賞", points: "座って休憩できる貴重な時間。お子様も楽しめる内容で大満足！" },
  { startTime: "2025-08-13T18:00:00", title: "🍜 夕食", points: "フードコートで大阪名物を。混雑ピークを過ぎているので比較的スムーズ。" },
  { startTime: "2025-08-13T18:45:00", title: "🌳 静けさの森で休憩", points: "夜のショー前のエネルギーチャージ。お子様の体力回復タイム。" },
  { startTime: "2025-08-13T19:15:00", title: "🎆 ドローンショー観覧場所確保", points: "西ゲート付近がおすすめ。レジャーシート必須！" },
  
  // 夜の部
  { startTime: "2025-08-13T19:30:00", title: "🎆 ドローンショー鑑賞", points: "20万機のドローンが描く光のアート！昼間とは全く違う幻想的な万博。最高の思い出！" },
  { startTime: "2025-08-13T20:00:00", title: "📸 夜の万博撮影", points: "ライトアップされた会場は別世界。記念撮影を忘れずに！" },
  { startTime: "2025-08-13T20:30:00", title: "🚌 西ゲートから退場準備", points: "混雑前に移動開始。お子様と手をつないで迷子防止。" },
  { startTime: "2025-08-13T20:45:00", title: "🚌 梅田行きシャトルバス乗車", points: "直通40分で梅田へ。座って帰れる快適さ。https://www.expo2025.or.jp/access/" },
  { startTime: "2025-08-13T21:30:00", title: "🏙️ 梅田到着", points: "ヨドバシ梅田タワー付近に到着。ここからが最後の準備。" },
  { startTime: "2025-08-13T21:45:00", title: "🏪 コンビニで最終準備", points: "飲み物、軽食購入。トイレも済ませておきましょう。" },
  { startTime: "2025-08-13T22:15:00", title: "🚌 バス乗り場へ移動", points: "余裕を持って移動。お土産の最終チェック！" },
  { startTime: "2025-08-13T22:30:00", title: "🚌 夜行バス乗車・千葉へ！", points: "たくさんの思い出を胸に帰路へ。お疲れ様でした！" },
  
  // 8月14日（水）
  { startTime: "2025-08-14T08:50:00", title: "西船橋駅 到着", points: "無事到着！最高の冒険でした。家に帰るまでが旅行です。" }
];

export const SeedDatabaseFixed = () => {
  const [status, setStatus] = useState('待機中');
  const [isLoading, setIsLoading] = useState(false);

  const clearDatabase = async () => {
    setStatus('データベースをクリア中...');
    setIsLoading(true);
    
    try {
      // 既存のデータを全て取得
      const result = await client.graphql({
        query: queries.listItineraries,
        variables: { limit: 1000 }
      }) as any;
      
      const items = result.data?.listItineraries?.items || [];
      
      // 全てのアイテムを削除
      for (const item of items) {
        await client.graphql({
          query: mutations.deleteItinerary,
          variables: { input: { id: item.id } }
        });
      }
      
      setStatus(`${items.length}件のデータを削除しました。`);
    } catch (error: any) {
      console.error('Error clearing database:', error);
      setStatus(`クリアエラー: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const seedDatabase = async () => {
    setStatus('登録処理を開始します...');
    setIsLoading(true);
    let count = 0;
    
    try {
      for (const item of itineraryData) {
        const input = {
          startTime: item.startTime,
          title: item.title,
          points: item.points,
          description: item.title,
        };
        
        await client.graphql({ 
          query: mutations.createItinerary, 
          variables: { input: input } 
        });
        
        count++;
        setStatus(`${count} / ${itineraryData.length} 件 登録完了...`);
      }
      
      setStatus('すべてのデータの登録が完了しました！');
      
      // 3秒後にページをリロード
      setTimeout(() => {
        window.location.reload();
      }, 3000);
      
    } catch (error: any) {
      console.error('データベースへの登録中にエラーが発生しました', error);
      console.error('Error details:', error.errors);
      setStatus(`エラー: ${error.message || error.errors?.[0]?.message || 'データ登録に失敗しました'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      padding: '20px', 
      background: 'white', 
      borderRadius: '10px', 
      margin: '20px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <h2>🎌 旅行計画データ登録ツール</h2>
      <p>データベースに旅行計画を登録・管理します。</p>
      
      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        <button 
          onClick={clearDatabase} 
          disabled={isLoading}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            background: isLoading ? '#ccc' : '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          {isLoading ? '処理中...' : 'データベースをクリア'}
        </button>
        
        <button 
          onClick={seedDatabase} 
          disabled={isLoading}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            background: isLoading ? '#ccc' : '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          {isLoading ? '登録中...' : '新しいデータを登録'}
        </button>
      </div>
      
      <p style={{ marginTop: '15px', fontWeight: 'bold' }}>
        ステータス: {status}
      </p>
    </div>
  );
};