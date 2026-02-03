import React, { useState } from 'react';
import ProfileMenu from './ProfileMenu.jsx';

const PRIMARY_YELLOW = '#ffe600';

export default function Header({
  tabs,
  activeTab,
  onTabChange,
  onLoginClick,
  isAuthenticated,
  showProfile,
  onLogout,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleProfileToggle = () => setMenuOpen((open) => !open);
  const handleMenuSelect = (action) => {
    setMenuOpen(false);
    if (action === 'logout') onLogout();
  };

  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-mark" aria-hidden="true" />
        <span className="brand-name">Expense Tracker</span>
      </div>

      <nav className="nav-links" aria-label="Primary">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`nav-link ${activeTab === tab ? 'is-active' : ''}`}
            onClick={() => onTabChange(tab)}
            type="button"
          >
            {tab}
          </button>
        ))}
      </nav>

      <div className="nav-actions">
        {showProfile ? (
          <div className="profile-area">
            <button
              className="profile-btn"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              onClick={handleProfileToggle}
              type="button"
            >
              <span className="profile-initial">A</span>
            </button>
            {menuOpen && (
              <ProfileMenu
                onSelect={handleMenuSelect}
                onClose={() => setMenuOpen(false)}
              />
            )}
          </div>
        ) : (
          <button className="primary-btn" onClick={onLoginClick} type="button">
            Login / Register
          </button>
        )}
      </div>
    </header>
  );
}

export { PRIMARY_YELLOW };
