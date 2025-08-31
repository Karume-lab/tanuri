import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider } from "@/theme/theme-provider";
import "react-native-reanimated";

const RootLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <Stack>
          <Stack.Screen
            name="(screens)/(public)/index"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(screens)/(public)/auth/sign-up"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(screens)/(public)/auth/sign-in"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(screens)/(public)/auth/reset-password"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(screens)/(protected)/(tabs)"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
