-- Deploy oblog:types to pg

BEGIN;

CREATE DOMAIN slug AS TEXT
  CHECK(
    VALUE ~ '^[a-z0-9][a-z0-9-]+[a-z0-9]*$'
  )
;

ALTER TABLE "post"
  ALTER COLUMN "slug" TYPE slug;

ALTER TABLE "category"
  ADD CONSTRAINT route_check CHECK (route ~ '^\/[a-z\/]*[a-z]*$');

COMMIT;
