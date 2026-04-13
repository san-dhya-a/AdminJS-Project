# Technical Documentation: FAQ Implementation

This document describes the technical implementation of the **FAQ** (Frequently Asked Questions) module within the AdminJS dashboard.

---

## 🚀 Purpose
The FAQ module allows administrators to create a dynamic list of questions and answers. It supports both shared headings and multiple titled sections for complex data organization.

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
The FAQ feature is powered by a custom React component (`FAQBuilder.tsx`) that manages its own internal state and supports two types of additions:

*   **"Add FAQ Items" Button**: 
    *   **First Click**: Automatically shows the **Title**, **Subtitle**, and **Description** fields (index 0).
    *   **Subsequent Clicks**: Adds only **Subtitle** and **Description** fields.
*   **"Add Title" Button**:
    *   Adds a comprehensive entry containing **Title**, **Subtitle**, and **Description**.
    *   This allows for multiple titled groups within a single FAQ section.

### 2. Field Structure
Each entry in the FAQ list is handled as a React object:
- **Title**: The section header (Visible for items created via "Add Title").
- **Subtitle**: Used as the individual Question.
- **Description**: Used as the detailed Answer.

---

## ⚙️ Recent Configuration Updates
- **Payload Stability**: The NestJS/Express payload limit has been increased to **50MB** in `main.ts`. This ensures that pages with a very large number of FAQ items or detailed legal text can be saved successfully without generic "Validation Errors."
- **Component Stability**: Refined the `FAQBuilder` hook logic to ensure smooth state management when navigating between different page types.

---

## ⚙️ Logic & Workflow in AdminJS

1.  **Dual-Button State**: The component manages an array of objects. New objects are flagged with `showTitle: true` if created via the "Add Title" button.
2.  **Conditional Field Rendering**: In the render loop, the `Title` input is displayed only if the item's `showTitle` flag is active (or if the page type is Regulamento).
3.  **Data Synchronization**: Every change is captured and synchronized with the database record via the `onChange` prop.
4.  **JSON Persistence**: The structure is serialized into a single JSON object, allowing for a mix of titled and untitled entries without database schema changes.
