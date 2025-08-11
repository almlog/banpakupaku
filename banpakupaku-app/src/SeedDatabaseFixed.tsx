import React, { useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import * as mutations from './graphql/mutations';
import * as queries from './graphql/queries';

const client = generateClient();

const itineraryData = [
  // 8月12日（月）
  { startTime: "2025-08-12T21:30:00", title: "西船橋駅南口 高速バス乗り場 集合", points: "トイレを済ませ、飲み物などを準備。バスは定刻に出発します。早めの行動を心がけましょう。" },
  { startTime: "2025-08-12T22:10:00", title: "夜行バス乗車・大阪へ出発！", points: "大阪での大冒険を夢見て、おやすみなさい。リラックスできる服装がおすすめです。" },
  
  // 8月13日（火）詳細版 - UCW完全攻略プラン
  { startTime: "2025-08-13T08:50:00", title: "大阪万博 西ゲート前 到着", points: "バスを降りたら、まずトイレの場所を確認。夢に見た万博会場はもう目の前！" },
  { startTime: "2025-08-13T09:00:00", title: "シャトルバスでJR桜島駅へ", points: "西ゲート前のバスロータリーから乗車。約15分のバス旅です。" },
  { startTime: "2025-08-13T09:15:00", title: "JRゆめ咲線でユニバーサルシティ駅へ", points: "桜島駅から一駅だけ電車に乗ります。すぐに到着！" },
  { startTime: "2025-08-13T09:25:00", title: "ポップコーンパパで特別な朝食を！", points: "32種類の味からお気に入りを選びましょう！ここから気分は最高潮！" },
  { startTime: "2025-08-13T10:00:00", title: "UCWを散策＆早めのランチ", points: "カラフルなショップを眺めたり、大阪名物たこ焼きの食べ比べをしたり。11時開店の「TAKOPA」が狙い目です。" },
  { startTime: "2025-08-13T11:45:00", title: "万博会場へ帰還！", points: "再びJRとシャトルバスを乗り継ぎ、決戦の地・西ゲートへ。いよいよ入場です！" },
  
  // 万博会場内
  { startTime: "2025-08-13T12:00:00", title: "【最重要】入場＆当日予約電撃作戦！", points: "入場ゲートを通過しながら、スマホでガンダムパビリオン(12時枠)の当日登録に挑戦！取れれば最高、取れなくても全く問題なし！" },
  { startTime: "2025-08-13T12:30:00", title: "案内所で情報収集＆作戦会議", points: "まずは案内所へ。「子どもが楽しめる、今一番空いているパビリオンは？」と聞きましょう！リアルタイム情報をゲット！" },
  { startTime: "2025-08-13T13:00:00", title: "【世界旅行へ出発！】予約不要パビリオン巡り", points: "優先度S：🇳🇱オランダ、🇨🇭スイス、🇩🇪ドイツ\\n優先度A：🇦🇪UAE、🇦🇺オーストラリア、🇺🇸アメリカ\\n案内所の情報をもとに、待ち時間の少ないパビリオンから攻略！" },
  { startTime: "2025-08-13T15:00:00", title: "予約済みミュージカル鑑賞", points: "パビリオン巡りの合間に、予約したスタンド席で素晴らしいショーを鑑賞。良い休憩にもなります。" },
  { startTime: "2025-08-13T16:00:00", title: "休憩＆フリータイム", points: "人混みに疲れたら「静けさの森」でクールダウン。おやつを食べたり、屋外のパフォーマンスを楽しんだりしましょう。" },
  
  // 夜の部
  { startTime: "2025-08-13T19:30:00", title: "夜空を彩るドローンショー（花火）鑑賞", points: "一日の締めくくりに、夜空に描かれる光のアートを鑑賞。昼間とは全く違う、幻想的な万博の姿を目に焼き付けましょう。最高の思い出になること間違いなしです。" },
  { startTime: "2025-08-13T21:00:00", title: "感動のフィナーレ、梅田へ移動開始", points: "ショーの終了後、感動の余韻に浸りながら、速やかに西ゲートのシャトルバス乗り場へ向かいます。閉場間際は混雑するので、お子様と逸れないよう注意しましょう。" },
  { startTime: "2025-08-13T21:20:00", title: "梅田（大阪駅）行きシャトルバスに乗車", points: "乗り換えなしで座って帰れる快適なバスで、梅田へ向かいます。バスの中で少し仮眠をとるのも良いでしょう。https://www.expo2025.or.jp/access/" },
  { startTime: "2025-08-13T22:00:00", title: "梅田到着、バス乗車準備", points: "ヨドバシ梅田タワー近くに到着。バス乗り場近くのコンビニやカフェで、帰りのバスで飲む飲み物の購入やトイレを済ませておきましょう。" },
  { startTime: "2025-08-13T22:20:00", title: "ヨドバシ梅田タワー前バスターミナルへ", points: "乗り遅れないように、余裕をもってバス乗り場へ移動します。お土産の最終チェックもこの時に。" },
  { startTime: "2025-08-13T22:30:00", title: "夜行バス乗車・千葉へ！", points: "たくさんの思い出を胸に、帰路につきます。お疲れ様でした！" },
  
  // 8月14日（水）
  { startTime: "2025-08-14T08:50:00", title: "西船橋駅 到着", points: "無事到着です。家に帰るまでが冒険です。気をつけてお帰りください！" }
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