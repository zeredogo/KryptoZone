-- ==========================================
-- KRYPTOZONE V2.0 DATABASE SCHEMA SETUP
-- Run this in your Supabase SQL Editor
-- ==========================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables if they exist
DROP TABLE IF EXISTS public.intel_feeds;
DROP TABLE IF EXISTS public.market_oracle;
DROP TABLE IF EXISTS public.projects;
DROP TABLE IF EXISTS public.profiles;

-- 1. Profiles Table
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    credentials TEXT NOT NULL,
    expertise TEXT NOT NULL,
    avatar_url TEXT NOT NULL,
    bio TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Projects Table
CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    status TEXT NOT NULL CHECK (status IN ('Mainnet', 'Staging', 'Beta', 'Development', 'Testnet')),
    version TEXT DEFAULT 'v1.0.0' NOT NULL,
    specs JSONB NOT NULL DEFAULT '[]'::jsonb, -- e.g., [{"lang": "Solidity", "pct": 75}, {"lang": "React", "pct": 25}]
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Market Oracle Table
CREATE TABLE public.market_oracle (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    symbol TEXT NOT NULL UNIQUE,
    price NUMERIC NOT NULL,
    change_pct NUMERIC NOT NULL,
    height_pct INTEGER NOT NULL CHECK (height_pct BETWEEN 0 AND 100),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Intel Feeds Table
CREATE TABLE public.intel_feeds (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    feed_type TEXT NOT NULL CHECK (feed_type IN ('chain', 'neural')),
    category TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS (Row Level Security) on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_oracle ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.intel_feeds ENABLE ROW LEVEL SECURITY;

-- Create Policies for Profiles
CREATE POLICY "Allow public select for profiles" 
    ON public.profiles FOR SELECT 
    USING (true);

CREATE POLICY "Allow admin edit for profiles" 
    ON public.profiles FOR ALL 
    TO authenticated
    USING (true);

-- Create Policies for Projects
CREATE POLICY "Allow public select for projects" 
    ON public.projects FOR SELECT 
    USING (true);

CREATE POLICY "Allow admin edit for projects" 
    ON public.projects FOR ALL 
    TO authenticated
    USING (true);

-- Create Policies for Market Oracle
CREATE POLICY "Allow public select for market_oracle" 
    ON public.market_oracle FOR SELECT 
    USING (true);

CREATE POLICY "Allow admin edit for market_oracle" 
    ON public.market_oracle FOR ALL 
    TO authenticated
    USING (true);

-- Create Policies for Intel Feeds
CREATE POLICY "Allow public select for intel_feeds" 
    ON public.intel_feeds FOR SELECT 
    USING (true);

CREATE POLICY "Allow admin edit for intel_feeds" 
    ON public.intel_feeds FOR ALL 
    TO authenticated
    USING (true);

-- ==========================================
-- SEED INITIAL DATA (Matches the Stitch mockup)
-- ==========================================

-- Seed Profile
INSERT INTO public.profiles (name, role, credentials, expertise, avatar_url, bio)
VALUES (
    'Paul Sunday Dogo', 
    'CORE ARCHITECT', 
    'B.Sc. Biz Mgmt', 
    'Blockchain Tech', 
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCm8KDSvtmq65BKRG64kus0JQ1JkRwUlG6S8anrRe0pwtmW3HZTGGApAPZkgdKUkU5BjvC71hGYTaddxuyT7QZeV9GmkQeQjVLy0YH0KeNMysfgrAiEWMWALUIpJHUAbrGPUkBbALwh3v2Ih_lfSdJY5_bMrtBKx7S_kXMjjaCEYKa5_bpZzFRFwuAKy21TJxmn9XG9f1cv9RquD7KDpyuggbAofKVW9MTg6Yf4YlzmmQm05tEyRAX1HKaIZTqoTuOP9fv4ooQ4puU', 
    'Former Instructor. Transitioning theoretical logic into scalable decentralized ecosystems.'
);

-- Seed Projects
INSERT INTO public.projects (title, description, image_url, status, version, specs)
VALUES 
(
    'Nexus Protocol',
    'Technical blueprints and production-ready modules recently exited from the KryptoZone forge.',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCiaBjDabVYgjAsQeDyHr-7a3EeBWDa-oSndToOBGkLbvqfUO8qAA91h_4VTatlDJfqcVbQsRdtJRW9yGTAA9GKEoS399-snvW7mpu-vy2-UqSGdSpOWIgWJpzuQAOYIa6xeTZ1w9TmA3F9fmO46HJQFQdgLsYw1dMbIAsUtYbQXzY0BCm8WCrfORk_CZft6sVOxrd2Sr7OOH3a4FvdXPtVlTj9hID_NE0u0LiNdiei-R_Q6r3jDdF1kchn26UCWtcNKKps9c_iklg',
    'Mainnet',
    'v2.1.0',
    '[{"lang": "SOLIDITY", "pct": 75}, {"lang": "REACT", "pct": 25}]'::jsonb
),
(
    'Aeon Oracle',
    'Technical blueprints and production-ready modules recently exited from the KryptoZone forge.',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCF35Lq8AdROdO9K8XsCL8En-d8Rw048ipyFKvmcvTnugo3Bb0b-AgQ6-LD0N8gC8xD4_vvBv-HEz8nah5W_HzqMugQ9iAgPBGDr0_mK20VIs6ZqfdHRVgamNKfnUhIYVurrg8voWTSLr1bE38biaHHZ5Vp21Cz1db-chrj6oENDnN2MIKHKhX1UIHD6a-FsvYAoWwkKGI0PGp7QyCrq0Hv5aEYcAQnlSnD2tD5srsnnebx5R-OXRZ3fCQxuGUGhWpUANZ8ylv2W0E',
    'Mainnet',
    'v1.0.4',
    '[{"lang": "RUST", "pct": 90}, {"lang": "GO", "pct": 10}]'::jsonb
),
(
    'Neural Bridge',
    'Technical blueprints and production-ready modules recently exited from the KryptoZone forge.',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCKP12iUlmJQdKCuxqZo-kvaU2zkXtmFNqrl8qRhScTkO4xjlA_Xe1RA0vi3K_cekNAytA5azVpORo0qsb4bTYTguOff8lf89yQrpim8k8QcFLItqAmjBRDlzCfNUDnHeti8hiTl2ZrBHSxXdPgXiy6h5iEPDk9Y9BkJCe5QXA4twdbfG5UPUJTZ7m1eqTg9dzMKwWrB2fhtOxcx7RE0Nl1PLtLvibhvZCLHTOdZhJ_o31Rz6oF5qzQahsa9SsYr9sHix4RwC39TvE',
    'Mainnet',
    'v1.1.2',
    '[{"lang": "PYTHON", "pct": 60}, {"lang": "PYTORCH", "pct": 40}]'::jsonb
),
(
    'Void DEX',
    'Technical blueprints and production-ready modules recently exited from the KryptoZone forge.',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC5U_jaS1VSGRxyL2uaZZmojry17SJsVSmX37FfljOv-HznDYUlwmtLcX4XDu1gxh3k8c2Dk9JZHb-GUfxQ9quniRU5QQkqPidX4ru5_e8d96MxcsQefIhy92Jt3j-5gSNEo0L3IGhPESkGsqafNJF9Y59_8DHHNl0ww_cYHC685Q6blq6RQ-XQmuVequ70IllW-dEDd-VFDHbCaLWFYthR3Kl-F9gf7qTf4NwAYWOttDn-lem3XlFEdG0lltPBJ4vIJGo9-Z_bTEU',
    'Testnet',
    'v0.8.0',
    '[{"lang": "TYPESCRIPT", "pct": 50}, {"lang": "VYPER", "pct": 50}]'::jsonb
);

-- Seed Market Oracle
INSERT INTO public.market_oracle (symbol, price, change_pct, height_pct)
VALUES 
    ('BTC', 64312.00, 2.4, 100),
    ('ETH', 3450.00, 1.8, 85),
    ('SOL', 142.10, 5.2, 60),
    ('BNB', 580.40, -0.4, 55),
    ('XRP', 0.62, 0.2, 40);

-- Seed Intel Feeds
INSERT INTO public.intel_feeds (feed_type, category, title, content)
VALUES 
    ('chain', 'SECURITY_ALERT', 'Protocol Vulnerability Detected in Layer-2 Bridges', 'Critical vulnerability patch released for cross-chain liquidity providers.'),
    ('chain', 'ECOSYSTEM_GROWTH', 'Web3 Privacy Layer Reaches Mainnet Milestone', 'Zero-knowledge proofs integration completes final audit phase.'),
    ('neural', 'AI_MODEL_UPDATE', 'GPT-5 Training Setups leaked in Research Paper', 'Deep-dive into the architectural changes for the next-gen LLMs.'),
    ('neural', 'CHIP_WARS', 'The Shift to On-Device Neural Processing', 'Edge computing becomes the priority for silicon manufacturers in 2024.');
