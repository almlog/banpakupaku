import React, { useState } from 'react';
import './LocationTracker.css';

export const LocationTracker: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="location-tracker">
      <div 
        className="location-header clickable" 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2>📍 リアルタイム位置確認</h2>
        <p>旅行者の現在地をGoogle Mapでリアルタイム確認</p>
        <div className={`expand-icon ${isExpanded ? 'expanded' : ''}`}>
          ▼
        </div>
      </div>

      <div className={`location-content ${isExpanded ? 'expanded' : 'collapsed'}`}>
        <div className="location-simple">
        <div className="setup-instructions">
          <h3>📱 事前準備（旅行前に設定）</h3>
          <ol>
            <li>旅行者：Google Mapアプリを開く</li>
            <li>プロフィール写真をタップ → 「現在地の共有」</li>
            <li>家族のGoogleアカウントを選んで位置共有を開始</li>
            <li>共有期間を「旅行期間」に設定</li>
          </ol>
        </div>

        <div className="map-access">
          <h3>🗺️ 位置確認方法</h3>
          <p>家族の方は下のボタンからGoogle Mapにアクセスしてください</p>
          
          <div className="map-buttons">
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="view-map-btn"
            >
              🗺️ Google Mapで現在地を確認
            </a>
          </div>

          <div className="notice">
            <strong>💡 ヒント:</strong> 
            <br />• 共有されている場合、Google Mapのサイドバーに旅行者の名前と位置が表示されます
            <br />• スマホの場合はGoogle Mapアプリから確認するのがおすすめです
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};