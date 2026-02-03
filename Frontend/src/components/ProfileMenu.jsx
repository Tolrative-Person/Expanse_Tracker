import React from 'react';

export default function ProfileMenu({ onSelect, onClose }) {
  return (
    <div className="profile-menu" role="menu">
      <button type="button" role="menuitem" onClick={() => onSelect('profile')}>
        My Profile
      </button>
      <button type="button" role="menuitem" onClick={() => onSelect('logout')}>
        Logout
      </button>
    </div>
  );
}
