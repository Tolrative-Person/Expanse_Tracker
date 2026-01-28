import React, { useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import DailyExpenses from './components/DailyExpenses.jsx';

const TABS = {
  HOME: 'Home',
  DAILY: 'Daily Expenses',
};

export default function App() {
  const [activeTab, setActiveTab] = useState(TABS.HOME);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const showProfile = useMemo(() => activeTab !== TABS.HOME, [activeTab]);

  return (
    <div className="app-shell">
      <Header
        activeTab={activeTab}
        tabs={Object.values(TABS)}
        onTabChange={handleTabChange}
        showProfile={showProfile}
      />

      <main>
        {activeTab === TABS.DAILY && (
          <DailyExpenses />
        )}
      </main>
    </div>
  );
}
