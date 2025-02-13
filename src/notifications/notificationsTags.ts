import { OneSignal } from "react-native-onesignal";

export function tagUserEmailCreate(email: string, name: string) {
    OneSignal.User.addTags({ 'user_email': email, 'user_name': name })
}