-- Create templates table
create table public.templates (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  type text not null, -- e.g., 'valentine-day', 'birthday', etc.
  slug text, -- unique slug for public access if needed, or just use id
  data jsonb not null, -- Stores the form data
  is_paid boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.templates enable row level security;

-- Create policies
create policy "Users can view their own templates"
  on public.templates for select
  using (auth.uid() = user_id);

create policy "Users can insert their own templates"
  on public.templates for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own templates"
  on public.templates for update
  using (auth.uid() = user_id);

create policy "Users can delete their own templates"
  on public.templates for delete
  using (auth.uid() = user_id);

-- Public access policy (for viewing shared templates)
create policy "Public can view paid templates"
  on public.templates for select
  using (is_paid = true);
