'use client';

import { useEffect } from 'react';
import OneSignal from 'react-onesignal';

export default function OneSignalInitializer() {
  useEffect(() => {
      OneSignal.init({
      appId: '9548c763-8f72-451c-9882-a1aa742a3d67', 
      notifyButton: { enable: true },
      promptOptions: {
        slidedown: {
          enabled: true, 
        },
      },
    });
  }, []);

  return null;
}
