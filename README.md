# Chat AI

A Vue 3 + Vite + Pinia + Express + Stream Chat + OpenAI chat application.

## Features

- User registration with name and email (Stream Chat + custom fields)
- Chat with AI (OpenAI GPT-4)
- Chat history stored and loaded from backend
- Pinia for state management
- Tailwind CSS for styling

## Setup

### Backend

1. **Install dependencies:**

   ```bash
   cd chat-ai-api
   npm install
   ```

2. **Environment variables:**  
   Create a `.env` file with your keys:

   ```
   STREAM_API_KEY=your_stream_api_key
   STREAM_API_SECRET=your_stream_api_secret
   OPENAI_API_KEY=your_openai_api_key
   ```

3. **Run the server:**
   ```bash
   npm run dev
   ```

### Frontend

1. **Install dependencies:**

   ```bash
   cd chat-ai-ui
   npm install
   ```

2. **Environment variables:**  
   Create a `.env` file:

   ```
   VITE_API_URL=http://localhost:YOUR_BACKEND_PORT
   ```

3. **Favicon:**  
   Place your `favicon.ico` in the `public` directory:  
   `chat-ai-ui/public/favicon.ico`

4. **Run the app:**
   ```bash
   npm run dev
   ```

## Notes

- User registration now requires both name and email. Email is used as a custom field in Stream Chat.
- Chat history is loaded using Pinia’s `chat` store (`src/stores/chat.ts`).
- Make sure your backend and frontend `.env` files are set up correctly.
- If you see errors about missing assets (like `vue.svg`), add them to `src/assets/` or update the references in your components.

## Project Structure

```
chat-ai-api/      # Express backend
chat-ai-ui/       # Vue 3 frontend
  ├─ public/      # Static assets (favicon.ico, etc.)
  ├─ src/
      ├─ stores/  # Pinia stores (chat.ts, user.ts)
      ├─ assets/  # Images and icons
```

## Troubleshooting

- **Favicon not showing:**  
  Make sure `favicon.ico` is in the `public` folder and referenced as `<link rel="icon" href="/favicon.ico" />` in `index.html`.
- **Missing assets:**  
  Add any missing files (like `vue.svg`) to `src/assets/` or update your code to use existing assets.
- **TypeScript errors with custom fields:**  
  Custom fields (like `email`) are allowed in Stream Chat, but you may need to use `as any` in your backend code.

---
