-- Deploy oblog:functions to pg

BEGIN;

CREATE FUNCTION create_post(json) RETURNS post AS $$

      INSERT INTO "post"
      (
            "slug",
            "title",
            "excerpt",
            "content",
            "category_id"
      )
      VALUES
      (
            $1->>'slug',
            $1->>'title',
            $1->>'excerpt',
            $1->>'content',
            ($1->>'category_id')::int
      ) RETURNING *

$$ language SQL STRICT;

CREATE FUNCTION update_post(int, json) RETURNS post AS $$

      UPDATE "post" SET
          "slug" = coalesce($2->>'slug',"slug"),
          "title" = coalesce($2->>'title',"title"),
          "excerpt" = coalesce($2->>'excerpt',"excerpt"),
          "content" = coalesce($2->>'content',"content"),
          "category_id" = coalesce(($2->>'category_id')::int,"category_id"),
          "updated_at" = now()
      WHERE "id" = $1
      RETURNING *

$$ language SQL STRICT;

COMMIT;
