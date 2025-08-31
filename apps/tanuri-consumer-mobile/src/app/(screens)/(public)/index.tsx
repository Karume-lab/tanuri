import { router } from "expo-router";
import {
  Bell,
  Calendar,
  CheckSquare,
  ListTodo,
  Smile,
  Star,
} from "lucide-react-native";
import { Onboarding, useOnboarding } from "@/components/ui/onboarding";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";

export const onboardingPresets = [
  {
    id: "welcome",
    title: "Welcome to TaskBuddy",
    description:
      "Organize your day and stay on top of your tasks effortlessly.",
    icon: <ListTodo size={80} color="#FBC02D" />,
  },
  {
    id: "create-complete",
    title: "Create & Complete",
    description: "Add new to-dos in seconds and check them off when done.",
    icon: <CheckSquare size={80} color="#E91E63" />,
  },
  {
    id: "reminders",
    title: "Get Reminders",
    description: "Never miss a deadline with smart notifications.",
    icon: <Bell size={80} color="#2196F3" />,
  },
  {
    id: "plan-ahead",
    title: "Plan Ahead",
    description: "Schedule tasks for the days that matter most.",
    icon: <Calendar size={80} color="#9C27B0" />,
  },
  {
    id: "prioritize",
    title: "Prioritize What Matters",
    description: "Mark important tasks so you focus on what's key.",
    icon: <Star size={80} color="#FF9800" />,
  },
  {
    id: "stay-motivated",
    title: "Stay Motivated",
    description: "Enjoy small wins every day as you tick off your list.",
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
      primaryButtonText="Get Started"
      skipButtonText="Skip"
      nextButtonText="Next"
      backButtonText="Back"
    />
  );
};

export default OnboardingScreen;
