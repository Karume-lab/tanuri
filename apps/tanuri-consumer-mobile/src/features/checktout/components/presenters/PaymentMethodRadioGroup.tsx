import { Phone } from "lucide-react-native";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { textStyles } from "@/styles/text";

interface PaymentMethodRadioGroupProps {
  value: "cash" | "mpesa";
  setValue: React.Dispatch<React.SetStateAction<"cash" | "mpesa">>;
}

const PaymentMethodRadioGroup: React.FC<PaymentMethodRadioGroupProps> = ({
  value,
  setValue,
}) => {
  return (
    <RadioGroup
      labelStyle={{
        fontSize: 15,
        fontWeight: "500",
      }}
      options={[
        {
          label: "Cash on Delivery",
          value: "cash",
          children: (
            <Text style={[textStyles.small]}>
              Pay when the order arrives at your dorstep
            </Text>
          ),
        },
        {
          label: "Pay Now via Mpesa",
          value: "mpesa",
          children: (
            <View>
              <Text style={[textStyles.small]}>
                Receive a payment prompt on your phone number
              </Text>
              {value === "mpesa" && (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 12,
                    gap: 20,
                  }}
                >
                  <Input
                    variant="outline"
                    keyboardType="phone-pad"
                    containerStyle={{ width: 200 }}
                    inputContainerStyle={{ borderRadius: 16 }}
                    icon={Phone}
                  />
                  <Button size="xs" style={{ borderRadius: 8 }}>
                    save
                  </Button>
                </View>
              )}
            </View>
          ),
        },
      ]}
      value={value}
      onValueChange={setValue}
    />
  );
};

export default PaymentMethodRadioGroup;
