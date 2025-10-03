import { SafeAreaView } from "react-native-safe-area-context";
import HomeLayout from "@/features/home/components/layouts/HomeLayout";

const HomeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HomeLayout />
    </SafeAreaView>
  );
};

export default HomeScreen;
