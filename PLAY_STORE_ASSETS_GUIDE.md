# Play Store Assets Creation Guide

This guide helps create all required assets for Google Play Store submission.

## Required Assets Checklist

### High Priority (Required):
- [ ] **Application Icon** - 512x512px PNG
- [ ] **Feature Graphic** - 1024x500px PNG  
- [ ] **Screenshots** - Minimum 2, Maximum 8 screenshots (1080x1920px)
- [ ] **Privacy Policy URL** - Live privacy policy page

### Medium Priority (Recommended):
- [ ] **Promo Graphic** - 180x120px PNG
- [ ] **Tablet Screenshots** - For larger devices
- [ ] **YouTube Promo Video** - 30 seconds to 2 minutes

### Low Priority (Optional):
- [ ] **Adaptive Icons** - Multiple sizes for Android versions
- [ ] **Wear OS Icons** - If supporting smartwatches
- [ ] **TV Banner** - If supporting Android TV

## Asset Creation Tools

### 1. Application Icon (512x512)
**Tools:**
- [Canva](https://www.canva.com/) - Search "App Icon 512x512"
- [Favicon.io](https://favicon.io/) - Generate from your logo
- [Android Asset Studio](https://romannurik.github.io/AndroidAssetStudio/)

**Design Guidelines:**
- Use Shubhakaryam flame icon on gradient background
- Saffron to maroon gradient background
- Clean, uncluttered design
- Good contrast and readability
- No text in icon (use app name in listing)

### 2. Feature Graphic (1024x500)
**Tools:**
- [Canva](https://www.canva.com/) - Use "Google Play Feature Graphic" template
- [Photoshop/GIMP] - Manual creation
- [Fotor](https://www.fotor.com/)

**Content to Include:**
- App name: "Shubhakaryam"
- Tagline: "Book Pooja Services"
- Key features: 3-4 bullet points
- Visual elements: Pooja items, priest performing ceremony
- Color scheme: Match app theme (saffron, maroon, cream)

### 3. Screenshots (1080x1920)
**Tools:**
- Android Emulator with screen capture
- Real device screenshots using adb
- [Device Farm](https://devicefarm.app/) - Multiple device testing

**Screenshots to Capture:**
1. **Home Screen** - Hero section with "Book Pooja Services"
2. **Services Page** - Showing available pooja services
3. **Service Details** - Individual service booking page
4. **Priest Selection** - Choose verified Vedic priests
5. **Booking Flow** - Date/time selection and confirmation
6. **My Bookings** - User booking history
7. **Astrology Section** - Navagraha and Pind Daan services
8. **Profile/Account** - User dashboard

**Screenshot Best Practices:**
- Use real devices or high-quality emulators
- Show complete app screens, not cropped
- Include device frame for context (optional)
- Avoid showing device status bars
- Consistent styling across screenshots
- Highlight key features with annotations

### 4. Promo Graphic (180x120)
**Tools:**
- Canva promo graphic templates
- Simple image editing tools

**Content:**
- Simplified version of feature graphic
- App logo and name
- Clear, readable at small size

## Creation Process

### Step 1: Prepare Design Elements
- Gather brand assets (colors, logos, fonts)
- Download app icon template
- Prepare screenshot content/copy

### Step 2: Create Application Icon
```bash
# Using Android Asset Studio
1. Upload your logo
2. Choose background color (#dc2626 to #f59e0b gradient)
3. Generate icon for all required sizes
4. Download ZIP file
```

### Step 3: Capture Screenshots
```bash
# Using Android Emulator
adb shell screencap -p /sdcard/screen.png
adb pull /sdcard/screen.png

# Or use Android Studio's built-in screenshot tool
```

### Step 4: Design Feature Graphic
- Use Canva with "Google Play Feature Graphic" template
- Add "Shubhakaryam" branding
- Include key value propositions
- Match app color scheme

### Step 5: Create Privacy Policy
- Use provided PRIVACY_POLICY.md as template
- Upload to `/privacy` route on website
- Ensure it's accessible via HTTPS

## File Organization

Create this structure:
```
/app/play-store-assets/
├── icons/
│   ├── application-icon-512.png
│   ├── adaptive-icon-192.png
│   └── google-play-icon.png
├── screenshots/
│   ├── screenshot1.png (Home)
│   ├── screenshot2.png (Services)
│   ├── screenshot3.png (Service Details)
│   ├── screenshot4.png (Priest Selection)
│   ├── screenshot5.png (Booking Flow)
│   ├── screenshot6.png (My Bookings)
│   ├── screenshot7.png (Astrology)
│   └── screenshot8.png (Profile)
├── graphics/
│   ├── feature-graphic.png
│   └── promo-graphic.png
└── videos/
    └── promo-video.mp4 (optional)
```

## Design Specifications

### Color Palette:
- **Primary**: #dc2626 (Maroon)
- **Secondary**: #f59e0b (Saffron)
- **Background**: #ffffff (White)
- **Text**: #1a1a1a (Dark Gray)

### Typography:
- **Display Font**: Marcellus
- **Body Font**: DM Sans
- **Headings**: Clear and readable at small sizes

### Visual Style:
- Traditional Hindu design elements
- Clean, modern interface
- Warm, inviting color scheme
- Professional, trustworthy appearance

## Quality Checks

### Before Upload:
- [ ] All images are correct dimensions
- [ ] File sizes are reasonable (under 2MB each)
- [ ] PNG format for all graphics
- [ ] No blurry or pixelated images
- [ ] Consistent branding across all assets
- [ ] Screenshots show current app version
- [ ] No sensitive user data in screenshots
- [ ] Professional presentation

### Common Mistakes to Avoid:
- Including device frames in screenshots
- Using low-resolution images
- Inconsistent branding across assets
- Forgetting to update app name
- Missing required assets
- Poor quality graphics
- Incorrect dimensions

## Automated Tools

### Bubblewrap Asset Generator:
```bash
bubblewrap init
# Automatically generates required icons from manifest.json
```

### PWA Builder:
- Visit https://www.pwabuilder.com/
- Enter website URL
- Download generated assets package
- Review and customize as needed

## Next Steps After Asset Creation

1. **Test Assets**:
   - Upload to Play Console draft listing
   - Preview how they appear on different devices
   - Get feedback from team members

2. **Finalize Listing**:
   - Complete all Play Store metadata
   - Upload privacy policy URL
   - Set pricing and distribution

3. **Submit for Review**:
   - Ensure all assets meet quality standards
   - Double-check all requirements
   - Submit for Google Play review

## Support and Resources

- [Play Console Asset Guidelines](https://support.google.com/googleplay/android-developer/answer/10788720)
- [Material Design Icons](https://material.io/resources/icons/)
- [Canva Pro Templates](https://www.canva.com/templates/s/app-icon)
- [Android Asset Studio](https://romannurik.github.io/AndroidAssetStudio/)

## Timeline Estimate

- **Icon Creation**: 1-2 hours
- **Screenshot Capture**: 2-3 hours  
- **Feature Graphic Design**: 1-2 hours
- **Review and Finalization**: 1 hour
- **Total**: 5-8 hours

Start this process early to avoid submission delays!
