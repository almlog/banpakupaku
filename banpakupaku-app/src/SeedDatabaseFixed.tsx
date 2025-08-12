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
  
  // 夜の部：感動フィナーレ【ドローンショー完全攻略・2プラン選択】
  { startTime: "2025-08-13T19:30:00", title: "🎆 ドローンショー観覧プラン選択", points: "Plan A：大屋根リング上段（高さ約20m・最高の観覧体験・19:30移動開始・20:45入場制限）\\nPlan B：ウォータープラザ前（6歳児に最適・地上レベル・水上ショー連続鑑賞・20:00移動開始）" },
  { startTime: "2025-08-13T20:00:00", title: "🌊 【Plan B】ウォータープラザ前へ移動", points: "ゆとりある移動でお子様のペースに合わせ。海に浮かぶ「ウォーターカスケード」前で地上レベル・座って観覧可能。後方立ち見スペースなら予約不要。" },
  { startTime: "2025-08-13T20:30:00", title: "💧 水上ショー「アオと夜の虹のパレード」", points: "約300基の噴水・レーザー・音楽の幻想的ショー。目の前で展開される水と光のファンタジー。ドローンショーとの連続エンターテイメント。" },
  { startTime: "2025-08-13T21:00:00", title: "🌟 ドローンショー「One World Tree」開始", points: "毎日21時から約10分間。Plan A：1000機が目前に展開・圧倒的迫力（大屋根リング上段）\\nPlan B：水面反射とドローンの美しいコラボ・海に面したロケーション（ウォータープラザ前）" },
  { startTime: "2025-08-13T21:10:00", title: "⚡ ショー終了・確実帰還ルート開始", points: "Plan A：大屋根リングから即下降（エスカレーターで約5分）\\nPlan B：地上レベルから自然に退場\\n共通：東ゲートより西ゲートが近い・お子様と手をつないで迷子防止" },
  { startTime: "2025-08-13T21:15:00", title: "🚇 夢洲駅到着・電車乗車", points: "中央線で本町駅へ（約20分）。混雑必至だが最終電車0:20まで余裕あり。ウォータープラザから駅まで徒歩約3分、大屋根リングからもアクセス良好。" },
  { startTime: "2025-08-13T21:35:00", title: "🔄 本町駅で御堂筋線に乗り換え", points: "中央線ホーム→御堂筋線ホーム（緑→赤）。案内表示に従って梅田方面へ。料金：430円×2名=860円" },
  { startTime: "2025-08-13T21:45:00", title: "🚊 梅田駅到着・余裕の45分前！", points: "完璧なタイミングで安心到着。平日最終電車は0:20発なので余裕あり。" },
  { startTime: "2025-08-13T22:00:00", title: "🍽️ 梅田で最後の大阪グルメタイム", points: "ヨドバシ梅田タワー内で軽食・お土産・トイレ。30分の余裕時間を有効活用。" },
  { startTime: "2025-08-13T22:20:00", title: "🚌 ヨドバシ梅田タワー前バスターミナル", points: "乗り遅れ防止のため10分前到着・完璧なタイミング。梅田駅から徒歩5分、道順を事前確認済み。" },
  { startTime: "2025-08-13T22:30:00", title: "🌙 夜行バス乗車・千葉へ出発", points: "絶対確実！素晴らしい思い出と共に帰路へ。バス会社：050-3851-0264（ツーリストバス）" },
  
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