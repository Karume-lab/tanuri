import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import type React from "react";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { textStyles } from "@/styles/text";

// add product detail header wrapper to fetch product name as screen title
interface ScreenHeaderProps {
  screenTitle: string;
  rightSection?: React.ReactNode;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  screenTitle,
  rightSection,
}) => {
  const router = useRouter();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Button
        size="icon"
        style={{
          flex: 0.7,
          height: 32,
          width: 32,
        }}
        variant="secondary"
        icon={ChevronLeft}
        onPress={() => router.back()}
      />
      <Text style={[textStyles.medium, { flex: 1 }]}>{screenTitle}</Text>
      {rightSection && rightSection}
    </View>
  );
};

export default ScreenHeader;
