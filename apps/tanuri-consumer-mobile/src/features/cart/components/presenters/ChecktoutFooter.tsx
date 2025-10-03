import { useRouter } from "expo-router";
import type React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { textStyles } from "@/styles/text";

interface ChecktoutFooterProps {
  buttonText: string;
}

const ChecktoutFooter: React.FC<ChecktoutFooterProps> = ({ buttonText }) => {
  const router = useRouter();
  return (
    <Card
      style={{
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        elevation: 0,
        paddingHorizontal: 40,
        paddingVertical: 28,
      }}
    >
      <CardContent style={{ gap: 8 }}>
        <FooterSection title={"Subtotal"} price={5000} />
        <FooterSection title={"Shipping fee"} price={100} />
        <Separator />
        <FooterSection title={"Total"} price={5100} />
      </CardContent>
      <CardFooter style={{ alignSelf: "center" }}>
        <Button
          size="sm"
          textStyle={{
            textTransform: "capitalize",
          }}
          onPress={() => router.push("/checkout")}
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ChecktoutFooter;

interface FooterSectionProps {
  title: string;
  price: number;
}

const FooterSection: React.FC<FooterSectionProps> = ({ title, price }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text style={[textStyles.normal]}>{title}</Text>
      <Text style={[textStyles.medium]}>{price}</Text>
    </View>
  );
};
