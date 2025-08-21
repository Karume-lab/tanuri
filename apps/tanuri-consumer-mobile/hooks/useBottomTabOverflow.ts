// components/ui/blur-background.tsx
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";

export function useBottomTabOverflow() {
  const tab = useBottomTabBarHeight();
  return Platform.OS === "ios" ? tab : 0;
}
