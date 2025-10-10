import ScreenWrapper from "@/components/presenters/PageWrapper";
import { Button } from "@/components/ui/button";
import { useSession } from "@/features/auth";

const ProfileScreen = () => {
  const { clearSession } = useSession();
  return (
    <ScreenWrapper>
      <Button onPress={clearSession} size="sm">
        Sign out
      </Button>
    </ScreenWrapper>
  );
};

export default ProfileScreen;
