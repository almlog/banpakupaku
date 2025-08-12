import React, { useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import * as mutations from './graphql/mutations';
import * as queries from './graphql/queries';

const client = generateClient();

const itineraryData = [
  // 8月12日（月）
  { startTime: "2025-08-12T21:30:00", title: "西船橋駅南口 高速バス乗り場 集合", points: "トイレを済ませ、飲み物などを準備。バスは定刻に出発します。早めの行動を心がけましょう。" },
  { startTime: "2025-08-12T22:10:00", title: "夜行バス乗車・大阪へ出発！", points: "大阪での大冒険を夢見て、おやすみなさい。リラックスできる服装がおすすめです。" },
  
  // 8月13日（火）【Hybrid Plan A: 桜島駅前降車の場合 - 電車ルート対応版】
  { startTime: "2025-08-13T08:40:00", title: "🚌 桜島駅前（リーベルホテル前）降車", points: "【Plan A最高シナリオ】運転手さんに事前にお願い「子供が体調を崩しやすいので、可能でしたら桜島駅前で降ろしていただけませんか」。時間40分節約、費用700円節約！" },
  { startTime: "2025-08-13T08:50:00", title: "🚃 JRゆめ咲線でUCWへ", points: "桜島→ユニバーサルシティ（1駅2分、240円×2名=480円）。徒歩1分でJR桜島駅、エレベーター完備。" },
  { startTime: "2025-08-13T09:00:00", title: "🍿 ポップコーンパパで「冒険の味」選び", points: "UCW 3階・朝9時から営業・32種類のフレーバー。人が少ない黄金タイム開始！" },
  { startTime: "2025-08-13T10:00:00", title: "🛍️ UCW探検タイム", points: "各ショップ開店時間を意識。ユニバーサル・スタジオ・ストア（ミニオン、マリオグッズ）、Little OSAKA（ビリケンさんグッズ）を順番に。" },
  { startTime: "2025-08-13T11:00:00", title: "🐙 TAKOPA でたこ焼き食べ比べ！", points: "UCW 4階・11時開店・複数店舗を制覇。道頓堀くくる、甲賀流、会津屋。熱々注意、必ず冷ましてから！" },
  { startTime: "2025-08-13T11:45:00", title: "🚃 万博会場へ帰還", points: "JR + シャトルバス（購入済みチケット使用）。JRで桜島駅へ戻り、12:00発シャトルバスで西ゲートへ。" },
  
  // 万博会場内 - 6歳児特化プラン
  { startTime: "2025-08-13T12:00:00", title: "⚡ 入場＆当日予約電撃作戦", points: "QRコード入場→10分後スマホ予約開始！ガンダムNEXT FUTURE館12時枠狙い（大容量で当選確率高）。EXPO2025 Personal Agent（AI秘書アプリ）で6歳児向けプラン自動作成。" },
  { startTime: "2025-08-13T12:30:00", title: "🗺️ 情報収集ミッション", points: "西ゲート案内所で「6歳児向け・空いてるパビリオン」の最新情報入手。ベビーカー優先入場対応館をチェック。" },
  { startTime: "2025-08-13T13:00:00", title: "🌍 世界一周パビリオン巡り【6歳児特化】", points: "🎯最優先（ベビーカー優先入場）：🇫🇷フランス、🇮🇹イタリア、🇨🇳中国、🇸🇪北欧\\n🎯6歳児おすすめ：🇳🇱オランダ、🇨🇭スイス、🇦🇺オーストラリア（AR野生動物）、🇰🇼クウェート（砂遊び・プラネタリウム・滑り台）、🇯🇴ヨルダン（裸足で砂漠体験）" },
  { startTime: "2025-08-13T15:00:00", title: "🎭 予約済みミュージカル鑑賞", points: "スタンド席でリラックス鑑賞・最高の休憩時間。座って楽しめる貴重な時間。" },
  { startTime: "2025-08-13T16:00:00", title: "😌 ファミリー向けクールダウン", points: "みゃくぽ！テラス（ミスト付き休憩所・800ポイント）、ベビーセンター（東・西ゲート・無料お湯・電子レンジ）、スタンプパスポートラリー（1,100円・達成感）、ポケモン像探し（7箇所・無料フォトスポット）" },
  { startTime: "2025-08-13T18:00:00", title: "🍜 夕食・フードコート", points: "大阪名物を味わう。混雑ピーク過ぎで比較的スムーズ。6歳児の好みに合わせて選択。" },
  
  // 夜の部：感動フィナーレ【電車ルート完全対応】
  { startTime: "2025-08-13T19:30:00", title: "🎆 ドローンショー「One World, One Planet.」", points: "1000機のドローンが織りなす光の芸術・約20分間の感動体験。レジャーシート必須！西ゲート付近がおすすめ。" },
  { startTime: "2025-08-13T20:15:00", title: "🚶‍♂️ 東ゲートへ移動開始", points: "ショー終了後の混雑を避けて早めの移動開始。お子様と手をつないで迷子防止。" },
  { startTime: "2025-08-13T20:45:00", title: "🚇 夢洲駅到着・電車で梅田へ", points: "【重要】シャトルバス満席のため電車ルート確定。東ゲート→夢洲駅（徒歩2分）→本町駅→梅田駅（約30分、430円×2名=860円）" },
  { startTime: "2025-08-13T21:45:00", title: "🚊 梅田駅到着", points: "余裕を持って夜行バス乗り場へ移動。平日最終電車は0:20発なので安心。本町駅での乗り換え：緑色の中央線から赤色の御堂筋線へ。" },
  { startTime: "2025-08-13T22:20:00", title: "🚌 ヨドバシ梅田タワー前バスターミナル", points: "乗り遅れ防止のため10分前到着。梅田駅から徒歩5分、道順を事前確認済み。コンビニで飲み物購入、トイレも完了。" },
  { startTime: "2025-08-13T22:30:00", title: "🌙 夜行バス乗車・千葉へ出発", points: "お疲れ様でした！素晴らしい思い出と共に帰路へ。バス会社：050-3851-0264（ツーリストバス）" },
  
  // 8月14日（水）
  { startTime: "2025-08-14T08:50:00", title: "西船橋駅 到着", points: "無事到着！最高の冒険でした。家に帰るまでが旅行です。ベビーセンターで安全リストバンド、迷子対策も万全でした。" }
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