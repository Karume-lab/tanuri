import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Mail } from "lucide-react-native";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { PasswordInput } from "@/components";
import { Button } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { Input } from "@/components/ui/input";
import { Link } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import { useToast } from "@/components/ui/toast";
import { View } from "@/components/ui/view";
import {
  type SignUpValidation,
  signUpValidation,
  useSignUp,
} from "@/features/auth";

const SignUpScreen = () => {
  const form = useForm<SignUpValidation>({
    resolver: zodResolver(signUpValidation),
    defaultValues: { email: "some@mail.com", password: "hello@Tanuri123" },
    mode: "onChange",
  });

  const { error: toastError, success: toastSuccess } = useToast();

  const { mutate, isPending } = useSignUp();

  const onSubmit: SubmitHandler<SignUpValidation> = (
    data: SignUpValidation,
  ) => {
    mutate(data, {
      onSuccess: () => {
        toastSuccess("Signed up successfully!");
        form.reset();
        router.replace("/home");
      },
      onError: (error) => {
        const messages = [
          ...(error.email || []),
          ...(error.password || []),
          ...(error.phone_number || []),
          ...(error.non_field_errors || []),
        ];

        if (messages.length > 0) {
          messages.forEach((msg) => {
            toastError(msg);
          });
        } else {
          toastError("An error occurred while signing up. Please try again.");
        }
      },
    });
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

      <View style={{ display: "flex", gap: 12 }}>
        <Controller
          control={form.control}
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
          control={form.control}
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

        <Button onPress={form.handleSubmit(onSubmit)} loading={isPending}>
          Sign up
        </Button>
      </View>

      <Link href="/auth/sign-up" asChild style={{ marginTop: "auto" }}>
        <Text style={{ textDecorationLine: "none" }}>
          Already have an account?{" "}
          <Text style={{ fontWeight: "bold" }}>Sign in</Text>
        </Text>
      </Link>
    </View>
  );
};

export default SignUpScreen;
