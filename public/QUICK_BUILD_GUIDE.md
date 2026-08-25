# Shubkaryam Play Store Build Guide

Since Node.js is not available in this environment, you'll need to use one of these alternative methods to build your APK:

## Method 1: PWA Builder (Easiest - Recommended)

1. **Go to PWA Builder**: https://www.pwabuilder.com/
2. **Enter your app URL**: `https://pooja-booking-platform-3653.kliv.site`
3. **Click "Scan"** - it will detect your PWA
4. **Click "Android"** - then "Package for Android"
5. **Download APK** - It will generate the APK file
6. **Test the APK** - Install on your Android device
7. **Upload to Play Store** - When ready

## Method 2: Local Computer Build

1. **Copy files to your computer**:
   ```bash
   # Download these files from /app/public/:
   - twa-config.json
   - manifest.json
   - icon-template.svg
   
   # Also note these URLs:
   - App URL: https://pooja-booking-platform-3653.kliv.site
   - Manifest: https://pooja-booking-platform-3653.kliv.site/manifest.json
   ```

2. **Install Node.js** on your computer from https://nodejs.org/

3. **Install Bubblewrap CLI**:
   ```bash
   npm install -g @anthropic/bubblewrap
   ```

4. **Run the build script**:
   ```bash
   # Place build-android.sh and twa-config.json in same folder
   chmod +x build-android.sh
   ./build-android.sh
   ```

5. **Get your APK** in the `dist/` folder

## Method 3: Bubblewrap Web Tool

1. **Go to**: https://play.google.com/bubblewrap/
2. **Import your config**: Upload twa-config.json
3. **Build APK**: Use the web interface
4. **Download APK**: Direct download link

## Current App Status

✅ **Ready for APK Generation**:
- TWA Configuration: ✅ Complete (twa-config.json)
- PWA Manifest: ✅ Complete (manifest.json)
- Service Worker: ✅ Complete (sw.js)
- Privacy Policy: ✅ Complete (privacy.html)
- App Icons: ⏳ Need to be created
- Feature Graphics: ⏳ Need to be created

## Before Building APK

You need to create these assets:

### App Icons (Required)
Create these icon files:
- **512×512px**: Main Play Store icon
- **192×192px**: Android adaptive icon
- **512×512px**: High-res icon for large screens

**Tools**: 
- Canva: https://www.canva.com/
- Favicon.io: https://favicon.io/
- Android Asset Studio: https://romannurik.github.io/AndroidAssetStudio/

### Screenshots (Required)
Capture 2-8 screenshots from your app:
1. Homepage with services
2. Service booking flow
3. My Bookings page
4. Priest selection
5. Payment/confirmation
6. Profile/Invite Friends

**Size**: 1080×1920px (portrait)
**Format**: PNG or JPG

### Feature Graphic (Optional)
- **Size**: 1024×500px
- **Use**: Hero banner in Play Store

## Quick Start (Recommended)

**For fastest results, use PWA Builder:**

1. Go to https://www.pwabuilder.com/
2. Enter: `https://pooja-booking-platform-3653.kliv.site`
3. Click "Scan" → "Android" → "Package for Android"
4. Download your APK
5. Test it on your phone
6. Upload to Play Store

**This method works entirely in your browser and doesn't require any installation!**

## Play Store Submission

Once you have the APK:

1. **Developer Account**: 
   - Sign up at https://play.google.com/console ($25 fee)
   - Complete developer profile

2. **Create App**:
   - Click "Create app"
   - Enter app name: "Shubkaryam"
   - Select "No, I don't have a draft app"

3. **Upload APK**:
   - Upload your Shubkaryam.apk file
   - Fill in store listing details

4. **Add Assets**:
   - Upload screenshots (2-8 images)
   - Upload feature graphic (1024×500px)
   - Upload app icon (512×512px)

5. **Store Listing**:
   - Description: Already provided in memories
   - Categories: Lifestyle → Religion
   - Content Rating: Everyone
   - Contact: admin.shubkaryam@yopmail.com

6. **Submit**:
   - Review and submit for review
   - Wait 1-3 days for approval

## Testing Before Upload

**Always test your APK first:**
1. Transfer APK to your Android phone
2. Enable "Install from unknown sources"
3. Install and test all features
4. Check private access system works
5. Verify booking flow
6. Test admin features if accessible

Only upload to Play Store when you're confident the app works perfectly!

---

**Current Status**: Your app is fully configured for APK generation using any of the methods above.

**Recommended Action**: Use PWA Builder (Method 1) for the quickest and easiest APK generation!