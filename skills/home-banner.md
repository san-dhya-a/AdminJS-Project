# Home Banner Module

The Home Banner module allows dynamic management of the primary sliders and promotional images on the application homepage.

## Key Features
- **Visual Management**: Uses the `ImageUploader` for professional banner selection and preview.
- **Time-Sensitive Content**: Supports `startDate` and `endDate` to automatically control when banners are live on the site.
- **Actionable Banners**: Integrated `link` field to redirect users upon clicking.

## Fields Documentation
- **Image**: High-resolution banner image (stored in Base64 `LONGTEXT`).
- **Link**: The URL destination for the banner action.
- **Start Date**: The date when the banner should begin appearing.
- **End Date**: The date when the banner should stop appearing.

## Implementation Details
- **Database Table**: `home_banners`
- **Resource ID**: `HomeBanner`
- **Configuration**: Uses custom `ImageUploader` component and `displayName` labels for a more intuitive administration experience.
- **Stability**: Integrated with the system-wide **50MB** payload limit to support large banner graphic uploads.
