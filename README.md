# AdminJS Content & Management Dashboard: Master Documentation

This comprehensive document outlines the architecture, implementation, and features of the AdminJS dashboard project. The dashboard is designed to manage news, promotional banners, user missions, and dynamic content pages (FAQs/Regulations) through a unified, high-performance interface.

---

## 🏗️ Technical Architecture

### Core Stack
- **Backend**: NestJS (Node.js framework)
- **Database**: MySQL (Persistence layer)
- **ORM**: TypeORM
- **Admin Interface**: AdminJS (Core framework)
- **Custom UI**: React.js with `@adminjs/design-system`

### System Optimizations
- **Large Payload Support**: Configured **50MB** request limits in `main.ts` to support high-resolution Base64 image uploads.
- **Base64 Image Strategy**: Standardized on storing images as Base64 strings in `LONGTEXT` columns, allowing for a zero-configuration media system that bypasses complex folder permission issues.
- **Dynamic Content**: Implemented a JSON-based content builder for Pages (FAQ/Regulamento), allowing for infinite structural flexibility without database migrations.

---

## 📦 Module Breakdown

### 1. Notícias (News Management)
Manages the application's card-based feed and blog announcements.
- **Form Structure**: Features **Two Image Fields** (Main Image for frontend, Backend Image for admin reference).
- **Multi-Tag System**: Uses a relational **ManyToMany** relationship for categories.
- **UI Component**: `CategoryMultiSelect` provides a tag-based experience (e.g., *Novidades + Eventos*).
- **Stability**: Fields are marked as optional to unblock rapid content drafting.
- **Image Preview**: List view displays thumbnails for both images directly in the data table.

### 2. Missões (Missions)
Handles interactive tasks and user reward systems, synced with the `missoes` table.
- **Advanced Mapping**: Supports 13 distinct fields including Reward Type (Diamantes/Pontos), Reward Values, and Action Button text.
- **Smart Status**: Automatically calculates mission status (**Ativo** vs **Expirado**) by comparing the `expireDate` with the system time.
- **Sync Logic**: Mapped to snake_case database columns while maintaining camelCase across the TypeScript codebase.

### 3. Home Banner
Active management of primary homepage sliders.
- **Features**: Direct mapping of Image, Target Link, and display dates.
- **Registration**: Integrated as a top-level sidebar link with professional "Home" icon.
- **Technical**: Uses `ImageUploader` for professional banner management.

### 4. Pages: FAQ (Questions & Answers)
Dynamic builder for frequently asked questions.
- **Component**: `FAQBuilder.tsx` manages complex state for nested items.
- **Differentiator**: Supports "Shared Headings" and "Titled Groups" within a single record.
- **Storage**: Serialized as a single JSON array in the `pages` table.

### 5. Pages: Regulamento (Legal & Terms)
Dedicated section for structured legal text and articles.
- **Behavior**: Switches the `FAQBuilder` into "Article Mode" where every block requires a Title/Header.
- **Structure**: Optimized for formal articles and clauses, stored in the same flexible JSON format.

---

## 🗄️ Database Schema Summary

| Table Name | Description | Key Column Types |
| :--- | :--- | :--- |
| `noticias` | News items | `image LONGTEXT`, `title VARCHAR(255)` |
| `noti_category` | News categories | `title VARCHAR(255)` |
| `noticias_to_categories` | Join table | `noticiasId, categoryId` (Relational) |
| `missoes` | User missions | `image LONGTEXT`, `reward_type VARCHAR(100)` |
| `home_banners` | Sliders | `image LONGTEXT`, `start_date DATE` |
| `pages` | FAQ / Regulamento | `content JSON`, `type VARCHAR(50)` |

---

## 🛠️ Best Practices & Maintenance

### Adding New Resources
1.  **Database**: Manually create the table or add columns (`synchronize: false`).
2.  **Entity**: Create the TypeORM class in `src/entities/`.
3.  **Resource**: Create the AdminJS configuration in `src/admin/resources/`.
4.  **Register**: Add the new resource to `src/admin/options.ts` and the entity to `AppModule`.

### Image Management
Always ensure the `image` column is set to **`LONGTEXT`** in MySQL to prevent saving failures. The dashboard is configured to handle high-resolution files gracefully.

### Payload Limits
If you encounter a "Validation Error" on extremely large pages, verify that the 50MB limit in `src/main.ts` is still active.

---

## ✅ Project Completion Status
The dashboard is currently **Fully Optimized** and **Synchronized** with the database. All known validation blocks have been resolved through technical architecture updates.
