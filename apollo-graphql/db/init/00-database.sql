\connect blag;

CREATE TABLE author (
    id SERIAL PRIMARY KEY,
    name TEXT,
    bio TEXT,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tsv tsvector
);
COMMENT ON TABLE author IS 'People.';

CREATE INDEX author_tsv ON author USING gin(tsv);

CREATE FUNCTION author_tsv_trigger() RETURNS trigger AS $$
begin
    new.tsv :=
      setweight(to_tsvector(coalesce(new.name, '')), 'A') ||
      setweight(to_tsvector(coalesce(new.bio, '')), 'B');
    return new;
end
$$ LANGUAGE plpgsql;

CREATE TRIGGER author_tsv_update BEFORE INSERT OR UPDATE
ON author FOR EACH ROW EXECUTE PROCEDURE author_tsv_trigger();

CREATE TABLE post (
    id SERIAL PRIMARY KEY,
    title TEXT,
    text TEXT,
    author_id INTEGER NOT NULL REFERENCES author(id),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tsv tsvector
);
COMMENT ON TABLE post IS 'Blag posts.';

CREATE INDEX post_tsv ON post USING gin(tsv);

CREATE FUNCTION post_tsv_trigger() RETURNS trigger AS $$
begin
    new.tsv :=
      setweight(to_tsvector(coalesce(new.title, '')), 'A') ||
      setweight(to_tsvector(coalesce(new.text, '')), 'B');
    return new;
end
$$ LANGUAGE plpgsql;

CREATE TRIGGER post_tsv_update BEFORE INSERT OR UPDATE
ON post FOR EACH ROW EXECUTE PROCEDURE post_tsv_trigger();
