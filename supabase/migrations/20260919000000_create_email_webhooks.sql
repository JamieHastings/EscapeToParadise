-- Enable pg_net for making HTTP calls from the database
create extension if not exists pg_net schema extensions;

-- Shared trigger function that calls the send-inquiry-email edge function
create or replace function public.notify_send_inquiry_email()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  perform net.http_post(
    url     := 'https://esqgajdjofytoqaaobsl.supabase.co/functions/v1/send-inquiry-email',
    headers := jsonb_build_object(
      'Content-Type',  'application/json',
      'Authorization', 'Bearer REPLACE_WITH_WEBHOOK_SECRET'
    ),
    body    := jsonb_build_object(
      'type',   TG_OP,
      'table',  TG_TABLE_NAME,
      'record', row_to_json(NEW)
    )
  );
  return NEW;
end;
$$;

-- Trigger on flight_requests
create trigger notify_flight_request
  after insert on public.flight_requests
  for each row execute function public.notify_send_inquiry_email();

-- Trigger on trip_requests
create trigger notify_trip_request
  after insert on public.trip_requests
  for each row execute function public.notify_send_inquiry_email();

-- Trigger on contact_submissions
create trigger notify_contact_submission
  after insert on public.contact_submissions
  for each row execute function public.notify_send_inquiry_email();
