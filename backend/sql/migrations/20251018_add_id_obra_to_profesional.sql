-- Migration: add id_obra_social column to profesional if missing
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name='profesional' AND column_name='id_obra_social'
  ) THEN
    ALTER TABLE profesional ADD COLUMN id_obra_social INT REFERENCES obra_social(id_obra_social);
  END IF;
END
$$;
