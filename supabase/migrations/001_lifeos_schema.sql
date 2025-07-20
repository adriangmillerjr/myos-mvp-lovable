
-- LifeOS.ai Database Schema
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users profiles table with comprehensive data structure
CREATE TABLE user_profiles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  profile_version TEXT DEFAULT '1.2',
  user_name TEXT NOT NULL,
  role TEXT,
  industry TEXT,
  bio TEXT,
  tone TEXT,
  non_negotiable_values JSONB,
  prime_directive TEXT,
  skill_accelerator_mode BOOLEAN DEFAULT true,
  auto_template_behavior TEXT,
  mount_everest JSONB,
  inner_boardroom JSONB,
  default_state_map JSONB,
  behavioral_profile JSONB,
  business_partner JSONB,
  guides JSONB,
  onboarding_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects table (replacing current "folders" concept)
CREATE TABLE projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#6366F1',
  context_visibility TEXT DEFAULT 'shared',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tasks table with CPS scoring and Everest alignment
CREATE TABLE tasks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  cps_score INTEGER CHECK (cps_score >= 1 AND cps_score <= 10),
  everest_alignment INTEGER CHECK (everest_alignment >= 1 AND everest_alignment <= 10),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'blocked', 'delegated')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  due_date TIMESTAMP WITH TIME ZONE,
  delegated_to TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Journals table with markdown support and timestamps
CREATE TABLE journal_entries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  title TEXT,
  content TEXT NOT NULL,
  entry_date DATE DEFAULT CURRENT_DATE,
  tags TEXT[],
  related_tasks UUID[],
  energy_level INTEGER CHECK (energy_level >= 1 AND energy_level <= 10),
  focus_level INTEGER CHECK (focus_level >= 1 AND focus_level <= 10),
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chats/messages table for conversation persistence
CREATE TABLE chat_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  agent_id TEXT,
  active_agents JSONB,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Agent settings table for user preferences
CREATE TABLE agent_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  agent_name TEXT NOT NULL,
  is_enabled BOOLEAN DEFAULT true,
  settings JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, project_id, agent_name)
);

-- KPI tracking table
CREATE TABLE kpi_metrics (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  metric_name TEXT NOT NULL,
  target_value NUMERIC,
  actual_value NUMERIC,
  period_type TEXT CHECK (period_type IN ('daily', 'weekly', 'monthly')),
  period_date DATE DEFAULT CURRENT_DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE kpi_metrics ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can manage their own profile" ON user_profiles
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own projects" ON projects
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own tasks" ON tasks
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own journal entries" ON journal_entries
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own chat messages" ON chat_messages
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own agent settings" ON agent_settings
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own KPI metrics" ON kpi_metrics
  FOR ALL USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_project_id ON tasks(project_id);
CREATE INDEX idx_journal_entries_user_id ON journal_entries(user_id);
CREATE INDEX idx_journal_entries_date ON journal_entries(entry_date);
CREATE INDEX idx_chat_messages_user_id ON chat_messages(user_id);
CREATE INDEX idx_chat_messages_project_id ON chat_messages(project_id);
CREATE INDEX idx_agent_settings_user_project ON agent_settings(user_id, project_id);
CREATE INDEX idx_kpi_metrics_user_period ON kpi_metrics(user_id, period_date);
