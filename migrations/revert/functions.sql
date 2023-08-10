-- Revert oblog:functions from pg

BEGIN;

DROP FUNCTION create_post;
DROP FUNCTION update_post;

COMMIT;
