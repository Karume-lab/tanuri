import { exec } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envPath = join(__dirname, "../../.env.local");

interface NetworkInfo {
  ip: string;
  interface: string;
}

const getNetworkCommand = (): string => {
  const platform = process.platform;

  switch (platform) {
    case "win32":
      return "ipconfig";
    case "darwin":
    case "linux":
      return "ifconfig";
    default:
      throw new Error(`❌ Unsupported platform: ${platform}`);
  }
};

const parseWindowsOutput = (stdout: string): NetworkInfo | null => {
  const sections = stdout.split(/(?=\w.*adapter)/);
  const wifiSection = sections.find(
    (section) =>
      section.includes("Wireless LAN adapter Wi-Fi:") ||
      section.includes("Wi-Fi") ||
      section.includes("Ethernet adapter"),
  );

  if (!wifiSection) {
    console.error("❌ Network adapter not found.");
    return null;
  }

  const ipv4Regex = /IPv4 Address[.\s]*:\s*([\d.]+)/;
  const match = wifiSection.match(ipv4Regex);

  if (!match) {
    console.error("❌ IPv4 address not found in network adapter.");
    return null;
  }

  return {
    ip: match[1],
    interface: "Wi-Fi",
  };
};

const parseUnixOutput = (stdout: string): NetworkInfo | null => {
  const sections = stdout.split(/^(\w+):/m);

  // Look for common network interfaces
  const interfaces = ["wlan0", "en0", "eth0", "wlp", "enp"];

  for (const interfaceName of interfaces) {
    const sectionIndex = sections.findIndex(
      (section) =>
        section.includes(interfaceName) || section.startsWith(interfaceName),
    );

    if (sectionIndex !== -1 && sectionIndex + 1 < sections.length) {
      const sectionContent = sections[sectionIndex + 1];

      // Look for inet followed by IP address
      const ipRegex = /inet (\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/;
      const match = sectionContent.match(ipRegex);

      if (match && match[1] !== "127.0.0.1") {
        return {
          ip: match[1],
          interface: interfaceName,
        };
      }
    }
  }

  console.error("❌ No valid network interface found.");
  return null;
};

const parseNetworkOutput = (stdout: string): NetworkInfo | null => {
  const platform = process.platform;

  if (platform === "win32") {
    return parseWindowsOutput(stdout);
  } else {
    return parseUnixOutput(stdout);
  }
};

const updateEnvFile = (backendUrl: string): void => {
  let envContent = "";

  if (existsSync(envPath)) {
    envContent = readFileSync(envPath, "utf-8");
  } else {
    console.warn("⚠️ .env.local not found, a new one will be created.");
  }

  const envVarRegex = /^EXPO_PUBLIC_BASE_API_URL=.*/m;
  const updatedEnv = envContent.match(envVarRegex)
    ? envContent.replace(
        envVarRegex,
        `EXPO_PUBLIC_BASE_API_URL=${backendUrl}/api`,
      )
    : `${envContent}${
        envContent ? "\n" : ""
      }EXPO_PUBLIC_BASE_API_URL=${backendUrl}/api`;

  writeFileSync(envPath, `${updatedEnv.trim()}\n`, "utf-8");
  console.log(`✅ EXPO_PUBLIC_BASE_API_URL updated to: ${backendUrl}/api`);
};

const main = (): void => {
  try {
    const command = getNetworkCommand();

    exec(command, (err, stdout) => {
      if (err) {
        console.error(`❌ Failed to run ${command}:`, err.message);
        return;
      }

      const networkInfo = parseNetworkOutput(stdout);

      if (!networkInfo) {
        return;
      }

      const backendUrl = `http://${networkInfo.ip}:8000`;

      console.log(`🔍 Found IP: ${networkInfo.ip} on ${networkInfo.interface}`);

      updateEnvFile(backendUrl);
    });
  } catch (error) {
    console.error("❌ Error:", error instanceof Error ? error.message : error);
  }
};

// Run the script
main();
