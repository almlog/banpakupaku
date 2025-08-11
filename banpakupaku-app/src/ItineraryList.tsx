import React, { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { listItineraries } from './graphql/queries';
import './ItineraryList.css';

const client = generateClient();

interface Itinerary {
  id: string;
  startTime: string;
  title: string;
  description?: string;
  points?: string;
  createdAt: string;
  updatedAt: string;
}

interface ListItinerariesResponse {
  listItineraries: {
    items: Itinerary[];
    nextToken?: string;
  };
}

export const ItineraryList: React.FC = () => {
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchItineraries();
  }, []);

  const fetchItineraries = async () => {
    try {
      setLoading(true);
      console.log('Fetching itineraries...');
      
      const result = await client.graphql({
        query: listItineraries,
        variables: { limit: 100 }
      }) as { data: ListItinerariesResponse };
      
      console.log('Result:', result);
      console.log('Items:', result.data?.listItineraries?.items);
      
      const items = result.data?.listItineraries?.items || [];
      // startTimeで並び替え
      const sortedItems = items.sort((a, b) => 
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
      );
      
      setItineraries(sortedItems);
    } catch (err: any) {
      console.error('Error fetching itineraries:', err);
      console.error('Error details:', err.message, err.errors);
      setError(`旅行計画の取得に失敗しました: ${err.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekday = date.toLocaleDateString('ja-JP', { weekday: 'short' });
    return `${month}月${day}日(${weekday.replace('曜日', '')})`;
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const groupByDate = (items: Itinerary[]) => {
    const grouped: { [key: string]: Itinerary[] } = {};
    items.forEach(item => {
      const dateKey = new Date(item.startTime).toDateString();
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(item);
    });
    return grouped;
  };

  const formatTextWithLinks = (text: string) => {
    // URL検出の正規表現
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    
    return parts.map((part, index) => {
      if (urlRegex.test(part)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#667eea',
              textDecoration: 'underline',
              fontWeight: 'bold'
            }}
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  if (loading) {
    return <div className="loading">読み込み中...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  const groupedItineraries = groupByDate(itineraries);

  return (
    <div className="itinerary-container">
      <h1 className="main-title">🎌 大阪万博2025・男2人旅 🎌</h1>
      <p className="subtitle">2025年8月12日(月)夜 ～ 8月14日(水)朝</p>
      
      {Object.entries(groupedItineraries).map(([dateKey, items]) => (
        <div key={dateKey} className="day-section">
          <h2 className="day-title">
            {formatDate(items[0].startTime)}
          </h2>
          
          <div className="timeline">
            {items.map((item) => (
              <div key={item.id} className="timeline-item">
                <div className="timeline-time">
                  {formatTime(item.startTime)}
                </div>
                <div className="timeline-content">
                  <h3 className="timeline-title">{item.title}</h3>
                  {item.description && (
                    <p className="timeline-description">
                      {formatTextWithLinks(item.description)}
                    </p>
                  )}
                  {item.points && (
                    <div className="timeline-points">
                      💡 {formatTextWithLinks(item.points)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};