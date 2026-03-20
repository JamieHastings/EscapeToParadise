/*
  # Create deals table for admin-managed travel deals

  1. New Tables
    - `deals`
      - `id` (uuid, primary key) - Unique identifier for each deal
      - `name` (text) - Display name of the deal (e.g., "Miami Beach Getaway")
      - `type` (text) - Type of deal: Flight, Package, Cruise, or Hotel
      - `destination` (text) - Destination name
      - `route` (text) - Route description (e.g., "Kingston → Miami")
      - `price_per_person` (numeric) - Price in USD per person
      - `travel_start_date` (date) - Start date of travel period
      - `travel_end_date` (date) - End date of travel period
      - `image_url` (text) - URL to deal image
      - `description` (text, nullable) - Detailed description for packages
      - `includes` (jsonb, nullable) - Array of included items for packages
      - `duration` (text, nullable) - Duration description (e.g., "7 nights / 8 days")
      - `group_size` (text, nullable) - Group size description
      - `accommodation` (text, nullable) - Accommodation details
      - `meals` (text, nullable) - Meals included description
      - `highlights` (jsonb, nullable) - Array of package highlights
      - `is_active` (boolean) - Whether deal is currently active/visible
      - `created_at` (timestamptz) - When deal was created
      - `updated_at` (timestamptz) - When deal was last updated

  2. Security
    - Enable RLS on `deals` table
    - Add policy for public read access to active deals
    - Add policy for authenticated admin users to manage all deals
*/

CREATE TABLE IF NOT EXISTS deals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('Flights', 'Packages', 'Cruises', 'Hotels')),
  destination text NOT NULL,
  route text NOT NULL,
  price_per_person numeric NOT NULL CHECK (price_per_person > 0),
  travel_start_date date NOT NULL,
  travel_end_date date NOT NULL,
  image_url text NOT NULL,
  description text,
  includes jsonb,
  duration text,
  group_size text,
  accommodation text,
  meals text,
  highlights jsonb,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CHECK (travel_end_date >= travel_start_date)
);

-- Enable RLS
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;

-- Public users can view active deals
CREATE POLICY "Public can view active deals"
  ON deals
  FOR SELECT
  USING (is_active = true);

-- Authenticated users can view all deals (for admin dashboard)
CREATE POLICY "Authenticated users can view all deals"
  ON deals
  FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated users can insert deals
CREATE POLICY "Authenticated users can insert deals"
  ON deals
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authenticated users can update deals
CREATE POLICY "Authenticated users can update deals"
  ON deals
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated users can delete deals
CREATE POLICY "Authenticated users can delete deals"
  ON deals
  FOR DELETE
  TO authenticated
  USING (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_deals_type ON deals(type);
CREATE INDEX IF NOT EXISTS idx_deals_active ON deals(is_active);
CREATE INDEX IF NOT EXISTS idx_deals_dates ON deals(travel_start_date, travel_end_date);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_deals_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_deals_updated_at_trigger ON deals;
CREATE TRIGGER update_deals_updated_at_trigger
  BEFORE UPDATE ON deals
  FOR EACH ROW
  EXECUTE FUNCTION update_deals_updated_at();