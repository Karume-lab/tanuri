import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider } from "@/styles/theme/theme-provider";
import "react-native-reanimated";
import { InitializeAppContainer, ProvidersContainer } from "@/components";
import { useSession } from "@/features/auth";

const RootLayout = () => {
  const { isAuthenticated, isOnboarded } = useSession();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
