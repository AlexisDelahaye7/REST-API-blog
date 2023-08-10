-- Deploy oblog:schema to pg

BEGIN;


CREATE TABLE "category" (
  "id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "label" text NOT NULL UNIQUE,
  "route" text NOT NULL UNIQUE,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz
);

CREATE TABLE "post" (
  "id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "slug" text NOT NULL UNIQUE,
  "title" text NOT NULL UNIQUE,
  "excerpt" text,
  "content" text,
  "category_id" integer NOT NULL REFERENCES "category"("id"),
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz
);

COMMIT;
