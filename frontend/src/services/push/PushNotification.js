import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

class PushNotificationService {
  async registerForPushNotifications() {
    if (!Device.isDevice) {
      throw new Error('Push notifications are not supported on emulator');
    }

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      throw new Error('Failed to get push token for push notification!');
    }

    const token = await this.getPushToken();
    return token;
  }

  async getPushToken() {
    try {
      const token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.eas.projectId,
      });
      return token;
    } catch (error) {
      console.error('Error getting push token:', error);
      throw error;
    }
  }

  async scheduleLocalNotification(title, body, trigger) {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
        },
        trigger,
      });
    } catch (error) {
      console.error('Error scheduling notification:', error);
      throw error;
    }
  }

  async cancelAllNotifications() {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
    } catch (error) {
      console.error('Error canceling notifications:', error);
      throw error;
    }
  }

  addNotificationReceivedListener(callback) {
    return Notifications.addNotificationReceivedListener(callback);
  }

  addNotificationResponseReceivedListener(callback) {
    return Notifications.addNotificationResponseReceivedListener(callback);
  }

  removeNotificationSubscription(subscription) {
    subscription.remove();
  }
}

export default new PushNotificationService();
