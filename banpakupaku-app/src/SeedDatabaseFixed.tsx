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
  { startTime: "2025-08-13T08:50:00", title: "大阪万博 西ゲート前 到着", points: "夜行バスお疲れ様！夢洲交通ターミナル1番乗り場を確認（西ゲート徒歩2分）。シャトルバス事前予約状況チェック（KANSAI MaaSアプリ）。10:30まで要予約、当日券も若干数あり。詳細: https://www.expo2025.or.jp/access/" },
  { startTime: "2025-08-13T09:00:00", title: "シャトルバス→JR桜島駅へ（最適ルート開始）", points: "西ゲート夢洲交通ターミナル1番乗り場から桜島駅へ15分（350円）。9:00,9:15,9:30発（15分間隔）。KANSAI MaaSアプリで事前予約推奨。時刻表URL: https://www.expo2025.or.jp/access/ 代替：東ゲート経由（35-40分、420円大人・210円子供）" },
  { startTime: "2025-08-13T09:20:00", title: "JR桜島線→ユニバーサルシティ駅へ", points: "桜島駅から1駅4分（180円大人・90円子供）。2025年万博期間中は15分間隔で増便運行中。合計移動時間25-30分でUCW到着予定。" },
  { startTime: "2025-08-13T09:30:00", title: "UCW早朝探検スタート！（10時開店待ち作戦）", points: "ユニバーサル・スタジオ・ストア（3階、10:00開店）で待機。アメリカンスタイルの街並み写真撮影、各フロア散策。平日火-木は特に空いている！" },
  { startTime: "2025-08-13T10:00:00", title: "【UCW満喫タイム】ショッピング＆グルメ準備", points: "ユニバーサル・スタジオ・ストア開店！ミニオンズ、マリオ、ハリポタグッズ充実。キャラクターマスク購入でテンション↑。ジャンプショップ、Little OSAKA（ビリケンさんグッズ）も巡回。" },
  { startTime: "2025-08-13T11:00:00", title: "【メインイベント】TAKOPA開店突入！大阪たこ焼き6店舗制覇", points: "4階TAKOPA（11:00開店）で6つの名店攻略！道頓堀くくる4種盛り1,200円、会津屋（元祖・ミシュラン掲載）、甲賀流（子供人気）等。熱々注意、必ず冷ましてから！中央フードコートで子連れ安心。" },
  { startTime: "2025-08-13T11:45:00", title: "UCW完全攻略完了→万博会場帰還作戦", points: "滞在1時間半で大満足！ユニバーサルシティ駅→桜島駅→西ゲート。桜島駅発シャトルバス12:00,12:15,12:30発。乗り場：桜島駅南口バスターミナル2番。時刻表: https://www.expo2025.or.jp/access/ 基本予算：4,700円（往復1,200円、たこ焼き3,000円、軽食500円）" },
  
  // 万博会場内
  { startTime: "2025-08-13T12:00:00", title: "【最重要】入場＆当日予約電撃作戦！", points: "ゲートのQRコードをかざして入場！その瞬間から10分後、スマホでの当日予約戦争が始まります。歩きスマホに注意しつつ、ガンダムパビリオンの12:00枠を狙い撃ち！" },
  { startTime: "2025-08-13T12:30:00", title: "ミッション司令部：案内所へ", points: "西ゲート近くの案内所へ直行。「子どもが楽しめる、今一番空いているパビリオンは？」「クウェート館の整理券は配っていますか？」など、生きた情報を収集します。" },
  { startTime: "2025-08-13T13:00:00", title: "【世界旅行へ出発！】予約不要パビリオン巡り", points: "案内所の情報をもとに、待ち時間の少ないパビリオンから攻略！優先度S：🇳🇱オランダ、🇨🇭スイス、🇩🇪ドイツ 優先度A：🇦🇪UAE、🇦🇺オーストラリア、🇺🇸アメリカ 特にオランダ館の「オーブ」を持って進む体験はお子様に大人気。" },
  { startTime: "2025-08-13T14:00:00", title: "作戦的ランチタイム", points: "混雑のピークを過ぎたこの時間が狙い目。持参したおにぎりやパンを、ガンダム横の芝生広場などで食べるのが最も効率的。レストランの場合も待ち時間が格段に短くなっています。" },
  { startTime: "2025-08-13T15:00:00", title: "予約済みミュージカル鑑賞", points: "パビリオン巡りの合間に、予約したスタンド席で素晴らしいショーを鑑賞。座って楽しめるので、最高の休息時間になります。" },
  { startTime: "2025-08-13T16:00:00", title: "休憩＆フリータイム", points: "人混みに疲れたら「静けさの森」でクールダウン。お子様の体力を考え、意図的に休憩を取りましょう。会場内のベビーカーは4歳までが対象なので、こまめな休憩が不可欠です。" },
  
  // 夜の部
  { startTime: "2025-08-13T19:30:00", title: "夜空を彩るドローンショー（花火）鑑賞", points: "一日の締めくくりに、夜空に描かれる光のアートを鑑賞。昼間とは全く違う、幻想的な万博の姿を目に焼き付けましょう。最高の思い出になること間違いなし。" },
  { startTime: "2025-08-13T20:30:00", title: "梅田へ移動開始", points: "感動の余韻に浸りながら、西ゲートから梅田（大阪駅）行きのシャトルバスに乗車。料金はかかりますが（大人2,000円/小人1,000円）、乗り換えなしで座って帰れる快適さは貴重。" },
  { startTime: "2025-08-13T21:15:00", title: "梅田で最後の晩餐＆リフレッシュ", points: "ヨドバシ梅田タワー周辺で夕食。個室のある「酒房うおまん」などは、周りを気にせず親子でゆっくり食事をするのに最適。バス乗車前に銭湯やシャワー施設で汗を流せると快適。" },
  { startTime: "2025-08-13T22:15:00", title: "ヨドバシ梅田タワー前バスターミナルへ", points: "乗り遅れないように、余裕をもって移動しましょう。お土産の最終チェックも忘れずに。" },
  { startTime: "2025-08-13T22:30:00", title: "夜行バス乗車・千葉へ！", points: "たくさんの思い出を胸に、帰路につきます。" },
  
  // 8月14日（水）
  { startTime: "2025-08-14T08:50:00", title: "西船橋駅 到着", points: "無事到着です。" }
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