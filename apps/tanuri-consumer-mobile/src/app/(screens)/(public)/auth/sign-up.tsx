import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react-native";
import { Controller, useForm } from "react-hook-form";
import { PasswordInput } from "@/components";
import { Button } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { Input } from "@/components/ui/input";
import { Link } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import {
  ForgotPasswordBottomSheet,
  type SignUpValidation,
  signUpValidation,
  useSignUp,
} from "@/features/auth";

const SignUpScreen = () => {
  const { control, handleSubmit } = useForm<SignUpValidation>({
    resolver: zodResolver(signUpValidation),
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });

  const { mutate, error, isPending } = useSignUp();

  const onSubmit = async (data: SignUpValidation) => {
    mutate(data);
  };

  return (
    <View
      style={{
        display: "flex",
        gap: 200,
        paddingHorizontal: 8,
        paddingVertical: 64,
        alignItems: "center",
        height: "100%",
      }}
    >
      <View style={{ width: 200, height: 200 }}>
        <Image
          source={require("public/core/icon.png")}
          width={200}
          containerStyle={{ padding: 20 }}
        />
        <Text
          style={{
            textAlign: "center",
            fontSize: 36,
            width: "100%",
            marginVertical: 12,
          }}
        >
          Tanuri
        </Text>
      </View>

      {error && <Text style={{ color: "red" }}>{error.message}</Text>}

      <View style={{ display: "flex", gap: 12 }}>
        <Controller
          control={control}
          name="email"
          render={({
            field: { onChange, onBlur, value },
            formState: { errors },
          }) => (
            <Input
              label="Email"
              placeholder="Enter your email"
              icon={Mail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <PasswordInput
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              error={error?.message}
            />
          )}
        />

        <Button onPress={handleSubmit(onSubmit)} loading={isPending}>
          Sign up
        </Button>
        <ForgotPasswordBottomSheet />
      </View>

      <Link href="/auth/sign-up" asChild style={{ marginTop: "auto" }}>
        <Text style={{ textDecorationLine: "none" }}>
          Don&apos;t have an account?{" "}
          <Text style={{ fontWeight: "bold" }}>Sign up</Text>
        </Text>
      </Link>
    </View>
  );
};

export default SignUpScreen;
