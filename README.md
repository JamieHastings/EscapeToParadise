# Escape to Paradise - Modern Travel Agent Website

A professional, responsive travel agent website built with React, TypeScript, and TailwindCSS. This website promotes Escape to Paradise travel agent services affiliated with InteleTravel, captures leads, and helps users search for flights.

**Brand Colors:** Orange sunset gradient with teal ocean waves - inspired by the company logo.

## Features

- **Home Page**: Hero section, popular destinations, travel deals, testimonials, and benefits
- **Flight Search**: Clean search interface that redirects to InteleTravel booking portal
- **Plan My Trip**: Comprehensive form for trip planning requests (saved to Supabase database)
- **Travel Deals**: Filterable deals showcase with category filters
- **Contact Page**: Contact form, business information, and WhatsApp integration
- **Responsive Design**: Mobile-first design that works on all devices
- **Database Integration**: Uses Supabase for storing trip requests and contact submissions

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TailwindCSS** - Styling
- **React Router** - Client-side routing
- **Supabase** - Backend database
- **Lucide React** - Icons

## Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (free tier works)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

The `.env` file should already contain your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Database Setup

The database tables are automatically created via Supabase migrations:

- `trip_requests` - Stores trip planning requests
- `contact_submissions` - Stores contact form messages
- `newsletter_subscribers` - Stores newsletter subscriptions

Row Level Security (RLS) is enabled to allow public form submissions while restricting data access to authenticated admins.

### 4. Customize Business Information

Update the following files with your actual business details:

**Contact Information** (`src/pages/Contact.tsx`):
- WhatsApp number: `whatsappNumber` variable
- Business email: `businessEmail` variable
- Business phone: `businessPhone` variable

**Footer** (`src/components/Footer.tsx`):
- Business name
- Contact email
- Phone number
- Social media links

**InteleTravel Portal URL** (`src/pages/SearchFlights.tsx`):
- Replace placeholder URL with your actual InteleTravel booking portal link

### 5. Run Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

## Building for Production

```bash
npm run build
```

The production files will be in the `dist/` directory.

## Deployment

This site can be deployed to:

- **Cloudflare Pages**
- **Vercel**
- **Netlify**
- Any static hosting provider

### Deploy to Cloudflare Pages

1. Push your code to GitHub
2. Connect your repository to Cloudflare Pages
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add environment variables in Cloudflare Pages dashboard

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts
4. Add environment variables in Vercel dashboard

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── DestinationCard.tsx
│   ├── DealCard.tsx
│   ├── TestimonialCard.tsx
│   └── IconFeature.tsx
├── pages/            # Page components
│   ├── Home.tsx
│   ├── SearchFlights.tsx
│   ├── PlanTrip.tsx
│   ├── Deals.tsx
│   └── Contact.tsx
├── lib/              # Utilities and configs
│   └── supabase.ts
├── App.tsx           # Main app with routing
└── main.tsx          # Entry point
```

## Customization Guide

### Change Color Scheme

The site uses blue and cyan gradients. To change colors, update Tailwind classes:

Current: `from-blue-500 to-cyan-500`
Example alternatives:
- Ocean: `from-blue-600 to-teal-500`
- Sunset: `from-orange-500 to-pink-500`
- Forest: `from-green-600 to-emerald-500`

### Add More Destinations

Edit `src/pages/Home.tsx` and update the `destinations` array with new destinations and images.

### Add More Travel Deals

Edit `src/pages/Deals.tsx` and update the `deals` array with new offers.

### Modify Forms

Forms are in:
- `src/pages/PlanTrip.tsx` - Trip planning form
- `src/pages/Contact.tsx` - Contact form

## Database Access

To view submitted requests:

1. Log into Supabase dashboard
2. Navigate to Table Editor
3. View `trip_requests` and `contact_submissions` tables

You can also set up email notifications using Supabase Edge Functions.

## Support

For issues or questions, contact the development team or refer to the documentation:

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Supabase Documentation](https://supabase.com/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

## License

This project is proprietary and confidential.
