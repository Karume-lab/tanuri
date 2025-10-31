# TANURI CONSUMER MOBILE APP

The **Tanuri Consumer Mobile App** is the user-facing application for the Tanuri ecosystem.  
It allows customers to order LPG gas, track deliveries, manage loyalty points, and interact seamlessly with the Tanuri platform.  
Built using **Expo** and **BNA UI**, it offers a fast, modern, and consistent mobile experience.

---

## Tech Stack

- **Expo** (React Native)
- **BNA UI** – modern, responsive UI components for React Native
- **TypeScript**
- **Bun** – for fast dependency management and scripting
- **ADB** – for installing and testing Android builds

---

## Setup Instructions

Assuming the repository has already been cloned, navigate to the mobile app directory:

```bash
cd apps/tanuri-consumer-mobile
```

---

## Available Scripts

These scripts are defined in the project’s `package.json`:

| Script                      | Description                                                                                  |
| --------------------------- | -------------------------------------------------------------------------------------------- |
| `bun run get-ip`            | Runs a script to set up the local IP for development                                         |
| `bun run dev`               | Starts the Expo development client (recommended for dev builds)                              |
| `bun run start`             | Starts Expo in production mode                                                               |
| `bun run android`           | Cleans and rebuilds the Android project, then runs the app on a connected device or emulator |
| `bun run ios`               | Runs the app on iOS (macOS only)                                                             |
| `bun run build`             | Creates a release build of the Android app                                                   |
| `bun run install-apk`       | Installs the release APK to a connected Android device                                       |
| `bun run build:install-apk` | Builds and installs the release APK in one command                                           |
| `bun run doctor`            | Runs Expo Doctor for troubleshooting and diagnostics                                         |
| `bun run update-packages`   | Ensures all Expo-related packages are up to date                                             |

---

## Running in Development

To start the app in local development mode:

```bash
bun run dev
```

This will automatically configure your machine’s local IP and start the Expo development server.

---

## Building the App

To create a production-ready APK:

```bash
bun run build
```

The release APK will be available at:

```
android/app/build/outputs/apk/release/app-release.apk
```

To install the built APK on a connected Android device:

```bash
bun run install-apk
```

Or run both steps at once:

```bash
bun run build:install-apk
```

---

## Related

- [Tanuri Website README](../tanuri-website/README.md)
- [Tanuri Backend README](../../backend/README.md)
