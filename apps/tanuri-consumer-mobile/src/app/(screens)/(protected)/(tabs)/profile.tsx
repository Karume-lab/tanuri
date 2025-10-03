import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { useSession } from "@/features/auth";

const ProfileScreen = () => {
  const { clearSession } = useSession();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Button onPress={clearSession} size="sm">
        Sign out
      </Button>
    </SafeAreaView>
  );
};

export default ProfileScreen;
