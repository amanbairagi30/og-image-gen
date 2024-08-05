# Dynamic Post Page with OG Image Generation
#### Frontend URL : https://og-image-gen-bay.vercel.app/
#### Backend URL : https://og-backend-start.onrender.com

## Overview

This project demonstrates how to create a static post page using React.js that dynamically generates Open Graph (og:image) images based on the post content. The solution consists of a frontend built with React.js, Tailwind CSS for styling, and Shadcn as the components library. The backend, implemented with Express, Puppeteer, and Multer, handles the dynamic image generation.

## Features

- **Dynamic OG Image Generation**: Generate Open Graph images based on the content of the post.
- **Static Post Page**: Render a static page with dynamic image content.
- **Responsive Design**: Styled using Tailwind CSS for a responsive and modern look.
- **Component Library**: Utilize Shadcn for reusable components and consistent design.

## Frontend

### Technologies Used

- **React.js**: Frontend framework for building the user interface.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Shadcn**: Component library for UI elements.

### Setup


   ```bash
   git clone https://github.com/amanbairagi30/og-image-gen.git
   cd og-image-gen
   npm install
   npm run dev
```


## Backend (https://github.com/amanbairagi30/og-backend)

### Technologies Used

- **Express**: Web framework for Node.js.
- **Puppeteer**: Library for controlling headless Chrome to generate images.
- **Multer**: Middleware for handling file uploads

### Setup
   ```bash
   git clone https://github.com/amanbairagi30/og-backend.git
   cd og-backend
   npm install
   npm run dev
```

## API Endpoints

#### Generate OG Image

- **URL**: `/generate-og-image`
- **Method**: `POST`
- **Request Body**:
```json
{
 "title": "Post Title",
 "description": "Post Description",
 "imageUrl": "https://example.com/image.png"
}
```

#### Response

```json
{
  "ogImageUrl": "https://your-backend-url/og-images/generated-image.png"
}
```