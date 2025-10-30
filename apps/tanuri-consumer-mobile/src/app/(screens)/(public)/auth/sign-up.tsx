import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react-native";
import { useRef } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import type { TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PasswordInput } from "@/components";
import { AvoidKeyboard } from "@/components/ui/avoid-keyboard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { Input } from "@/components/ui/input";
import { Link } from "@/components/ui/link";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";
import { useToast } from "@/components/ui/toast";
import { View } from "@/components/ui/view";
import {
  type SignUpValidation,
  signUpValidation,
  useSession,
  useSignIn,
  useSignUp,
} from "@/features/auth";
import { tranformAPIErrorsToArrayOfStrings } from "@/utils";

const SignUpScreen = () => {
  const form = useForm<SignUpValidation>({
    resolver: zodResolver(signUpValidation),
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });

  const toast = useToast();
  const signUpMutation = useSignUp();
  const signIpMutation = useSignIn();
  const { setSession } = useSession();

  const passwordRef = useRef<TextInput>(null);

  const handleSignUp: SubmitHandler<SignUpValidation> = (data) => {
    signUpMutation.mutate(data, {
      onSuccess: () => {
        signIpMutation.mutate(data, {
          onSuccess: (data) => {
            setSession(data);

            toast.success("Signed up successfully");
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
      },
      onError: (error) => {
        tranformAPIErrorsToArrayOfStrings(error, "signing up").forEach(
          (msg) => {
            toast.error(msg);
          },
        );
      },
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: 30,
        justifyContent: "space-between",
        paddingHorizontal: 8,
        alignItems: "center",
      }}
    >
      <View style={{ gap: 12 }}>
        <Card
          style={{
            width: 180,
            height: 180,
            paddingHorizontal: 20,
            paddingVertical: 20,
            borderRadius: 24,
          }}
        >
          <Image
            source={require("public/core/icon.png")}
            style={{ flex: 1, aspectRatio: 1, borderRadius: 24 }}
          />
        </Card>
        <Text
          style={{
            textAlign: "center",
            fontSize: 36,
          }}
        >
          Tanuri
        </Text>
      </View>

      <ScrollView
        style={{
          flex: 1,
        }}
        contentContainerStyle={{ paddingTop: 20, gap: 12 }}
        keyboardShouldPersistTaps="handled"
      >
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
          loading={signUpMutation.isPending || signIpMutation.isPending}
        >
          Sign up
        </Button>
      </ScrollView>
      <AvoidKeyboard />

      <Link href="/auth/sign-in" asChild>
        <Text style={{ textDecorationLine: "none", textAlign: "center" }}>
          Already have an account?{" "}
          <Text style={{ fontWeight: "bold" }}>Sign in</Text>
        </Text>
      </Link>
    </SafeAreaView>
  );
};

export default SignUpScreen;
