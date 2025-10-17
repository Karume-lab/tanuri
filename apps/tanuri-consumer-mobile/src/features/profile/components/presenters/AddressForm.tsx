import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Switch, View } from "react-native";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { useCreateAddress } from "../../hooks/api/mutations";
import { type Address, addressValidation } from "../../validations";

const AddressForm = () => {
  const {
    control,
    handleSubmit,
    reset: resetForm,
  } = useForm<Address>({
    resolver: zodResolver(addressValidation),
    defaultValues: {
      label: "",
      city: "",
      isDefault: false,
    },
  });
  const { mutateAsync: createAddress, isPending } = useCreateAddress();

  // const isDefault = watch("isDefault");

  const onSubmit = (data: Address) => {
    createAddress(data).then(resetForm);
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 20,
        gap: 16,
        paddingHorizontal: 20,
      }}
    >
      <View>
        <Text
          style={{
            fontWeight: "500",
            fontSize: 15,
            marginBottom: 6,
          }}
        >
          Address Label
        </Text>
        <Controller
          control={control}
          name="label"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input
              placeholder="e.g. Home, Work, Mom’s place"
              autoCapitalize="words"
              variant="outline"
              autoCorrect={false}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={error?.message}
              returnKeyType="next"
            />
          )}
        />
      </View>

      <View>
        <Text
          style={{
            fontWeight: "500",
            marginBottom: 6,
            fontSize: 15,
          }}
        >
          City
        </Text>
        <Controller
          control={control}
          name="city"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input
              placeholder="Enter your city"
              variant="outline"
              autoCapitalize="words"
              autoCorrect={false}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={error?.message}
              returnKeyType="done"
            />
          )}
        />
      </View>

      <Controller
        control={control}
        name="isDefault"
        render={({ field: { onChange, value } }) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 8,
              paddingVertical: 8,
            }}
          >
            <Text style={{ fontWeight: "500", fontSize: 15 }}>
              Set as default address
            </Text>
            <Switch value={value} onValueChange={onChange} />
          </View>
        )}
      />

      <Button onPress={handleSubmit(onSubmit)} loading={isPending}>
        Create Address
      </Button>
    </View>
  );
};

export default AddressForm;
