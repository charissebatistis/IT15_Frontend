import React, { useState } from 'react';
import './ChangsaysLogo.css';

const ChangsaysLogo = ({ compact = false, subtitle = true, forceText = false }) => {
  const [imageFailed, setImageFailed] = useState(false);
  const hasPhotoLogo = !imageFailed;

  return (
    <div className={compact ? 'changsays-logo compact' : 'changsays-logo'}>
      <div className="logo-badge" aria-hidden="true">
        {hasPhotoLogo ? (
          <img
            className="logo-photo"
            src="/changsays-university-logo.png"
            alt="Changsays University logo"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <svg viewBox="0 0 120 100" role="img" focusable="false">
            <path d="M42 77a32 32 0 1 1 36 0" fill="none" stroke="#c97f7f" strokeWidth="11" strokeLinecap="round" />
            <path d="M42 77a22 22 0 1 0 36 0" fill="none" stroke="#0f2748" strokeWidth="9" strokeLinecap="round" />
            <path d="M30 52l2-18 16 2v24l-16-2z" fill="#c9a33b" />
            <path d="M50 36l16-2 2 18-18 8z" fill="#c98a8a" />
            <path d="M48 34c-4 0-8-2-12-2" fill="none" stroke="#f4efe2" strokeWidth="3" strokeLinecap="round" />
            <path d="M50 34c4 0 8-2 12-2" fill="none" stroke="#f4efe2" strokeWidth="3" strokeLinecap="round" />
            <path d="M49 29l8-8 8 8-5 2-3-3-3 3z" fill="#c9a33b" />
          </svg>
        )}
      </div>

      {(!hasPhotoLogo || forceText) && (
        <div className="logo-copy">
          <h1>Changsays University</h1>
          {subtitle && <p>KNOWLEDGE, BUT MAKE IT FUN</p>}
        </div>
      )}
    </div>
  );
};

export default ChangsaysLogo;
