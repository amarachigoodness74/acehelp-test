# Content Explorer Dashboard

This is a **Content Explorer Dashboard** built using **React, TypeScript, TailwindCSS, and Framer Motion**. It allows users to explore blog posts, todos, albums and users: search for specific data by name or title, and dynamically load more content as they scroll. It is a demo project that integrates demo data for https://jsonplaceholder.typicode.com API.

## Features

- **List of Blog Posts** – Displays a lazyloaded grid of blog posts.
- **Search Functionality** – Users can search.
- **Infinite Scrolling** – Automatically loads more data when scrolled to the bottom.
- **Infinite Scrolling** – Paginated table to view more data.
- **Like Feature** – Allows users to like posts (UI only for now).
- **Responsive Design** – Works across all screen sizes.
- **Smooth Animations** – Uses Framer Motion for interactions.

## 🛠️ Tech Stack

- **Frontend**: React.js, TypeScript, TailwindCSS, Framer Motion
- **State Management**: useState, useMemo, useCallback
- **Routing**: React Router
- **Data Fetching**: Custom Hook like (`usePosts`) and React Query

## Folder Structure

```
📦 blog-project
├── 📂 src
│   ├── 📂 components      # Reusable UI components
│   ├── 📂 pages           # Page components (Blog, PostDetail, etc.)
│   ├── 📂 types           # TypeScript types and interfaces
│   ├── App.tsx           # Main application file
│   ├── main.tsx         # Entry point
│   ├── utils.ts         # Utility functions (hooks, API calls, etc.)
│
├── 📄 README.md          # Documentation
├── 📄 package.json       # Dependencies & scripts
```

## Getting Started

### 1️. Clone the Repository

```sh
git clone https://github.com/amarachigoodness74/acehelp-test.git
cd acehelp-test
```

### 2️. Install Dependencies

```sh
yarn install
# or
npm install
```

### 3. Start the Development Server

```sh
yarn dev
# or
npm run dev
```

The app will be available at: **`http://localhost:5173`**

## Usage

1. Browse the latest blogs, todos, albums and list of users.
2. Use the search bar to find content by title or name.
3. Scroll down to load more posts dynamically.
4. Click **Read More** to view full blog content.
5. Click the **Heart (Like)** button to interact.

## Accessibility Features

- `aria-labels` for interactive elements.
- Keyboard navigation (`Enter` & `Space` support).
- `aria-live` announcements for dynamic content.

## Live Link

https://acehelp-test.vercel.app

## License

This project is **MIT Licensed**. See `LICENSE` for details.
