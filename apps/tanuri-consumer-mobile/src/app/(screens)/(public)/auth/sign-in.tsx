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
  type SignInValidation,
  signInValidation,
  useSession,
  useSignIn,
  useUser,
} from "@/features/auth";
import { tranformAPIErrorsToArrayOfStrings } from "@/utils";

const SignInScreen = () => {
  const form = useForm<SignInValidation>({
    resolver: zodResolver(signInValidation),
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });

  const toast = useToast();
  const signInMutation = useSignIn();
  const { setSession } = useSession();
  const userQuery = useUser();

  const passwordRef = useRef<TextInput>(null);

  const handleSignIn: SubmitHandler<SignInValidation> = (data) => {
    signInMutation.mutate(data, {
      onSuccess: (data) => {
        if (!userQuery.data) {
          return;
        }

        setSession({
          userId: userQuery.data.id,
          email: userQuery.data.email,
          ...data,
        });
        toast.success("Signed in successfully");
        form.reset();
      },
      onError: (error) => {
        tranformAPIErrorsToArrayOfStrings(error, "signing in").forEach(
          (msg) => {
            toast.error(msg);
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
              onSubmitEditing={form.handleSubmit(handleSignIn)}
            />
          )}
        />

        <Button
          onPress={form.handleSubmit(handleSignIn)}
          loading={signInMutation.isPending}
        >
          Sign in
        </Button>
      </View>

      <Link href="/auth/sign-up" asChild style={{ marginTop: "auto" }}>
        <Text style={{ textDecorationLine: "none" }}>
          Don't have an account?{" "}
          <Text style={{ fontWeight: "bold" }}>Sign up</Text>
        </Text>
      </Link>
    </View>
  );
};

export default SignInScreen;
