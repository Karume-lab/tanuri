import { router } from "expo-router";
import {
  CreditCard,
  Flame,
  Package,
  ShoppingCart,
  Smile,
  Truck,
} from "lucide-react-native";
import { Onboarding, useOnboarding } from "@/components/ui/onboarding";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";

export const onboardingPresets = [
  {
    id: "welcome",
    title: "Welcome to Tanuri",
    description: "Order LPG gas and accessories quickly and securely.",
    icon: <Flame size={80} color="#F57C00" />,
  },
  {
    id: "easy-ordering",
    title: "Easy Ordering",
    description: "Choose your cylinder size or accessories in just a few taps.",
    icon: <ShoppingCart size={80} color="#2196F3" />,
  },
  {
    id: "safe-packaging",
    title: "Safe Packaging",
    description: "All products are sealed, tested, and delivered with care.",
    icon: <Package size={80} color="#4CAF50" />,
  },
  {
    id: "fast-delivery",
    title: "Fast Delivery",
    description: "Get your gas delivered straight to your doorstep on time.",
    icon: <Truck size={80} color="#9C27B0" />,
  },
  {
    id: "secure-payment",
    title: "Secure Payment",
    description: "Pay safely using cards, wallets, or cash on delivery.",
    icon: <CreditCard size={80} color="#FF9800" />,
  },
  {
    id: "stay-happy",
    title: "Stay Happy",
    description: "Enjoy peace of mind knowing your gas needs are sorted.",
    icon: <Smile size={80} color="#4CAF50" />,
  },
];

const OnboardingScreen = () => {
  const { hasCompletedOnboarding, completeOnboarding, skipOnboarding } =
    useOnboarding();

  if (hasCompletedOnboarding) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 24,
        }}
      >
        <Text variant="title">Welcome Back!</Text>
        <Text variant="body">
          You&apos;ve already completed the onboarding.
        </Text>
      </View>
    );
  }

  return (
    <Onboarding
      steps={onboardingPresets}
      onComplete={() => {
        completeOnboarding();
        router.replace("/auth/sign-up");
      }}
      onSkip={() => {
        skipOnboarding();
        router.replace("/auth/sign-up");
      }}
      showSkip={true}
      showProgress={true}
      swipeEnabled={true}
      primaryButtonText="Start Ordering"
      skipButtonText="Skip"
      nextButtonText="Next"
      backButtonText="Back"
    />
  );
};

export default OnboardingScreen;
