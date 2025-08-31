import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";

const HomeScreen = () => {
  const bottom = useBottomTabBarHeight();
  const { top: topSafeAreaInset } = useSafeAreaInsets();

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
    </ScrollView>
  );
};

export default HomeScreen;
