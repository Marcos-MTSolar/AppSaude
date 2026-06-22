import { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';

export function useWaterReminders(profileId: string) {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [showFallbackBanner, setShowFallbackBanner] = useState(false);
  const [lastNotificationHour, setLastNotificationHour] = useState<number>(-1);

  // Toggle state
  const [isRemindersEnabled, setIsRemindersEnabled] = useState(() => {
    const saved = localStorage.getItem(`${profileId}_water_reminders_enabled`);
    return saved !== null ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    const checkPerm = async () => {
      if (Capacitor.isNativePlatform()) {
        const p = await LocalNotifications.checkPermissions();
        setPermission(p.display === 'granted' ? 'granted' : 'default');
      } else if ('Notification' in window) {
        setPermission(Notification.permission);
      }
    };
    checkPerm();
  }, []);

  const requestPermission = async () => {
    if (Capacitor.isNativePlatform()) {
      const p = await LocalNotifications.requestPermissions();
      const status = p.display === 'granted' ? 'granted' : 'denied';
      setPermission(status as NotificationPermission);
      if (status === 'denied') setShowFallbackBanner(true);
      return status as NotificationPermission;
    } else if ('Notification' in window) {
      const p = await Notification.requestPermission();
      setPermission(p);
      if (p === 'denied') setShowFallbackBanner(true);
      return p;
    }
    return 'denied';
  };

  const scheduleNativeNotifications = async () => {
    if (!Capacitor.isNativePlatform()) return;
    
    // Clear existing
    const pending = await LocalNotifications.getPending();
    if (pending.notifications.length > 0) {
      await LocalNotifications.cancel({ notifications: pending.notifications });
    }
    
    const reminderHours = [7, 9, 11, 13, 15, 17, 19, 21];
    
    const notifications = reminderHours.map((hour, idx) => ({
      id: 100 + idx, // unique ID per hour
      title: 'Hora de beber água! 💧',
      body: 'Mantenha-se hidratado(a) para alcançar sua meta diária de 2,5 a 3 litros.',
      schedule: {
        on: {
          hour: hour,
          minute: 0
        },
        repeats: true,
        allowWhileIdle: true
      }
    }));
    
    await LocalNotifications.schedule({ notifications });
  };

  const cancelNativeNotifications = async () => {
    if (!Capacitor.isNativePlatform()) return;
    
    const pending = await LocalNotifications.getPending();
    if (pending.notifications.length > 0) {
      await LocalNotifications.cancel({ notifications: pending.notifications });
    }
  };

  const toggleReminders = async () => {
    const newVal = !isRemindersEnabled;
    
    if (newVal) {
      // Activating
      const perm = await requestPermission();
      if (perm === 'granted' && Capacitor.isNativePlatform()) {
        await scheduleNativeNotifications();
      }
    } else {
      // Deactivating
      if (Capacitor.isNativePlatform()) {
        await cancelNativeNotifications();
      }
    }
    
    setIsRemindersEnabled(newVal);
    localStorage.setItem(`${profileId}_water_reminders_enabled`, JSON.stringify(newVal));
  };

  useEffect(() => {
    // Check every minute for web fallback
    const interval = setInterval(() => {
      if (!isRemindersEnabled || Capacitor.isNativePlatform()) return; // Native handles it via scheduling
      
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
  }, [lastNotificationHour, isRemindersEnabled]);

  const triggerReminder = () => {
    const title = 'Hora de beber água! 💧';
    const body = 'Mantenha-se hidratado(a) para alcançar sua meta diária de 2,5 a 3 litros.';
    
    if (permission === 'granted' && !Capacitor.isNativePlatform()) {
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
    dismissFallbackBanner: () => setShowFallbackBanner(false),
    isRemindersEnabled,
    toggleReminders
  };
}
