import { ExternalLink, Globe, QrCode, Users } from "lucide-react-native";
import { Linking, Pressable, ScrollView, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";

const TEAM = [
  { name: "Emmanuel Limisi", url: "https://limisi.srht.site/" },
  { name: "Daniel Karume", url: "https://karume.vercel.app/" },
  { name: "Joseph Ngure", url: "https://ngure1.vercel.app/" },
];

const AboutTanuriScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Card style={styles.card}>
          <CardHeader>
            <CardTitle style={styles.title}>About Tanuri</CardTitle>
            <CardDescription style={styles.description}>
              Redefining the commerce around LPG gas ordering
            </CardDescription>
          </CardHeader>

          <View style={styles.section}>
            <Text style={styles.paragraph}>
              Tanuri is a platform designed to simplify and modernize the LPG
              gas ordering experience. Our mission is to make gas delivery fast,
              transparent, and accessible to everyone — bringing convenience
              right to your doorstep.
            </Text>

            <Text style={styles.paragraph}>
              With Tanuri, customers can order, track deliveries, and make
              secure payments all in one place. We are redefining how local
              commerce operates around LPG distribution by empowering both users
              and suppliers with smart digital tools.
            </Text>
          </View>
        </Card>

        <Card style={styles.card}>
          <CardHeader>
            <CardTitle style={styles.title}>Share the App</CardTitle>
            <CardDescription style={styles.description}>
              Scan or visit the link below to access Tanuri
            </CardDescription>
          </CardHeader>

          <View style={styles.qrContainer}>
            <QrCode color="#60A5FA" size={24} style={styles.icon} />
            <QRCode
              value="https://tanuri.vercel.app"
              size={140}
              backgroundColor="#0B0B0F"
              color="#E5E7EB"
            />
            <Pressable
              onPress={() => Linking.openURL("https://tanuri.vercel.app")}
            >
              <View style={styles.linkRow}>
                <Globe color="#60A5FA" size={18} />
                <Text style={styles.linkText}>https://tanuri.vercel.app</Text>
              </View>
            </Pressable>
          </View>
        </Card>

        <Card style={styles.card}>
          <CardHeader>
            <CardTitle style={styles.title}>Open Source</CardTitle>
            <CardDescription style={styles.description}>
              Explore the project on GitHub
            </CardDescription>
          </CardHeader>

          <Pressable
            onPress={() =>
              Linking.openURL("https://github.com/Karume-lab/tanuri")
            }
          >
            <View style={styles.linkRow}>
              <ExternalLink color="#60A5FA" size={18} />
              <Text style={styles.linkText}>
                https://github.com/Karume-lab/tanuri
              </Text>
            </View>
          </Pressable>
        </Card>

        <Card style={styles.card}>
          <CardHeader>
            <CardTitle style={styles.title}>Our Team</CardTitle>
            <CardDescription style={styles.description}>
              Meet the builders behind Tanuri
            </CardDescription>
          </CardHeader>

          <View style={styles.teamContainer}>
            {TEAM.map((member) => (
              <Pressable
                key={member.name}
                onPress={() => Linking.openURL(member.url)}
              >
                <View style={styles.teamRow}>
                  <Users color="#60A5FA" size={18} />
                  <Text style={styles.teamName}>{member.name}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutTanuriScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0B0F",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
    gap: 16,
  },
  card: {
    backgroundColor: "#18181B",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#27272A",
    paddingBottom: 12,
  },
  title: {
    color: "#F9FAFB",
  },
  description: {
    color: "#A1A1AA",
  },
  section: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 22,
    color: "#D4D4D8",
    marginBottom: 10,
  },
  qrContainer: {
    alignItems: "center",
    gap: 12,
    paddingBottom: 12,
  },
  icon: {
    marginBottom: 8,
  },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 6,
  },
  linkText: {
    color: "#60A5FA",
    textDecorationLine: "underline",
    fontSize: 15,
  },
  teamContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  teamRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  teamName: {
    fontSize: 15,
    color: "#60A5FA",
    textDecorationLine: "underline",
  },
});
