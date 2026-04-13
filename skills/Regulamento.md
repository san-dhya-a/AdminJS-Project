# Technical Documentation: Regulamento Implementation

This document describes the technical implementation of the **Regulamento** (Rules & Regulations) module within the AdminJS dashboard.

---

## 🚀 Purpose
The Regulamento module is designed for managing structured legal texts, terms of service, or rules. Unlike the FAQ, it requires a repeating structure where each entry is its own distinct section with a dedicated header.

---

## 🛠 Technologies Used
- **Backend Framework**: NestJS
- **Admin Interface**: AdminJS (Core)
- **UI Components**: `@adminjs/design-system` (Box, Input, TextArea)
- **Database Engine**: TypeORM (Type: `json` for flexible content storage)
- **Frontend Engine**: React

---

## 🎨 Implementation & Behavior

### 1. Dynamic Section Logic
The Regulamento functionality leverages the dual-mode `FAQBuilder.tsx` component, which switches its logic based on the `pageType` database field.

*   **The (+) Icon Behavior**:
    *   **Consistent Blocks**: Every time the `+` icon is clicked, the system adds a new block containing both a **Title** and a **Description**.
    *   **Multi-Section Support**: There is no limit to the number of sections. Each click generates a fresh, independent block of fields.
*   **Repeated Headers**: In this mode, the "Shared Title" logic is disabled. Every section maintains its own title to represent different articles or clauses of the regulation.

---

## ⚙️ Recent Configuration Updates
- **Payload Stability**: The NestJS/Express payload limit has been increased to **50MB** in `main.ts`. This ensures that pages with a very large number of FAQ items or detailed legal text can be saved successfully without generic "Validation Errors."
- **Component Stability**: Refined the `FAQBuilder` hook logic to ensure smooth state management when navigating between different page types.

---

## ⚙️ Logic & Workflow in AdminJS

1.  **Reactive Form Visibility**: The standard top-level fields in the `Page` resource are hidden when `regulamento` is selected. This ensures that only the dynamic builder is used for data entry.
2.  **Mapping**: The `content` property in `page.resource.ts` is explicitly mapped to the custom builder component.
3.  **Data Persistence**: 
    *   Each section is stored as an object within a JSON array.
    *   The structure is managed reactively, meaning deleting a section or updating text immediately updates the JSON payload that will be sent to the NestJS backend.
4.  **Schema-less Flexibility**: By using a JSON column via TypeORM, the regulation can grow to any number of sections without requiring database migrations or additional tables.
