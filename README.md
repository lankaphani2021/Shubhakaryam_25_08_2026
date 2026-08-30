# Shubhakaryam App

Authentic Hindu pooja services and Vedic priests booking platform.

## Getting Started

This is a Vite + React + TypeScript project.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server:
```bash
npm run dev
```

### Build

Build for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Features

- **Pooja Booking:** Browse and book 100+ traditional services.
- **Verified Priests:** Choose from experienced Vedic acharyas.
- **Astrology:** Kundali matching and muhurtham finding.
- **Navagraha Daan:** Doorstep planetary offerings.
- **PWA Ready:** Installable on Android and iOS devices.

## Android TWA

The project includes an Android Trusted Web Activity (TWA) wrapper in the `android-twa/` directory.

### Build Android App

1. Ensure you have the Android SDK installed.
2. Run the build script:
   ```bash
   ./build-android.sh
   ```
   Or open the `android-twa` project in Android Studio.

## Deployment

The app is ready for deployment on platforms like Vercel, Netlify, or Firebase Hosting.

### Firebase Integration

Configure your Firebase credentials in `src/lib/firebase.ts`.
