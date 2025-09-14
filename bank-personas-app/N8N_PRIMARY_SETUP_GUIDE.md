# N8N Primary Storage Setup Guide

## 🎯 **Architecture Overview**

**Frontend App** → **N8N** → **Database** → **Frontend App**

- ✅ **N8N**: Manages all message storage using Postgres Chat Memory
- ✅ **Frontend**: Reads messages from N8N storage
- ✅ **No duplicates**: Single source of truth
- ✅ **Consistent data**: Both systems use same data

## 📋 **Setup Steps**

### 1. **Update Supabase Database**

Run the new schema in your Supabase SQL Editor:

```sql
-- Copy and run the contents of supabase-schema-n8n-primary.sql
```

This creates:
- `chat_sessions` table (for tracking conversations)
- `n8n_chat_memory` table (for N8N to store messages)
- Proper indexes and RLS policies

### 2. **Configure N8N Postgres Chat Memory**

In your N8N workflow:

**Database Connection:**
```
Host: db.your-project-ref.supabase.co
Port: 6500 (pooled) or 5432 (direct)
Database: postgres
Username: postgres
Password: [your-database-password]
SSL: Enabled
```

**Postgres Chat Memory Settings:**
```
Table Name: n8n_chat_histories
Session ID Column: session_id
Message Column: message
```

### 3. **Update N8N Workflow**

Your N8N workflow should:

1. **Receive webhook** with:
   - `persona`: Persona type
   - `message`: User message
   - `chatSessionId`: Chat session ID
   - `userId`: User ID
   - `sessionId`: Same as chatSessionId
   - `userMessage`: Same as message
   - `personaId`: Persona ID

2. **Use Postgres Chat Memory** to:
   - Store user message
   - Retrieve chat history
   - Generate AI response
   - Store AI response

3. **Return response** to frontend

### 4. **Test the Integration**

1. **Start your app**: `npm run dev`
2. **Login** with test user
3. **Start a chat** with any persona
4. **Send a message** - should work without errors
5. **Check database** - messages should appear in `n8n_chat_histories` table

## 🔄 **Data Flow**

1. **User sends message** → Frontend
2. **Frontend calls N8N** → With message and session data
3. **N8N saves user message** → To `n8n_chat_memory` table
4. **N8N retrieves chat history** → From `n8n_chat_memory` table
5. **N8N generates AI response** → Using chat history as context
6. **N8N saves AI response** → To `n8n_chat_memory` table
7. **N8N returns response** → To frontend
8. **Frontend reloads messages** → From `n8n_chat_memory` table

## 📊 **Database Schema**

### `chat_sessions` table:
- `id` (UUID) - Primary key
- `user_id` (UUID) - References auth.users
- `persona_id` (TEXT) - Persona identifier
- `created_at` (TIMESTAMPTZ) - Creation timestamp
- `updated_at` (TIMESTAMPTZ) - Last update timestamp

### `n8n_chat_memory` table:
- `id` (UUID) - Primary key
- `session_id` (TEXT) - Maps to chat_sessions.id
- `user_id` (UUID) - References auth.users
- `persona_id` (TEXT) - Persona identifier
- `content` (TEXT) - Message content
- `role` (TEXT) - 'user' or 'assistant'
- `created_at` (TIMESTAMPTZ) - Creation timestamp
- `updated_at` (TIMESTAMPTZ) - Last update timestamp

## ✅ **Benefits**

- ✅ **No duplicates**: Single source of truth
- ✅ **Consistent data**: Both systems use same data
- ✅ **Simpler architecture**: N8N manages storage
- ✅ **Better performance**: No sync issues
- ✅ **Easier debugging**: One place to check data
- ✅ **N8N native**: Uses N8N's built-in memory system

## 🔍 **Verification**

After setup, verify:

1. **Database tables exist**:
   ```sql
   SELECT table_name FROM information_schema.tables 
   WHERE table_schema = 'public' 
   AND table_name IN ('chat_sessions', 'n8n_chat_memory');
   ```

2. **Messages are stored**:
   ```sql
   SELECT * FROM n8n_chat_memory ORDER BY created_at DESC LIMIT 5;
   ```

3. **Frontend reads messages**: Check browser network tab
4. **N8N workflow works**: Check N8N execution logs

## 🚨 **Troubleshooting**

### Common Issues:

1. **"relation n8n_chat_memory does not exist"**
   - Run the database schema script

2. **Messages not appearing**
   - Check N8N workflow execution
   - Verify database connection in N8N
   - Check RLS policies

3. **Frontend not loading messages**
   - Check browser console for errors
   - Verify Supabase connection
   - Check RLS policies

### Debug Queries:

```sql
-- Check if messages are being stored
SELECT COUNT(*) FROM n8n_chat_memory;

-- Check recent messages
SELECT session_id, content, role, created_at 
FROM n8n_chat_memory 
ORDER BY created_at DESC 
LIMIT 10;

-- Check RLS policies
SELECT * FROM pg_policies WHERE tablename = 'n8n_chat_memory';
```

## 🎉 **Success!**

Once everything is working:
- ✅ Messages are stored in `n8n_chat_memory` table
- ✅ Frontend displays messages correctly
- ✅ N8N has access to chat history
- ✅ No duplicate records
- ✅ Consistent data across systems

Your N8N primary storage setup is complete! 🚀
