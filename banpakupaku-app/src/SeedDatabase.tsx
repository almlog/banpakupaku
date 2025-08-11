import React, { useState } from 'react';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import * as mutations from './graphql/mutations';
import awsExports from './aws-exports';

Amplify.configure(awsExports);

const client = generateClient();

const itineraryData = [
  { startTime: "21:30", title: "西船橋駅南口 高速バス乗り場 集合", points: "トイレを済ませ、飲み物などを準備。バスは定刻に出発します。早めの行動を心がけましょう。" },
  { startTime: "22:10", title: "夜行バス乗車・大阪へ出発！", points: "大阪での大冒険を夢見て、おやすみなさい。リラックスできる服装がおすすめです。" },
  { startTime: "8:50", title: "大阪万博 西ゲート前 到着", points: "バスを降りたら、まずトイレの場所を確認。夢に見た万博会場はもう目の前！" },
  { startTime: "9:00", title: "シャトルバスでJR桜島駅へ", points: "西ゲート前のバスロータリーから乗車。約15分のバス旅です。" },
  { startTime: "9:15", title: "JRゆめ咲線でユニバーサルシティ駅へ", points: "桜島駅から一駅だけ電車に乗ります。すぐに到着！" },
  { startTime: "9:25", title: "ポップコーンパパで特別な朝食を！", points: "32種類の味からお気に入りを選びましょう！ここから気分は最高潮！" },
  { startTime: "10:00", title: "UCWを散策＆早めのランチ", points: "カラフルなショップを眺めたり、大阪名物たこ焼きの食べ比べをしたり。11時開店の「TAKOPA」が狙い目です。" },
  { startTime: "11:45", title: "万博会場へ帰還！", points: "再びJRとシャトルバスを乗り継ぎ、決戦の地・西ゲートへ。いよいよ入場です！" },
  { startTime: "12:00", title: "【最重要】入場＆当日予約電撃作戦！", points: "入場ゲートを通過しながら、スマホで**ガンダムパビリオン(12時枠)**の当日登録に挑戦！取れれば最高、取れなくても全く問題なし！" },
  { startTime: "12:30", title: "案内所で情報収集＆作戦会議", points: "まずは案内所へ。「子どもが楽しめる、今一番空いているパビリオンは？」と聞きましょう！リアルタイム情報をゲット！" },
  { startTime: "13:00", title: "【世界旅行へ出発！】予約不要パビリオン巡り", points: "優先度S：🇳🇱オランダ、🇨🇭スイス、🇩🇪ドイツ\n優先度A：🇦🇪UAE、🇦🇺オーストラリア、🇺🇸アメリカ\n案内所の情報をもとに、待ち時間の少ないパビリオンから攻略！" },
  { startTime: "(時間未定)", title: "予約済みミュージカル鑑賞", points: "パビリオン巡りの合間に、予約したスタンド席で素晴らしいショーを鑑賞。良い休憩にもなります。" },
  { startTime: "16:00", title: "休憩＆フリータイム", points: "人混みに疲れたら「静けさの森」でクールダウン。おやつを食べたり、屋外のパフォーマンスを楽しんだりしましょう。" },
  { startTime: "19:30頃", title: "夜空を彩るドローンショー（花火）鑑賞", points: "一日の締めくくりに、未来の花火を目に焼き付けましょう。最高の思い出になること間違いなしです。" },
  { startTime: "20:30頃", title: "梅田へ移動開始", points: "感動の余韻に浸りながら、西ゲートから梅田（大阪駅）行きのシャトルバスに乗車します。" },
  { startTime: "21:15頃", title: "梅田で最後の晩餐", points: "ヨドバシ梅田タワー周辺で夕食。バス乗車前に銭湯などで汗を流せると、帰りのバスが格段に快適になります。" },
  { startTime: "22:15", title: "ヨドバシ梅田タワー前バスターミナルへ", points: "乗り遅れないように、余裕をもって移動しましょう。" },
  { startTime: "22:30", title: "夜行バス乗車・千葉へ！", points: "たくさんの思い出を胸に、帰路につきます。お疲れ様でした！" },
  { startTime: "8:50", title: "西船橋駅 到着", points: "無事到着です。家に帰るまでが冒険です。気をつけてお帰りください！" }
];

export const SeedDatabase = () => {
  const [status, setStatus] = useState('待機中');

  const seedDatabase = async () => {
    setStatus('登録処理を開始します...');
    let count = 0;
    try {
      for (const item of itineraryData) {
        const input = {
          startTime: item.startTime,
          title: item.title,
          points: item.points,
          description: item.title,
        };
        await client.graphql({ query: mutations.createItinerary, variables: { input: input } });
        count++;
        setStatus(`${count} / ${itineraryData.length} 件 登録完了...`);
      }
      setStatus('すべてのデータの登録が完了しました！');
    } catch (error) {
      console.error('データベースへの登録中にエラーが発生しました', error);
      setStatus('エラーが発生しました。コンソールを確認してください。');
    }
  };

  return (
    <div>
      <h2>計画書データ登録</h2>
      <p>下のボタンを押すと、計画書のデータをデータベースに一括登録します。</p>
      <button onClick={seedDatabase} disabled={status.includes('登録中') || status.includes('完了')}>
        DBに計画を登録する
      </button>
      <p>ステータス: {status}</p>
    </div>
  );
};
