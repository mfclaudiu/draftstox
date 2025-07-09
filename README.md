# DraftStox - Learn Investing Through Play

A gamified investment education platform that teaches investing through fantasy-league-style portfolio building. Build virtual portfolios, discover your investor archetype, and compete with friends risk-free.

## 🚀 Features

### Core MVP Features
- **Investment Archetype Quiz**: 5-question personality assessment with 4 distinct investor types
- **Virtual Portfolio Building**: Search, buy, and sell real stocks with virtual money
- **Gamification System**: XP, levels, badges, and achievement tracking
- **Real-time Market Data**: Live stock prices and performance tracking
- **Social Leaderboard**: Compete with other users on portfolio performance
- **Email Integration**: Waitlist signup with ConvertKit integration

### Investor Archetypes
1. **The Steady Builder** (Conservative) - Focus on stable, dividend-paying investments
2. **The Strategic Player** (Balanced) - Mix of growth and value investing
3. **The Growth Hunter** (Aggressive) - High-growth potential investments
4. **The Risk Taker** (Speculative) - High-risk, high-reward strategies

### Gamification Elements
- **XP System**: Earn experience points for various actions
- **7 User Levels**: From "Rookie Investor" to "Investment Legend"
- **Badge System**: 8 different badges with varying rarity levels
- **Daily Engagement**: Login streaks and daily challenges
- **Portfolio Milestones**: Achievement tracking for portfolio performance

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **React Hook Form** + Zod for form validation
- **Zustand** for state management
- **Recharts** for data visualization

### Backend & Services
- **Supabase** for database and authentication
- **ConvertKit** for email marketing
- **Alpha Vantage** API for market data (with Yahoo Finance fallback)
- **Google Analytics** + Plausible for analytics

### Deployment
- **Netlify** for hosting and CI/CD
- **Custom domain**: draftstox.com

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd draft-stox
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your environment variables:
   - ConvertKit API key and form ID
   - Supabase URL and anonymous key
   - Alpha Vantage API key (optional)
   - Analytics tracking IDs

4. **Database Setup**
   - Create a new Supabase project
   - Run the SQL schema from `database/schema.sql`
   - Configure Row Level Security (RLS) policies

5. **Start Development Server**
   ```bash
   npm run dev
   ```

## 🔧 Configuration

### Required Environment Variables

```env
# Email Integration
VITE_CONVERTKIT_API_KEY=your_api_key
VITE_CONVERTKIT_FORM_ID=your_form_id

# Database
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key

# Market Data (optional - has mock fallback)
VITE_ALPHA_VANTAGE_API_KEY=your_api_key

# Analytics (optional)
VITE_GA_MEASUREMENT_ID=your_ga_id
VITE_PLAUSIBLE_DOMAIN=your_domain
```

### Supabase Setup

1. Create a new Supabase project
2. Run the SQL schema from `database/schema.sql`
3. Enable Row Level Security on all tables
4. Configure authentication providers if needed

### ConvertKit Setup

1. Create a ConvertKit account
2. Create a form for email signups
3. Get your API key from account settings
4. Add the form ID and API key to environment variables

## 🚀 Deployment

### Netlify Deployment

1. **Connect Repository**
   - Link your GitHub repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `dist`

2. **Environment Variables**
   - Add all required environment variables in Netlify dashboard
   - Ensure `NODE_ENV=production`

3. **Custom Domain**
   - Configure custom domain (draftstox.com)
   - Enable HTTPS
   - Set up DNS records

4. **Deploy**
   ```bash
   npm run build
   # Netlify will automatically deploy on git push
   ```

## 📱 User Flow

1. **Landing Page**: Hero section, how-it-works, quiz teaser
2. **Archetype Quiz**: 5-question assessment with branching logic
3. **Results Display**: Detailed archetype with sharing options
4. **Email Signup**: Waitlist registration with validation
5. **Dashboard Access**: Portfolio management and gamification features

## 🎮 Gamification System

### XP Rewards
- Quiz completion: 100 XP
- Portfolio creation: 50 XP
- First trade: 75 XP
- Daily login: 10 XP
- Portfolio milestones: 100-500 XP

### Badge Categories
- **Common**: First Quiz, Portfolio Builder, First Trade
- **Uncommon**: Week Streak, Diversified Portfolio
- **Rare**: High Roller, Quiz Master
- **Legendary**: Market Guru

### Level Benefits
Each level unlocks new features and capabilities:
- Level 1: Basic portfolio features
- Level 2: Advanced charts and insights
- Level 3: Leaderboard access and social features
- Level 4+: Premium features and exclusive content

## 🔒 Security & Privacy

- **GDPR Compliance**: Comprehensive privacy policy
- **Data Protection**: Row Level Security (RLS) in Supabase
- **Secure Headers**: Content Security Policy and security headers
- **Environment Variables**: Sensitive data stored securely
- **Terms of Service**: Full legal coverage for platform use

## 📊 Analytics & Tracking

- **User Engagement**: Quiz completion rates, portfolio creation
- **Performance Metrics**: Page load times, user retention
- **Feature Usage**: Most popular stocks, archetype distribution
- **Privacy-Focused**: Compliant with privacy regulations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙋‍♂️ Support

- **Email**: hello@draftstox.com
- **Documentation**: Check the `/docs` folder for detailed guides
- **Issues**: Use GitHub Issues for bug reports and feature requests

## 🔮 Future Roadmap

### Phase 2 Features
- **Social Features**: Friend connections, portfolio sharing
- **Advanced Analytics**: Detailed performance metrics and insights
- **Educational Content**: Investment tutorials and market analysis
- **Mobile App**: React Native mobile application
- **Real Money Integration**: Brokerage API connections (with proper licenses)

### Phase 3 Features
- **AI Recommendations**: Personalized investment suggestions
- **Advanced Gamification**: Tournaments, seasonal challenges
- **Community Features**: Forums, mentorship programs
- **Enterprise Features**: Educational institution partnerships

---

**Built with ❤️ for financial education and investor empowerment** 