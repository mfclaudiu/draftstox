# DraftStox Setup Guide

This guide will walk you through setting up the DraftStox development environment from scratch.

## Prerequisites

- Node.js 18+ and npm
- Git
- Supabase account (free tier available)
- ConvertKit account (optional for email features)
- Alpha Vantage API key (optional for real market data)

## Step-by-Step Setup

### 1. Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd draft-stox

# Install dependencies
npm install
```

### 2. Environment Configuration

```bash
# Create environment file
cp .env.example .env
```

Edit `.env` with your actual values:

```env
# Required for email signup
VITE_CONVERTKIT_API_KEY=your_convertkit_api_key
VITE_CONVERTKIT_FORM_ID=your_convertkit_form_id

# Required for backend functionality
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key

# Optional - enables real market data (otherwise uses mock data)
VITE_ALPHA_VANTAGE_API_KEY=your_alpha_vantage_key

# Optional - enables analytics
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_PLAUSIBLE_DOMAIN=draftstox.com
```

### 3. Supabase Database Setup

#### Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Wait for database to initialize
4. Copy your project URL and anon key

#### Run Database Schema

1. Go to SQL Editor in Supabase dashboard
2. Copy the contents of `database/schema.sql`
3. Paste and run the SQL
4. Verify tables are created successfully

#### Configure Authentication (Optional)

1. Go to Authentication > Settings
2. Enable email authentication
3. Configure any social providers if desired
4. Set up redirect URLs for production

### 4. ConvertKit Setup (Optional)

#### Create ConvertKit Account

1. Sign up at [convertkit.com](https://convertkit.com)
2. Create a new form for email signups
3. Note the form ID from the form settings

#### Get API Credentials

1. Go to Account Settings > Advanced
2. Generate an API key
3. Add both API key and form ID to `.env`

### 5. Alpha Vantage Setup (Optional)

#### Get Free API Key

1. Sign up at [alphavantage.co](https://www.alphavantage.co)
2. Get your free API key (500 requests/day)
3. Add to `.env` file

**Note**: If no API key is provided, the app will use realistic mock data for development.

### 6. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Feature Testing

### Quiz Functionality
1. Navigate to quiz page
2. Complete all 5 questions
3. Verify archetype result displays correctly
4. Test social sharing buttons

### Email Signup
1. Enter email on landing page
2. Check ConvertKit dashboard for new subscriber
3. Verify success/error states work correctly

### Portfolio Features
1. Access dashboard at `/dashboard`
2. Search for stocks (AAPL, GOOGL, etc.)
3. Add positions to portfolio
4. Verify real-time price updates

### Gamification
1. Complete actions that award XP
2. Check achievement progress
3. Verify leaderboard display

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run type checking
npm run type-check

# Run linting
npm run lint

# Run tests (if configured)
npm run test
```

## File Structure

```
src/
├── components/          # Reusable React components
├── pages/              # Page components
├── contexts/           # React contexts
├── services/           # API and external service integrations
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
├── constants/          # Application constants
└── assets/             # Static assets

public/
├── robots.txt          # SEO crawler instructions
├── sitemap.xml         # SEO sitemap
└── favicon.ico         # Site favicon

database/
└── schema.sql          # Supabase database schema
```

## Environment-Specific Configuration

### Development
- Uses mock data when API keys are missing
- Detailed error logging
- Development-friendly defaults

### Production
- Requires all API keys
- Optimized builds
- Analytics tracking enabled
- Security headers configured

## Troubleshooting

### Common Issues

**Build Errors**
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Environment Variables Not Loading**
- Ensure `.env` file is in root directory
- Restart development server after changes
- Check variable names have `VITE_` prefix

**Supabase Connection Issues**
- Verify URL and keys in `.env`
- Check Supabase project is active
- Ensure database schema has been applied

**ConvertKit Not Working**
- Verify API key has correct permissions
- Check form ID is correct
- Test with a simple curl request first

## Production Deployment

### Netlify Deployment

1. Connect GitHub repository to Netlify
2. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Add environment variables in Netlify dashboard
4. Deploy and test

### Custom Domain Setup

1. Add custom domain in Netlify
2. Configure DNS records:
   ```
   A record: @ -> Netlify IP
   CNAME: www -> your-site.netlify.app
   ```
3. Enable HTTPS (automatic with Netlify)

### Environment Variables for Production

Ensure all required variables are set in your deployment platform:

```env
NODE_ENV=production
VITE_CONVERTKIT_API_KEY=your_production_key
VITE_SUPABASE_URL=your_production_url
VITE_SUPABASE_ANON_KEY=your_production_key
VITE_ALPHA_VANTAGE_API_KEY=your_api_key
VITE_GA_MEASUREMENT_ID=your_ga_id
```

## Security Considerations

### Development
- Never commit `.env` files
- Use different API keys for dev/prod
- Enable RLS policies in Supabase

### Production
- Use secure headers (configured in netlify.toml)
- Enable HTTPS everywhere
- Monitor API usage and implement rate limiting
- Regular security audits of dependencies

## Performance Optimization

### Bundle Analysis
```bash
npm run build
npx vite-bundle-analyzer dist
```

### Image Optimization
- Use WebP format where possible
- Implement lazy loading for images
- Optimize images before adding to assets

### API Optimization
- Implement caching for market data
- Use pagination for large datasets
- Minimize API calls with proper state management

## Getting Help

- Check existing GitHub issues
- Review documentation in `/docs`
- Contact support at hello@draftstox.com
- Join our developer Discord (link in main README)

## Next Steps

After completing setup:

1. Review the codebase structure
2. Test all major features
3. Customize branding and styling
4. Set up monitoring and analytics
5. Plan your deployment strategy

---

Happy coding! 🚀 