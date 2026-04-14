# Image Search App

A responsive image search application built with JavaScript, Vite, and the
Pixabay API. Users can search for images by keyword, browse paginated results,
and view full-size images in a lightbox modal.

## Features

- Search images by keyword using the Pixabay API
- Paginated results — 15 images per request
- Load more button to fetch the next page of results
- Smooth scroll after each new batch of images
- Full-size image preview via SimpleLightbox modal
- Loading indicator during API requests
- End-of-collection notification when no more results are available
- Error notifications via iziToast

## Technologies

- JavaScript (ES6+, async/await, ES modules)
- Vite
- Axios
- SimpleLightbox
- iziToast
- Pixabay API

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```
