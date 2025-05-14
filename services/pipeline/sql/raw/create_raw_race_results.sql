CREATE TABLE raw_race_results (
    id SERIAL PRIMARY KEY,
    full_name TEXT NOT NULL UNIQUE,  -- e.g. "Abu Dhabi Tour 2018 Stage 5"
    race_name TEXT NOT NULL,         -- e.g. "Abu Dhabi Tour"
    year INT NOT NULL,               -- e.g. 2018
    type TEXT NOT NULL CHECK (type IN ('one_day', 'stage')), -- standardized
    stage_num INT,                   -- NULL for one-day races
    race_data JSONB NOT NULL,        -- the full JSON
    inserted_at TIMESTAMPTZ DEFAULT NOW()
);