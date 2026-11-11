-- Stored generated columns are not populated in a BEFORE trigger's NEW row.
-- Compare the editorial input columns, excluding the generated search vector.
create or replace function public.set_sermon_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
    if (to_jsonb(new) - 'view_count' - 'updated_at' - 'search_vector')
        is distinct from (to_jsonb(old) - 'view_count' - 'updated_at' - 'search_vector') then
        new.updated_at = now();
    else
        new.updated_at = old.updated_at;
    end if;
    return new;
end;
$$;
