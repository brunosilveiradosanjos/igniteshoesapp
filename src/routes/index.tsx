import { useEffect, useState } from 'react';
import { useTheme } from 'native-base';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { NotificationWillDisplayEvent, OneSignal, OSNotification } from 'react-native-onesignal';
import { Notification } from '../components/Notification';

import { AppRoutes } from './app.routes';

export function Routes() {
  const [notification, setNotification] = useState<OSNotification>()
  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  useEffect(() => {
    const handleNotification = (event: NotificationWillDisplayEvent): void => {
      event.preventDefault()
      const response = event.getNotification()
      setNotification(response)
    }

    OneSignal.Notifications.addEventListener('foregroundWillDisplay', handleNotification)
    return () => OneSignal.Notifications.removeEventListener('foregroundWillDisplay', handleNotification)
  }, [])

  return (
    <NavigationContainer theme={theme}>
      <AppRoutes />
      {notification?.title && (
        <Notification data={notification} onClose={() => {
          setNotification(undefined)
        }} />
      )}
    </NavigationContainer>
  );
}