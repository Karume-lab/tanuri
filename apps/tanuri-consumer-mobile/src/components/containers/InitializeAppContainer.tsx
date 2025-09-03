import * as SplashScreen from "expo-splash-screen";
import type React from "react";
import { useCallback, useEffect } from "react";
import { View } from "@/components/ui/view";
import { useSession } from "@/features/auth";

SplashScreen.preventAutoHideAsync();

const InitializeAppContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isLoading, setIsOnBoarded } = useSession();

  const onLayoutRootView = useCallback(async () => {
    if (!isLoading) {
      await SplashScreen.hideAsync();
    }
  }, [isLoading]);

  useEffect(() => {
    setIsOnBoarded();
  }, [setIsOnBoarded]);

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      {children}
    </View>
  );
};

export default InitializeAppContainer;
