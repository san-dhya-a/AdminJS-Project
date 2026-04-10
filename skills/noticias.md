# Notícias Module

The Notícias module manages the application's card-based feed, blog posts, and announcements. It features a dynamic relational structure for categorizing content.

## Key Features
- **Dynamic Categories**: Uses a relational `ManyToOne` mapping to the **Notícias Category** section.
- **Card-Ready Data**: Fields are optimized for frontend grid layouts (Title, Image, Date, Category).
- **Consolidated Sidebar**: Both news lists and category management are grouped under the **Notícias** folder for a clean workspace.

## Dashboard Structure
- 📁 **Notícias** (Group)
  - 📄 **Ver Todas**: The list of all news cards/articles.
  - 📄 **Categorias**: Dynamic management of category names (e.g., Novidades, Eventos).

## Fields Documentation
- **Title**: The headline of the news card.
- **Description**: The full text content (supports textarea).
- **Image**: Supported through the high-performance Base64 uploader.
- **Date**: The publication or event date.
- **Category**: A dynamic dropdown selection fetched from the **Categorias** resource.

## Relationship Implementation
The `Noticias` entity holds a `categoryId` foreign key, which links to the `NoticiasCategory` entity. AdminJS automatically renders this as a searchable dropdown in the edit view.
