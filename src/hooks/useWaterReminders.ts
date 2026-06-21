import { useEffect, useState } from 'react';

export function useWaterReminders(profileId: string) {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [showFallbackBanner, setShowFallbackBanner] = useState(false);
  const [lastNotificationHour, setLastNotificationHour] = useState<number>(-1);

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    if ('Notification' in window) {
      const p = await Notification.requestPermission();
      setPermission(p);
      return p;
    }
    return 'denied';
  };

  useEffect(() => {
    // Check every minute
    const interval = setInterval(() => {
      const now = new Date();
      const hour = now.getHours();
      
      // Reminders every 2 hours between 7 and 21
      const reminderHours = [7, 9, 11, 13, 15, 17, 19, 21];
      
      if (reminderHours.includes(hour) && lastNotificationHour !== hour) {
        setLastNotificationHour(hour);
        triggerReminder();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [lastNotificationHour]);

  const triggerReminder = () => {
    const title = 'Hora de beber água! 💧';
    const body = 'Mantenha-se hidratado(a) para alcançar sua meta diária de 2,5 a 3 litros.';
    
    if (permission === 'granted') {
      try {
        new Notification(title, { body, icon: '/water-icon.png' });
      } catch (e) {
        // Fallback for mobile browsers that don't support new Notification() directly
        setShowFallbackBanner(true);
      }
    } else {
      setShowFallbackBanner(true);
    }
  };

  return {
    permission,
    requestPermission,
    showFallbackBanner,
    dismissFallbackBanner: () => setShowFallbackBanner(false)
  };
}
