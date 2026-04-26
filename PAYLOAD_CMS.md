# Payload CMS Implementation Documentation

This document provides a comprehensive overview of how Payload CMS is integrated into the Asklyze Landing project, including its models, sections, and the technical architecture for fetching and rendering content.

## Overview

Payload CMS serves as the headless content management system for this project. It is integrated directly into the Next.js application using the `@payloadcms/next` package, sharing the same database and server environment.

---

## Models

In Payload, models are divided into **Collections** (multiple entries, e.g., Blog Posts) and **Globals** (single entries, e.g., Hero Section Content).

### 1. Collections

Located in `src/collections/`.

- **Users**: Manages admin access to the CMS dashboard.
- **Posts**: Manages blog content.
  - **Fields**: Title, Slug, Author (group), Category (select), Published Date, Featured Image, Excerpt, and Rich Text Content.
  - **Localization**: Implemented via separate fields (e.g., `titleAr`, `contentAr`) to ensure full control over RTL layout requirements.

### 2. Globals (Sections)

Located in `src/globals/`. Each global typically represents a specific section on the landing page.

| Global Slug               | Purpose                                      | Component            |
| :------------------------ | :------------------------------------------- | :------------------- |
| `navbar-content`          | Links, logo, and CTA in the header           | `Navbar.tsx`         |
| `hero-content`            | Main headline, subheadline, and primary CTAs | `Hero.tsx`           |
| `feature-grid-content`    | Grid of product features and benefits        | `FeatureGrid.tsx`    |
| `working-process-content` | Steps or "How it works" section              | `WorkingProcess.tsx` |
| `trusted-by-content`      | Logos of companies using the product         | `TrustedSection.tsx` |
| `pricing-content`         | Subscription plans and feature lists         | `Pricing.tsx`        |
| `faq-content`             | Frequently Asked Questions                   | `FAQ.tsx`            |
| `contact-us-content`      | Contact form labels and contact info         | `ContactUs.tsx`      |
| `footer-content`          | Site map, social links, and legal info       | `Footer.tsx`         |
| ... and more              | (About, Security, Privacy, Terms, etc.)      | Corresponding pages  |

---

## Technical Integration

The integration is designed for high performance and seamless internationalization.

### 1. Unified Data Fetching (`get-dictionary.ts`)

Instead of fetching content in every component, we use a centralized loader: `src/get-dictionary.ts`.

- **`fetchDictionary(locale)`**: Uses the Payload Local API (`payload.findGlobal`) to fetch all layout and section content in parallel using `Promise.all`.
- **Normalization**: It transforms complex Payload structures (like arrays of objects for feature lists) into a clean format that React components can consume easily.
- **Fallback**: If the database is unavailable or Payload fails, it falls back to local JSON files (`src/dictionaries/en.json` or `ar.json`).

### 2. Caching & Performance

To avoid hitting the database on every request:

- **`unstable_cache`**: The dictionary fetch is wrapped in Next.js caching, tagged with `['dictionary']`.
- **On-Demand Revalidation**: Every global has a `revalidateHook` attached to it. When a user saves changes in the Payload Admin panel, `revalidateTag('dictionary')` is called, purging the cache across the entire site instantly.

### 3. Internationalization (i18n)

The project supports **English (en)** and **Arabic (ar)**.

- **Payload Localization**: Configured in `payload.config.ts`.
- **RTL Support**: The frontend components receive the `lang` prop and adjust layouts accordingly (using Tailwind's `rtl:` prefixes or logical properties).

---

## How to Add a New Section

To add a new editable section to the site, follow these steps:

1. **Define the Global**: Create a new file in `src/globals/` (e.g., `TestimonialsContent.ts`). Define the fields (text, images, arrays).
2. **Register Global**: Add the new config to the `globals` array in `src/payload.config.ts`.
3. **Update Types**: Run `pnpm run generate:types` to update `payload-types.ts`.
4. **Update Loader**:
   - Add the new global slug to the `fetchDictionary` function in `src/get-dictionary.ts`.
   - Add it to the `Promise.all` call and the returned object.
5. **Create Component**: Build the React component in `src/components/`. It should accept a `dict` prop containing the data from your new global.
6. **Integrate in Page**: Import the component in `src/app/[lang]/page.tsx` and pass the data from `dict.yourNewSection`.

---

## Environment Variables

The following variables are required for Payload CMS:

- `DATABASE_URI`: Connection string for PostgreSQL.
- `PAYLOAD_SECRET`: A secure random string for session encryption.
- `NEXT_PUBLIC_SERVER_URL`: The base URL of the application.
