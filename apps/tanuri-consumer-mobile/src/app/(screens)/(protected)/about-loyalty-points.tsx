import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";

const AboutLoyaltyPoints = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Card style={styles.card}>
          <CardHeader>
            <CardTitle>Loyalty Points</CardTitle>
            <CardDescription>
              Earn rewards while using Tanuri - coming soon!
            </CardDescription>
          </CardHeader>

          <View style={styles.content}>
            <Text style={styles.paragraph}>
              Tanuri's loyalty points program is designed to reward your
              continued use of our services. Every time you make a purchase, you
              earn points that can later be redeemed for discounts, free
              products, and exclusive offers.
            </Text>

            <Text style={styles.paragraph}>
              You'll also be able to participate in challenges and referral
              programs to gain additional points. Invite friends to join Tanuri,
              complete simple activities, or reach purchase milestones - and
              watch your rewards grow automatically.
            </Text>

            <Text style={styles.paragraph}>
              In the near future, you'll find a dedicated “Loyalty” section in
              your app dashboard where you can track your progress, check your
              current balance, and redeem your points for valuable perks.
            </Text>

            <Text style={styles.paragraph}>
              This feature is currently under development. We appreciate your
              patience and can't wait to roll it out soon - stay tuned for
              updates and be ready to start earning with every order you make!
            </Text>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutLoyaltyPoints;

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
    justifyContent: "center",
  },
  card: {
    borderRadius: 16,
    paddingBottom: 16,
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  content: {
    paddingHorizontal: 16,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 12,
  },
});
