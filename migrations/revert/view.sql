-- Revert oblog:view from pg

BEGIN;

DROP VIEW "post_with_category";

COMMIT;
