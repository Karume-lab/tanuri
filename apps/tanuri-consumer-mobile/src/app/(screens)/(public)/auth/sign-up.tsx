import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react-native";
import { useRef } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import type { TextInput } from "react-native";
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
  useSession,
  useSignIn,
  useSignUp,
  useUser,
} from "@/features/auth";
import { tranformAPIErrorsToArrayOfStrings } from "@/utils";

const SignUpScreen = () => {
  const form = useForm<SignUpValidation>({
    resolver: zodResolver(signUpValidation),
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });

  const { error: toastError, success: toastSuccess } = useToast();
  const { mutate: signUpMutate, isPending: signUpPending } = useSignUp();
  const { mutate: signInMutate, isPending: signInPending } = useSignIn();
  const { data: userData } = useUser();
  const { setSession } = useSession();

  const passwordRef = useRef<TextInput>(null);

  const handleSignUp: SubmitHandler<SignUpValidation> = (data) => {
    signUpMutate(data, {
      onSuccess: () => {
        signInMutate(data, {
          onSuccess: (data) => {
            setSession({
              userId: userData?.id ?? 0,
              email: userData?.email ?? "",
              ...data,
            });
            toastSuccess("Signed up successfully");
            form.reset();
          },
          onError: (error) => {
            tranformAPIErrorsToArrayOfStrings(error, "signing in").forEach(
              (msg) => {
                toastError(msg);
              },
            );
          },
        });
      },
      onError: (error) => {
        tranformAPIErrorsToArrayOfStrings(error, "signing up").forEach(
          (msg) => {
            toastError(msg);
          },
        );
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
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current?.focus()}
              blurOnSubmit={false}
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
              ref={passwordRef}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              error={error?.message}
              returnKeyType="done"
              onSubmitEditing={form.handleSubmit(handleSignUp)}
            />
          )}
        />

        <Button
          onPress={form.handleSubmit(handleSignUp)}
          loading={signUpPending || signInPending}
        >
          Sign up
        </Button>
      </View>

      <Link href="/auth/sign-in" asChild style={{ marginTop: "auto" }}>
        <Text style={{ textDecorationLine: "none" }}>
          Already have an account?{" "}
          <Text style={{ fontWeight: "bold" }}>Sign in</Text>
        </Text>
      </Link>
    </View>
  );
};

export default SignUpScreen;
