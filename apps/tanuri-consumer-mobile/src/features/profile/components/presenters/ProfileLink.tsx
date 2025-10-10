import { ChevronRight } from "lucide-react-native";
import { TouchableOpacity } from "react-native";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useThemeColor } from "@/hooks/useThemeColor";
import { textStyles } from "@/styles/text";

interface ProfileLinkProps {
  onPress: () => void;
  text: string;
  asLink?: boolean;
}

const ProfileLink: React.FC<ProfileLinkProps> = ({
  text,
  onPress,
  asLink = false,
}) => {
  const mutedColor = useThemeColor({}, "mutedForeground");
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{ height: 36 }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={[textStyles.normal, { color: mutedColor }]}
          variant={asLink ? "link" : "body"}
        >
          {text}
        </Text>
        {!asLink && (
          <Button
            style={{ height: 36 }}
            variant="ghost"
            onPress={onPress}
            icon={() => <ChevronRight color={mutedColor} size={20} />}
            size="icon"
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ProfileLink;
