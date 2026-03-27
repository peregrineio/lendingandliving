-- Create leads table for storing contact form submissions
create table if not exists leads (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  first_name text not null,
  phone text not null,
  email text,
  best_time text,
  purpose text,
  message text,
  source_page text,
  language text default 'en',
  status text default 'new'
);

-- Enable Row Level Security
alter table leads enable row level security;

-- Policy: Service role can insert leads (for API routes)
create policy "Service role can insert leads"
  on leads
  for insert
  with check (true);

-- Policy: Service role can select leads (for admin dashboard)
create policy "Service role can select leads"
  on leads
  for select
  using (true);

-- Policy: Service role can update leads (for status changes)
create policy "Service role can update leads"
  on leads
  for update
  using (true);

-- Create index on created_at for efficient sorting
create index if not exists leads_created_at_idx on leads(created_at desc);

-- Create index on status for filtering
create index if not exists leads_status_idx on leads(status);

-- Comment on table
comment on table leads is 'Contact form submissions and lead information';
