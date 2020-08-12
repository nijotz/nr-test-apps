\connect blag;

CREATE TABLE author (
    id SERIAL PRIMARY KEY,
    name TEXT,
    bio TEXT,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
COMMENT ON TABLE author IS 'People.';

CREATE TABLE post (
    id SERIAL PRIMARY KEY,
    title TEXT,
    text TEXT,
    author_id INTEGER NOT NULL REFERENCES author(id),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
COMMENT ON TABLE post IS 'Blag posts.';
