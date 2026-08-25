#!/bin/bash

# Shubhakarya Play Store Build Script
# This script automates the Android APK build process for Play Store submission

set -e

echo "🚀 Shubhakarya Play Store Build Process"
echo "========================================"

# Configuration
APP_NAME="Shubhakarya"
PACKAGE_NAME="com.shubhakarya.pooja"
MANIFEST_URL="https://pooja-booking-platform-3653.kliv.site/manifest.json"
OUTPUT_DIR="./android-build"
VERSION="1.0.0"

# Check prerequisites
echo "📋 Checking prerequisites..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check Bubblewrap
if ! command -v bubblewrap &> /dev/null; then
    echo "📦 Installing Bubblewrap CLI..."
    npm install -g @anthropic/bubblewrap
fi

# Create output directory
echo "📁 Creating output directory..."
mkdir -p "$OUTPUT_DIR"

# Step 1: Initialize Bubblewrap project
echo "🔧 Initializing Bubblewrap project..."
bubblewrap init \
    --manifest "$MANIFEST_URL" \
    --directory "$OUTPUT_DIR" \
    --name "$APP_NAME" \
    --package "$PACKAGE_NAME" \
    --version "$VERSION" \
    --startUrl "/" \
    --themeColor "#dc2626" \
    --backgroundColor "#ffffff" \
    --display "standalone" \
    --orientation "portrait"

# Step 2: Generate icons if not present
echo "🎨 Checking for application icons..."
if [ ! -f "$OUTPUT_DIR/android-chrome-512x512.png" ]; then
    echo "⚠️  Application icons not found. Please create icons first:"
    echo "   - android-chrome-512x512.png"
    echo "   - android-chrome-192x192.png"
    echo "   - apple-touch-icon.png"
    echo ""
    echo "🔗 Use: https://favicon.io or https://www.canva.com/"
    read -p "Continue without icons? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Step 3: Build APK
echo "🔨 Building APK..."
cd "$OUTPUT_DIR"

bubblewrap build

# Step 4: Verify APK
echo "✅ Verifying generated APK..."
if [ -f "app-release.apk" ]; then
    APK_SIZE=$(du -h app-release.apk | cut -f1)
    echo "✓ APK generated successfully!"
    echo "  File: app-release.apk"
    echo "  Size: $APK_SIZE"
else
    echo "❌ APK generation failed!"
    exit 1
fi

# Step 5: Prepare Play Store assets
echo "📦 Preparing Play Store assets..."
cd ..

PLAY_STORE_DIR="./play-store-assets"
mkdir -p "$PLAY_STORE_DIR"

echo "Looking for Play Store assets in $PLAY_STORE_DIR..."

# Check for required assets
REQUIRED_ASSETS=(
    "icons/application-icon-512.png"
    "graphics/feature-graphic.png"
)

MISSING_ASSETS=()

for asset in "${REQUIRED_ASSETS[@]}"; do
    if [ ! -f "$PLAY_STORE_DIR/$asset" ]; then
        MISSING_ASSETS+=("$asset")
    fi
done

if [ ${#MISSING_ASSETS[@]} -gt 0 ]; then
    echo "⚠️  Missing Play Store assets:"
    for asset in "${MISSING_ASSETS[@]}"; do
        echo "   - $asset"
    done
    echo ""
    echo "🔗 Create assets using: PLAY_STORE_ASSETS_GUIDE.md"
fi

# Step 6: Generate build summary
echo ""
echo "📋 BUILD SUMMARY"
echo "========================================"
echo "✓ App Name: $APP_NAME"
echo "✓ Package: $PACKAGE_NAME"  
echo "✓ Version: $VERSION"
echo "✓ APK Location: $OUTPUT_DIR/app-release.apk"
echo "✓ APK Size: $APK_SIZE"
echo ""

# Step 7: Next steps
echo "🎯 NEXT STEPS"
echo "========================================"
echo "1. Test the APK:"
echo "   adb install $OUTPUT_DIR/app-release.apk"
echo ""
echo "2. Create Play Store assets (if not done):"
echo "   - Screenshots (min 2, max 8)"
echo "   - Feature graphic (1024x500)"
echo "   - Application icon (512x512)"
echo ""
echo "3. Upload to Play Store:"
echo "   - Go to Google Play Console"
echo "   - Create new app or update existing"
echo "   - Upload APK and all assets"
echo "   - Submit for review"
echo ""

# Optional: Open Play Console
read -p "Open Google Play Console in browser? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    # Try to open Play Console
    if command -v xdg-open &> /dev/null; then
        xdg-open "https://play.google.com/console"
    elif command -v open &> /dev/null; then
        open "https://play.google.com/console"
    else
        echo "🔗 Please open: https://play.google.com/console"
    fi
fi

echo "✅ Build process completed!"
echo "🙏 Thank you for using Shubhakarya build script!"