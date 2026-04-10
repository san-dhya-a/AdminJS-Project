# Technical Documentation: FAQ Implementation

This document describes the technical implementation of the **FAQ** (Frequently Asked Questions) module within the AdminJS dashboard.

---

## 🚀 Purpose
The FAQ module allows administrators to create a dynamic list of questions and answers. It is designed to group multiple entries under a single master title, providing a clean and organized structure for the end-user.

---

## 🛠 Technologies Used
- **Backend Framework**: NestJS
- **Admin Interface**: AdminJS (Core)
- **Design System**: `@adminjs/design-system` (React components)
- **Database ORM**: TypeORM
- **Persistence Strategy**: Dynamic JSON storage within a single `content` column in the `pages` table.

---

## 🎨 Implementation & Behavior

### 1. Dynamic Section Logic
The FAQ feature is powered by a custom React component (`FAQBuilder.tsx`) that manages its own internal state.

*   **The (+) Icon Behavior**:
    *   **First Click**: Dynamically reveals the **Title**, **Subtitle**, and **Description** fields. The Title field acts as the main heading for the entire FAQ group.
    *   **Subsequent Clicks**: Appends additional blocks containing only **Subtitle** and **Description** fields.
*   **Single Unified Section**: All entries are kept inside the same visual section. The Title appears exactly once at the top, ensuring there is no redundant heading.

### 2. Field Structure
Each entry in the FAQ list is handled as a React object:
- **Title**: The main section header (Shared across all entries).
- **Subtitle**: Used as the individual Question.
- **Description**: Used as the detailed Answer.

---

## ⚙️ Logic & Workflow in AdminJS

1.  **Mode Detection**: The system detects the `pageType` selected in the AdminJS panel. If `faq` is chosen, the `FAQBuilder` activates.
2.  **Conditional Rendering**: The component checks the length of the internal items array. It conditionally renders the `Title` input only if at least one item exists, ensuring a clean initial state.
3.  **Data Synchronization**: Every change in the fields is captured by React `useState` and synchronized with the database record via the `onChange` prop provided by AdminJS.
4.  **JSON Handling**: On save, the entire FAQ structure is serialized into a JSON object and stored in the database, allowing for infinite scalability of Q&A pairs without schema changes.
