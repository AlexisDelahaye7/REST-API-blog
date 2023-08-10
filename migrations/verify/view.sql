-- Verify oblog:view on pg

BEGIN;

SELECT * FROM "post_with_category" WHERE false;

ROLLBACK;
