# Shubhakaryam Android Play Store Build Guide

This guide will help you convert the Shubhakaryam PWA into a native Android app for the Google Play Store.

## Prerequisites

1. **Node.js and npm** installed
2. **Java JDK 8+** installed
3. **Android Studio** (optional, for advanced customization)
4. **Google Play Developer account** ($25 one-time fee)

## Method 1: Using Bubblewrap CLI (Recommended)

### Step 1: Install Bubblewrap
```bash
npm install -g @anthropic/bubblewrap
```

### Step 2: Initialize Project
```bash
bubblewrap init --manifest https://shubhakaryam.app/manifest.json
```

### Step 3: Configure App
Follow the prompts to set up:
- Package name: `com.kundali.shubhakaryam`
- App name: `Shubhakaryam`
- Signing key (auto-generated)

### Step 4: Build APK
```bash
bubblewrap build
```

This generates `app-release.apk` ready for Play Store upload.

## Method 2: Using PWA Builder (Web-based)

1. Visit [PWA Builder](https://www.pwabuilder.com/)
2. Enter your website URL: `https://shubhakaryam.app`
3. Click "Package for Android"
4. Download the generated APK
5. Test the APK on Android devices

## Method 3: Using Bubblewrap Web Tool

1. Visit [Bubblewrap](https://bubblewrap.dev/)
2. Connect your GitHub repository
3. Configure build settings
4. Generate APK automatically

## Required Assets for Play Store

### Icons Needed:
- **512x512** - Application icon (high-res)
- **192x192** - Adaptive icon
- **144x144** - Google Play icon

### Screenshots Needed:
- **At least 2 screenshots** from Android device
- **Recommended 8 screenshots** (1080x1920 pixels)
- **Phone and tablet versions**

### Feature Graphic:
- **1024x500 pixels** - Featured in Play Store listing

## Play Store Submission Process

### 1. Create Developer Account
- Go to [Google Play Console](https://play.google.com/console)
- Pay $25 registration fee
- Complete developer profile

### 2. Create App Listing
- App name: "Shubhakaryam - Pooja Services"
- Short description: "Book authentic Hindu pooja services, Vedic priests & ceremonies"
- Full description: (use content from play-store-listing.yaml)
- Category: Lifestyle > Religion
- Content rating: Everyone

### 3. Upload Assets
- Application icon (512x512)
- Feature graphic (1024x500) 
- Screenshots (min 2, max 8)
- Promo graphic (180x120)

### 4. Provide Privacy Policy URL
- Create simple privacy policy page
- Upload to `/privacy` on website
- Link in Play Store listing

### 5. Upload APK
- Upload the generated APK file
- Set content rating
- Declare permissions (none needed for PWA)

### 6. Set Pricing & Distribution
- Free app
- All countries (or select specific)
- No ads, no in-app purchases

### 7. Submit for Review
- Review takes 1-3 days
- Test thoroughly before submission
- Provide contact email

## Testing Before Submission

### Device Testing:
```bash
# Install APK on Android device
adb install app-release.apk

# Test all features:
- Service browsing and booking
- Priest selection
- User authentication
- Payment flow (simulated)
- Responsive design
- Offline functionality
- Navigation and routing
```

### Check Features:
- [ ] App installs correctly
- [ ] PWA loads in standalone mode
- [ ] All services accessible
- [ ] Booking flow works
- [ ] User authentication works
- [ ] Push notifications (if enabled)
- [ ] Offline functionality works
- [ ] Screenshots match current app version

## Continuous Updates

### Updating the App:
1. Make changes to the web app
2. Increment version in twa-config.json
3. Rebuild APK with Bubblewrap
4. Upload new version to Play Store
5. Users get automatic updates

### Version Management:
- Major version: New features
- Minor version: Improvements  
- Patch version: Bug fixes

## Privacy Policy Requirements

Create `/privacy` page on website with:
- Data collection practices
- User data storage
- Third-party services used
- Contact information
- Data retention policies

## Contact Information
- Developer: Phani Lanka
- Email: lankaphani2021@gmail.com
- Support: lankaphani2021@gmail.com
- Website: https://shubhakaryam.app

## Troubleshooting

### Build Issues:
- Ensure manifest.json is accessible
- Check SSL certificate is valid
- Verify all icons exist
- Check for JavaScript errors

### Play Store Rejection:
- Incomplete privacy policy
- Missing screenshots
- Incorrect app category
- Violation of content policies
- Technical issues with APK

### Performance Issues:
- Optimize image sizes
- Minimize JavaScript bundle
- Test on slow 3G connections
- Verify service worker caching

## Advanced Customization (Optional)

For deeper Android integration, use Android Studio:
1. Import Bubblewrap project
2. Add native Android features
3. Customize splash screen
4. Add native notifications
5. Implement deep linking

## Next Steps

1. ✅ PWA is ready and mobile-optimized
2. 🎯 Choose build method (Bubblewrap recommended)
3. 📱 Test APK on multiple Android devices
4. 📸 Take professional screenshots
5. 🎨 Create Play Store assets
6. 📝 Write privacy policy
7. 🚀 Submit to Play Store

## Resources

- [PWA Builder](https://www.pwabuilder.com/)
- [Bubblewrap Documentation](https://bubblewrap.dev/)
- [Android Asset Studio](https://romannurik.github.io/AndroidAssetStudio/)
- [Play Console Help](https://support.google.com/googleplay/android-developer)

## Support

For technical issues with Play Store submission:
- Google Play Developer Support
- Stack Overflow tag: [trusted-web-activity]
- GitHub Issues for Bubblewrap
