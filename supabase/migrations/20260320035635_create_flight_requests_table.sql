/*
  # Create Flight Requests System

  ## Summary
  This migration creates the flight request system for the travel agency application, 
  replacing the generic trip planning system with a specific flight request workflow.

  ## 1. New Tables
    - `flight_requests`
      - `id` (uuid, primary key) - Unique identifier for each request
      - `name` (text) - Customer full name
      - `email` (text) - Customer email address
      - `phone` (text) - Customer phone number
      - `from_city` (text) - Departure city or airport
      - `to_city` (text) - Destination city or airport
      - `departure_date` (date) - Requested departure date
      - `return_date` (date, nullable) - Requested return date (null for one-way)
      - `budget` (numeric, nullable) - Customer budget
      - `travelers` (integer) - Number of travelers
      - `preferred_time` (text, nullable) - Preferred flight time (Morning/Afternoon/Evening)
      - `notes` (text, nullable) - Additional customer notes
      - `status` (text) - Request status (pending/contacted/completed/cancelled)
      - `admin_notes` (text, nullable) - Internal notes for travel agent use
      - `created_at` (timestamptz) - Timestamp of request creation
      - `updated_at` (timestamptz) - Timestamp of last update

  ## 2. Security
    - Enable RLS on `flight_requests` table
    - Add policy for public users to insert their own requests
    - Add policy for authenticated admins to read all requests
    - Add policy for authenticated admins to update all requests
    - Add policy for authenticated admins to delete requests

  ## 3. Important Notes
    - Status defaults to 'pending' for new requests
    - Budget is optional to accommodate flexible budgets
    - Return date is optional to support one-way flights
    - Admin notes are separate from customer notes for internal tracking
*/

-- Create flight_requests table
CREATE TABLE IF NOT EXISTS flight_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  from_city text NOT NULL,
  to_city text NOT NULL,
  departure_date date NOT NULL,
  return_date date,
  budget numeric,
  travelers integer NOT NULL DEFAULT 1,
  preferred_time text,
  notes text,
  status text NOT NULL DEFAULT 'pending',
  admin_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE flight_requests ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert flight requests (public form submission)
CREATE POLICY "Anyone can submit flight requests"
  ON flight_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Allow authenticated admins to read all requests
CREATE POLICY "Admins can view all flight requests"
  ON flight_requests
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Allow authenticated admins to update all requests
CREATE POLICY "Admins can update flight requests"
  ON flight_requests
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Allow authenticated admins to delete requests
CREATE POLICY "Admins can delete flight requests"
  ON flight_requests
  FOR DELETE
  TO authenticated
  USING (true);

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger to automatically update updated_at timestamp
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_flight_requests_updated_at'
  ) THEN
    CREATE TRIGGER update_flight_requests_updated_at
      BEFORE UPDATE ON flight_requests
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;