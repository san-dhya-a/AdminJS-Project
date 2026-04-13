# Notícias Module

The Notícias module manages the application's card-based feed, blog posts, and announcements. It features a professional multi-tag selection system and high-performance image handling.

## Key Features
- **Multi-Tag Categories**: Uses a professional **ManyToMany** relationship, allowing you to select multiple categories (e.g., Novidades + Eventos) for a single news item.
- **Professional UI**: Features a tag-style dropdown (`CategoryMultiSelect`) that displays active selections as clean tags.
- **Large Image Support**: Database configured with **LONGTEXT** to support high-resolution Base64 images without validation errors.
- **Consolidated Sidebar**: Both news lists and category management are grouped under the **Notícias** folder for a clean workspace.

## Dashboard Structure
- 📁 **Notícias** (Group)
  - 📄 **Ver Todas**: The list of all news cards/articles.
  - 📄 **Categorias**: Management of category names (e.g., Novidades, Eventos, Postos Petrobras).

## Fields Documentation
- **Title**: The headline of the news card. Supports up to 255 characters.
- **Categories**: A multi-select dropdown fetched from the **Categorias** resource.
- **Main Image**: The primary graphic shown on the frontend card (`image`).
- **Backend Image**: A secondary image for internal/admin reference (`image1`).
- **Date**: The publication or event date.
- **Description**: The full text content (supports textarea).

## Implementation & Configuration
### Database
- **Table**: `noticias`
- **Relationship**: Mapped via `noticias_to_categories` join table.
- **Image Type**: `LONGTEXT` (to prevent payload/size validation failures).

### UI Components
- **CategoryMultiSelect**: Custom React component for handling multiple tag selections and displaying them correctly in the list/show views.
- **ImageUploader**: Integrated at the list level to show thumbnails in the database table.

### Stability
- **Payload Limit**: Server-side limits increased to **50MB** in `main.ts` to ensuring smooth saving of larger content and images.