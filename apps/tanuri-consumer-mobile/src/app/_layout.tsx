import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { setBackgroundColorAsync } from "expo-system-ui";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  InitializeAppContainer,
  ProvidersContainer,
  SlowRequestsAlert,
} from "@/components";
import { useSession } from "@/features/auth";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemeProvider } from "@/styles/theme/theme-provider";
import "react-native-reanimated";

const RootLayout = () => {
  const { isAuthenticated, isOnboarded } = useSession();
  const backgroundColor = useThemeColor({}, "background");
  useEffect(() => {
    const setBackgroundScheme = async () => {
      await setBackgroundColorAsync(backgroundColor);
    };
    setBackgroundScheme();
  }, [backgroundColor]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SlowRequestsAlert />
      <InitializeAppContainer>
        <ThemeProvider>
          <ProvidersContainer>
            <Stack>
              <Stack.Protected guard={!isOnboarded}>
                <Stack.Screen
                  name="(screens)/(public)/index"
                  options={{ headerShown: false }}
                />
              </Stack.Protected>
              <Stack.Protected guard={!isAuthenticated}>
                <Stack.Screen
                  name="(screens)/(public)/auth/sign-in"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="(screens)/(public)/auth/sign-up"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="(screens)/(public)/auth/forgot-password"
                  options={{ headerShown: false }}
                />
              </Stack.Protected>
              <Stack.Protected guard={isAuthenticated}>
                <Stack.Screen
                  name="(screens)/(protected)/(tabs)"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="(screens)/(protected)/cart"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="(screens)/(protected)/checkout"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="(screens)/(protected)/products/[id]"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="(screens)/(protected)/orders/[id]"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="(screens)/(protected)/edit-profile"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="(screens)/(protected)/change-password"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="(screens)/(protected)/shipping-address"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="(screens)/(protected)/about-loyalty-points"
                  options={{ headerTitle: "Loyalty Points" }}
                />
                <Stack.Screen
                  name="(screens)/(protected)/about-tanuri"
                  options={{ headerTitle: "About Tanuri" }}
                />
              </Stack.Protected>
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
          </ProvidersContainer>
        </ThemeProvider>
      </InitializeAppContainer>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
