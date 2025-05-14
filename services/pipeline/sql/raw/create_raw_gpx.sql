CREATE TABLE parsed_gpx_points (
    id SERIAL PRIMARY KEY,
    full_name TEXT NOT NULL,  -- e.g. "tour-de-france-2023-stage-1"
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    elevation DOUBLE PRECISION,          -- in meters
    time TIMESTAMPTZ,                    -- timestamp from GPX point
    distance DOUBLE PRECISION,           -- distance from previous point (in meters)
    elevation_diff DOUBLE PRECISION,     -- elevation gain/loss from previous point (in meters)
    cum_elevation DOUBLE PRECISION,      -- cumulative elevation gain (in meters)
    cum_distance DOUBLE PRECISION,       -- cumulative distance (in meters)
    inserted_at TIMESTAMPTZ DEFAULT NOW()
);
