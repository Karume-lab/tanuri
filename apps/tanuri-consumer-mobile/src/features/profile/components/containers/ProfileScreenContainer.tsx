import { useRouter } from "expo-router";
import { UserRoundCheck } from "lucide-react-native";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icon } from "@/components/ui/icon";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useSession } from "@/features/auth";
import { textStyles } from "@/styles/text";
import ProfileLink from "../presenters/ProfileLink";

const ProfileScreenContainer = () => {
  const router = useRouter();
  const { clearSession } = useSession();

  const accountLinksConfig = [
    {
      text: "Edit Profile",
      // onPress: () => router.push("/(screens)/(protected)/edit-profile"),
      onPress: () => {},
    },
    {
      text: "Change Password",
      // onPress: () => router.push("/(screens)/(protected)/change-password"),
      onPress: () => {},
    },
    {
      text: "Shipping Address",
      onPress: () => router.push("/(screens)/(protected)/shipping-address"),
    },
  ];

  return (
    <View style={{ gap: 20 }}>
      <Avatar
        size={140}
        style={{
          alignSelf: "center",
        }}
      >
        <AvatarImage
          source={{
            uri: "https://avatars.githubusercontent.com/u/99088394?v=4",
          }}
        />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
      <View>
        <View style={{ flexDirection: "row", gap: 12 }}>
          <Icon name={UserRoundCheck} />
          <Text style={[textStyles.medium]}>Account</Text>
        </View>
        <Separator style={{ marginTop: 16 }} />
        {accountLinksConfig.map((item, index) => (
          <ProfileLink key={`${index}-${item.text}`} {...item} />
        ))}
      </View>
      <View>
        <View style={{ flexDirection: "row", gap: 12 }}>
          <Icon name={UserRoundCheck} />
          <Text style={[textStyles.medium]}>More</Text>
        </View>
        <Separator style={{ marginTop: 16 }} />
        <ProfileLink text="About loyalty points" onPress={() => {}} />
        <ProfileLink text="Sign out" onPress={clearSession} asLink />
      </View>
    </View>
  );
};

export default ProfileScreenContainer;
