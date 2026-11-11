-- Reading a sermon must not change its editorial modification date.
-- Use a table-specific trigger so other tables keep their existing behavior.
create or replace function public.set_sermon_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
    if (to_jsonb(new) - 'view_count' - 'updated_at')
        is distinct from (to_jsonb(old) - 'view_count' - 'updated_at') then
        new.updated_at = now();
    else
        new.updated_at = old.updated_at;
    end if;
    return new;
end;
$$;

drop trigger if exists sermons_set_updated_at on public.sermons;
create trigger sermons_set_updated_at
    before update on public.sermons
    for each row execute function public.set_sermon_updated_at();
