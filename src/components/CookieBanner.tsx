// components/CookieBanner.tsx
import { useEffect, useState } from 'react';

const CookieBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (!navigator.globalPrivacyControl) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    if (!navigator.globalPrivacyControl) {
      window.dataLayer.push({
        event: 'consent_update',
        analytics_storage: 'granted',
        ad_storage: 'granted',
      });
    }
    setShowBanner(false);
  };

  const rejectCookies = () => {
    setShowBanner(false); // Default is 'denied', no update needed
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 flex justify-between items-center">
      <p className="mr-4">
        We use cookies to enhance your experience. Do you accept?
      </p>
      <div>
        <button
          onClick={acceptCookies}
          className="bg-green-500 px-4 py-2 mr-2 rounded"
        >
          Accept
        </button>
        <button onClick={rejectCookies} className="bg-red-500 px-4 py-2 rounded">
          Reject
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;