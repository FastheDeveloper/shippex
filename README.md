# 📦 Spotter – Package Delivery App (React Native + Expo)

**Spotter** is a React Native app built with Expo that helps users manage and track their package deliveries. Whether you're shipping across cities or countries, Spotter provides a streamlined interface for viewing shipment status, marking deliveries, and filtering packages by status.

---

## 🚀 Features

- 📦 View all shipments
- 🔍 Search packages by address, state, or tracking ID
- 🏷️ Filter shipments by delivery status
- 🛎️ Pull-to-refresh

---

## ⚙️ Tech Stack

- **React Native** with **Expo**
- **TypeScript**
- **TailwindCSS** (via [NativeWind](https://www.nativewind.dev/))
- **Fuse.js** for fuzzy search
- **Zustand** for global state management
- **Reusable UI components** with custom SVG icons

---

## 📦 Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/FastheDeveloper/shippex.git
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the App

To build and run the app locally:

Android:

```
npx expo run:android
```

iOS (macOS + Xcode required):

```
npx expo run:ios
```

## 📁 Folder Structure Highlights

- /components → Reusable UI components (inputs, lists, icons)
- /app → Feature screens like Dashboard, Search, DeliveryStatus
- /assets → Icons and images
- /constants → App constants and configuration
- /data → Static data and mock data
- /hooks → Custom React hooks

⚠️ Troubleshooting
Keyboard not showing in iOS Simulator? Press Cmd + Shift + K to disable hardware keyboard.

Tailwind classes not applying? Try clearing cache and restarting:

```
npx expo start --clear
```

📜 License
MIT License — fork it, use it, contribute, or build something even better.
