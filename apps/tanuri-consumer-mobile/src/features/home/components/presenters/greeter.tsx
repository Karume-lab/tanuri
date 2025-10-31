import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useSession } from "@/features/auth";
import { textStyles } from "@/styles/text";

const Greeter = () => {
  const { session } = useSession();

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
      <Avatar
        size={50}
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
        <Text style={[textStyles.medium]}>
          {getGreeting()}! {session?.email ?? ""}
        </Text>
        <Text style={[textStyles.small]} variant="caption">
          69 loyalty points
        </Text>
      </View>
    </View>
  );
};

export default Greeter;
