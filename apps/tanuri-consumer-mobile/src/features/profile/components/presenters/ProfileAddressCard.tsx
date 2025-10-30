import { Badge } from "@/components/ui/badge";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useThemeColor } from "@/hooks/useThemeColor";
import { textStyles } from "@/styles/text";

interface ProfileAddressCardProps {
  label: string;
  city: string;
  isDefault: boolean;
}

const ProfileAddressCard: React.FC<ProfileAddressCardProps> = ({
  label,
  city,
  isDefault,
}) => {
  const blue = useThemeColor({}, "blue");

  const borderColor = useThemeColor({}, "border");
  const mutedForeground = useThemeColor({}, "mutedForeground");
  return (
    <View
      style={{
        borderColor,
        marginHorizontal: 4,
        borderWidth: 1,
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        gap: 2,
      }}
    >
      {isDefault && (
        <Badge
          textStyle={{ fontSize: 12, color: "white" }}
          style={{
            paddingHorizontal: 8,
            backgroundColor: blue,
            paddingVertical: 4,
            position: "absolute",
            top: 6,
            right: 8,
          }}
        >
          Default
        </Badge>
      )}
      <Text style={[textStyles.medium, { marginBottom: 10 }]}>{label}</Text>
      <Text style={[textStyles.small, { color: mutedForeground }]}>{city}</Text>
    </View>
  );
};

export default ProfileAddressCard;
