import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";
import { useSession, useUser } from "@/features/auth";

const HomeScreen = () => {
  const bottom = useBottomTabBarHeight();
  const { top: topSafeAreaInset } = useSafeAreaInsets();

  const { clearSession } = useSession();
  const { data } = useUser();

  console.log(data?.id);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        paddingBottom: bottom,
        paddingTop: topSafeAreaInset,
      }}
      showsVerticalScrollIndicator={false}
    >
      <Text>HOME</Text>
      <Button onPress={clearSession}>Sign out</Button>
    </ScrollView>
  );
};

export default HomeScreen;
