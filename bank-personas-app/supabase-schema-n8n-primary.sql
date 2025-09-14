-- Supabase Schema for N8N Primary Storage
-- This schema is optimized for N8N Postgres Chat Memory as the primary storage

-- Step 1: Create chat_sessions table (for tracking conversations)
CREATE TABLE IF NOT EXISTS public.chat_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  persona_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Step 2: Create n8n_chat_histories table (N8N will manage this)
-- This table follows N8N's expected schema for Postgres Chat Memory
-- N8N Postgres Chat Memory only uses: id, session_id, message
CREATE TABLE IF NOT EXISTS public.n8n_chat_histories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,                    -- Maps to chat_sessions.id
  message TEXT NOT NULL                        -- The message content (N8N uses 'message' not 'content')
);

-- Step 3: Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_chat_sessions_user_id ON public.chat_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_persona_id ON public.chat_sessions(persona_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_created_at ON public.chat_sessions(created_at);

CREATE INDEX IF NOT EXISTS idx_n8n_chat_histories_session_id ON public.n8n_chat_histories(session_id);

-- Step 4: Enable Row Level Security (RLS)
ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.n8n_chat_histories ENABLE ROW LEVEL SECURITY;

-- Step 5: Create RLS policies for chat_sessions
CREATE POLICY "Users can view their own chat sessions"
  ON public.chat_sessions
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own chat sessions"
  ON public.chat_sessions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own chat sessions"
  ON public.chat_sessions
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own chat sessions"
  ON public.chat_sessions
  FOR DELETE
  USING (auth.uid() = user_id);

-- Step 6: Create RLS policies for n8n_chat_histories
-- Note: Since n8n_chat_histories doesn't have user_id, we'll use session_id to match with chat_sessions
CREATE POLICY "Users can view their own chat messages"
  ON public.n8n_chat_histories
  FOR SELECT
  USING (session_id IN (
    SELECT id::TEXT FROM public.chat_sessions WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can create their own chat messages"
  ON public.n8n_chat_histories
  FOR INSERT
  WITH CHECK (session_id IN (
    SELECT id::TEXT FROM public.chat_sessions WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can update their own chat messages"
  ON public.n8n_chat_histories
  FOR UPDATE
  USING (session_id IN (
    SELECT id::TEXT FROM public.chat_sessions WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can delete their own chat messages"
  ON public.n8n_chat_histories
  FOR DELETE
  USING (session_id IN (
    SELECT id::TEXT FROM public.chat_sessions WHERE user_id = auth.uid()
  ));

-- Step 7: Enable realtime for n8n_chat_histories table
ALTER PUBLICATION supabase_realtime ADD TABLE public.n8n_chat_histories;

-- Step 8: Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Step 9: Create triggers to automatically update updated_at
CREATE TRIGGER update_chat_sessions_updated_at
  BEFORE UPDATE ON public.chat_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Note: n8n_chat_histories doesn't have updated_at column, so no trigger needed

-- Step 10: Create a view for easy message retrieval
-- Note: This view provides a simplified interface to n8n_chat_histories
CREATE OR REPLACE VIEW public.chat_messages_view AS
SELECT 
  m.id,
  m.session_id as chat_id,
  s.user_id,
  s.persona_id,
  m.message as content,
  'assistant' as role,  -- N8N doesn't store role, assume all are assistant responses
  now() as created_at,  -- N8N doesn't store timestamps, use current time
  s.persona_id as session_persona_id
FROM public.n8n_chat_histories m
JOIN public.chat_sessions s ON m.session_id = s.id::TEXT
ORDER BY m.id ASC;

-- Step 11: Grant permissions for the view
GRANT SELECT ON public.chat_messages_view TO authenticated;

-- Step 12: Verify tables were created
SELECT 
  table_name, 
  column_name, 
  data_type 
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name IN ('chat_sessions', 'n8n_chat_histories')
ORDER BY table_name, ordinal_position;
