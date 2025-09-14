# Supabase Setup Instructions

This document explains how to set up Supabase for the Bank Personas App with authentication and chat history storage.

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Create a new project
3. Choose a region close to your users
4. Set a strong database password
5. Wait for the project to be provisioned

## 2. Get Supabase Credentials

1. In your Supabase dashboard, go to **Settings** > **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **anon public** key (starts with `eyJ...`)

## 3. Set Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   VITE_API_ENDPOINT=https://ivan-m.app.n8n.cloud/webhook/56ccfe3e-feb3-4712-a9e3-b25be1d7b87a
   ```

## 4. Set Up Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy the contents of `supabase-schema.sql`
3. Paste and run the SQL to create the necessary tables and policies

## 5. Create Users

Since you mentioned you'll create users manually:

1. Go to **Authentication** > **Users** in your Supabase dashboard
2. Click **Add user**
3. Enter email and password for each user
4. Users will be able to log in with these credentials

## 6. Test the Application

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Navigate to `http://localhost:5173`
4. Try logging in with one of the users you created

## Database Schema

The application uses two main tables:

### `chat_sessions`
- Stores chat sessions between users and personas
- Links to `auth.users` for user identification
- Tracks creation and last update times

### `chat_messages`
- Stores individual messages in chat sessions
- Links to both `chat_sessions` and `auth.users`
- Includes message content, sender type (user/bot), and timestamp

## Security Features

- **Row Level Security (RLS)** is enabled on all tables
- Users can only access their own chat sessions and messages
- All database operations are authenticated through Supabase Auth
- Real-time updates are enabled for chat messages

## Troubleshooting

### Common Issues

1. **"Missing Supabase environment variables"**
   - Make sure your `.env` file exists and has the correct variable names
   - Restart your development server after adding environment variables

2. **Authentication errors**
   - Verify the user exists in your Supabase dashboard
   - Check that the email/password combination is correct

3. **Database permission errors**
   - Make sure you've run the SQL schema file
   - Check that RLS policies are properly set up

4. **Real-time not working**
   - Ensure the `supabase_realtime` publication includes the `chat_messages` table
   - Check your Supabase project's real-time settings

### Getting Help

- Check the [Supabase Documentation](https://supabase.com/docs)
- Review the browser console for error messages
- Check the Supabase dashboard logs for server-side errors
