# Messages Disappearing After 20-30 Seconds - Debug Guide

## 🚨 **Issue: Messages Disappear After 20-30 Seconds**

If your chat messages are disappearing after 20-30 seconds, this guide will help you identify and fix the issue.

## 🔍 **Potential Causes & Solutions**

### **Cause 1: useEffect Re-initialization**
**Problem:** The `useEffect` is re-running and clearing messages
**Solution:** Fixed by adding `chatId` check to prevent unnecessary re-initialization

### **Cause 2: Real-time Subscription Issues**
**Problem:** Supabase real-time subscriptions interfering with message display
**Solution:** Fixed subscription to point to correct table (`n8n_chat_memory`)

### **Cause 3: Database Query Issues**
**Problem:** Messages not being saved to database properly
**Solution:** Check database and N8N workflow

## 🛠️ **Debugging Steps**

### **Step 1: Check Browser Console**
1. **Open Developer Tools** (F12)
2. **Go to Console tab**
3. **Send a message and watch for logs:**
   - `Loading messages from database: X messages`
   - `Reloading messages after N8N response: X messages`

### **Step 2: Check Database**
```sql
-- Check if messages are being saved
SELECT COUNT(*) FROM n8n_chat_histories;

-- Check recent messages
SELECT session_id, content, role, created_at 
FROM n8n_chat_histories 
ORDER BY created_at DESC 
LIMIT 10;

-- Check specific chat session
SELECT * FROM n8n_chat_histories 
WHERE session_id = 'your-chat-session-id'
ORDER BY created_at ASC;
```

### **Step 3: Check N8N Workflow**
1. **Verify N8N is saving messages** to `n8n_chat_histories` table
2. **Check Postgres Chat Memory configuration**
3. **Verify database connection** in N8N

### **Step 4: Check Component Re-mounting**
1. **Look for component re-mounting** in React DevTools
2. **Check if parent components** are causing re-renders
3. **Verify useEffect dependencies** are stable

## 🔧 **Fixes Applied**

### **Fix 1: Prevent Unnecessary Re-initialization**
```typescript
// Before: useEffect ran every time user or persona changed
useEffect(() => {
  initializeChat();
}, [user, persona.id]);

// After: Only initialize if no chatId exists
useEffect(() => {
  if (!chatId) {
    initializeChat();
  }
}, [user, persona.id, chatId]);
```

### **Fix 2: Correct Real-time Subscription**
```typescript
// Before: Pointing to wrong table
table: 'chat_messages',
filter: `chat_id=eq.${chatId}`,

// After: Pointing to correct table
table: 'n8n_chat_memory',
filter: `session_id=eq.${chatId}`,
```

### **Fix 3: Added Debug Logging**
```typescript
console.log('Loading messages from database:', uiMessages.length, 'messages');
console.log('Reloading messages after N8N response:', uiMessages.length, 'messages');
```

## 🎯 **Testing Steps**

1. **Send a test message**
2. **Wait 30 seconds** - messages should still be there
3. **Check console logs** - should show message counts
4. **Check database** - messages should be saved
5. **Refresh page** - messages should reload

## 🚨 **If Issue Persists**

### **Check These:**

1. **Database RLS Policies:**
   ```sql
   SELECT * FROM pg_policies WHERE tablename = 'n8n_chat_histories';
   ```

2. **Supabase Real-time:**
   - Check if real-time is enabled for `n8n_chat_histories` table
   - Verify publication includes the table

3. **N8N Workflow:**
   - Check if N8N is actually saving messages
   - Verify Postgres Chat Memory configuration
   - Check N8N execution logs

4. **Browser Issues:**
   - Check for JavaScript errors
   - Verify network requests are successful
   - Check if component is unmounting

### **Additional Debugging:**

Add this to your component to track state changes:
```typescript
useEffect(() => {
  console.log('Messages state changed:', messages.length, 'messages');
}, [messages]);

useEffect(() => {
  console.log('ChatId changed:', chatId);
}, [chatId]);
```

## 🎉 **Expected Behavior After Fix**

- ✅ Messages load when chat starts
- ✅ Messages persist after 30+ seconds
- ✅ New messages appear immediately
- ✅ Messages reload correctly after page refresh
- ✅ No unnecessary re-initialization

The fixes should resolve the disappearing messages issue! 🚀
