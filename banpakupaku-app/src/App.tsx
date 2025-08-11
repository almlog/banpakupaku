import React, { useState } from 'react';
import './App.css';
import { ItineraryList } from './ItineraryList';
import { LocationTracker } from './LocationTracker';
import { SeedDatabaseFixed } from './SeedDatabaseFixed';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';

Amplify.configure(awsExports);

function App() {
  const [showSeed, setShowSeed] = useState(false);

  return (
    <div className="App">
      {showSeed && <SeedDatabaseFixed />}
      <LocationTracker />
      <ItineraryList />
      
      {/* 開発用: データ登録ボタン */}
      <button
        onClick={() => setShowSeed(!showSeed)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          padding: '10px',
          background: '#667eea',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          cursor: 'pointer',
          fontSize: '24px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
        }}
        title="データ登録ツールを表示/非表示"
      >
        🔧
      </button>
    </div>
  );
}

export default App;