#!/bin/bash

# Shubhakaryam Android App Bundle Build Script
# This script automates the TWA AAB generation process for Google Play Store

set -e

echo "🔥 Building Shubhakaryam .aab (Android App Bundle) for Play Store..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check prerequisites
echo "📋 Checking prerequisites..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi
echo -e "${GREEN}✅ Node.js found${NC}"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✅ npm found${NC}"

# Check if twa-config.json exists
if [ ! -f "twa-config.json" ]; then
    echo -e "${RED}❌ twa-config.json not found${NC}"
    echo "Please ensure twa-config.json is in the current directory"
    exit 1
fi
echo -e "${GREEN}✅ twa-config.json found${NC}"

# Check if Bubblewrap CLI is installed
if ! command -v bubblewrap &> /dev/null; then
    echo -e "${YELLOW}📦 Installing Bubblewrap CLI...${NC}"
    npm install -g @anthropic/bubblewrap
    echo -e "${GREEN}✅ Bubblewrap CLI installed${NC}"
else
    echo -e "${GREEN}✅ Bubblewrap CLI found${NC}"
fi

# Create output directory
mkdir -p dist
echo "📁 Created dist directory for output"

# Generate the AAB (Android App Bundle) for Play Store
echo "🔨 Building .aab (Android App Bundle) with Bubblewrap..."
bubblewrap build \
    --manifest=twa-config.json \
    --aab="dist/Shubhakaryam-release.aab"

# Also generate APK for testing
echo "🔨 Building .apk for device testing..."
bubblewrap build \
    --manifest=twa-config.json \
    --apk="dist/Shubhakaryam-release.apk"

# Check if AAB was created
if [ -f "dist/Shubhakaryam-release.aab" ]; then
    AAB_SIZE=$(du -h "dist/Shubhakaryam-release.aab" | cut -f1)
    APK_SIZE=$(du -h "dist/Shubhakaryam-release.apk" | cut -f1)
    
    echo -e "${GREEN}✅ Build completed successfully!${NC}"
    echo ""
    echo -e "${BLUE}📦 Play Store Upload File:${NC}"
    echo "   File: dist/Shubhakaryam-release.aab"
    echo "   Size: $AAB_SIZE"
    echo "   Format: Android App Bundle (.aab)"
    echo ""
    echo -e "${BLUE}📱 Device Testing File:${NC}"
    echo "   File: dist/Shubhakaryam-release.apk"
    echo "   Size: $APK_SIZE"
    echo "   Format: Android Package Kit (.apk)"
    echo ""
    
    # Verify files
    echo "🔍 Verifying build files..."
    ls -lh "dist/Shubhakaryam-release.aab"
    ls -lh "dist/Shubhakaryam-release.apk"
    
    echo ""
    echo -e "${GREEN}🎉 Build completed successfully!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Test the APK on your Android device:"
    echo "   - Copy dist/Shubhakaryam-release.apk to your phone"
    echo "   - Install and test all features"
    echo ""
    echo "2. Upload .aab to Google Play Store:"
    echo "   - Go to https://play.google.com/console"
    echo "   - Upload dist/Shubhakaryam-release.aab (not .apk)"
    echo "   - .aab is required for Play Store"
    echo ""
    echo "🙏 Shubhakaryam - Traditional Ceremonies Made Simple"
    echo "Package: com.pooja.shubhakaryam"
    
else
    echo -e "${RED}❌ AAB build failed${NC}"
    echo "Please check the error messages above"
    exit 1
fi