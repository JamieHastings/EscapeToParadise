/*
  # Travel Agent Website Database Schema

  ## Overview
  Creates tables for storing trip planning requests, contact form submissions, and newsletter subscriptions.

  ## New Tables
  
  ### 1. `trip_requests`
  Stores customer trip planning requests from the "Plan My Trip" form
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Customer's full name
  - `email` (text) - Customer's email address
  - `phone` (text) - Customer's phone number
  - `destination` (text) - Desired travel destination
  - `travel_start_date` (date) - Trip start date
  - `travel_end_date` (date) - Trip end date
  - `number_of_travelers` (integer) - Number of people traveling
  - `budget` (text) - Customer's budget range
  - `trip_type` (text) - Type of trip (Honeymoon, Cruise, Family, Business, Vacation)
  - `additional_notes` (text) - Additional customer requests or notes
  - `status` (text) - Request status (new, contacted, quoted, booked, cancelled)
  - `created_at` (timestamptz) - Timestamp when request was submitted
  
  ### 2. `contact_submissions`
  Stores general contact form inquiries
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Customer's name
  - `email` (text) - Customer's email
  - `phone` (text, optional) - Customer's phone number
  - `message` (text) - Contact message
  - `created_at` (timestamptz) - Submission timestamp

  ### 3. `newsletter_subscribers`
  Stores email addresses for travel deals newsletter
  - `id` (uuid, primary key) - Unique identifier
  - `email` (text, unique) - Subscriber's email
  - `subscribed_at` (timestamptz) - Subscription timestamp
  - `is_active` (boolean) - Subscription status

  ## Security
  - Enable Row Level Security (RLS) on all tables
  - Allow public INSERT access for lead capture (visitors can submit forms)
  - Restrict SELECT, UPDATE, DELETE to authenticated admin users only
  - This ensures visitors can submit requests but cannot view others' data
*/

-- Create trip_requests table
CREATE TABLE IF NOT EXISTS trip_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  destination text NOT NULL,
  travel_start_date date,
  travel_end_date date,
  number_of_travelers integer DEFAULT 1,
  budget text,
  trip_type text NOT NULL,
  additional_notes text,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  subscribed_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT true
);

-- Enable Row Level Security
ALTER TABLE trip_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Policies for trip_requests
-- Allow anyone to submit trip requests (public INSERT)
CREATE POLICY "Anyone can submit trip requests"
  ON trip_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only authenticated users can view trip requests
CREATE POLICY "Authenticated users can view trip requests"
  ON trip_requests
  FOR SELECT
  TO authenticated
  USING (true);

-- Only authenticated users can update trip requests
CREATE POLICY "Authenticated users can update trip requests"
  ON trip_requests
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policies for contact_submissions
-- Allow anyone to submit contact forms (public INSERT)
CREATE POLICY "Anyone can submit contact forms"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only authenticated users can view contact submissions
CREATE POLICY "Authenticated users can view contact submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Policies for newsletter_subscribers
-- Allow anyone to subscribe (public INSERT)
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscribers
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only authenticated users can view subscribers
CREATE POLICY "Authenticated users can view subscribers"
  ON newsletter_subscribers
  FOR SELECT
  TO authenticated
  USING (true);

-- Only authenticated users can update subscription status
CREATE POLICY "Authenticated users can update subscription status"
  ON newsletter_subscribers
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);