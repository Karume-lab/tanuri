import { Lock, Mail } from "lucide-react-native";
import { ForgotPasswordBottomSheet } from "@/components";
import { Button } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { Input } from "@/components/ui/input";
import { Link } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";

const SignInScreen = () => {
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
          containerStyle={{
            padding: 20,
          }}
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
        <Input label="Email" placeholder="Enter your email" icon={Mail} />
        <Input label="Password" placeholder="Enter your password" icon={Lock} />
        <Link href={"/(screens)/(protected)/(tabs)/home"} asChild>
          <Button>Sign in</Button>
        </Link>
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

export default SignInScreen;
