# HealthBridge - Base Mini App

Navigate healthcare with confidence and ease. A Farcaster Frame-based mini-app that helps low-income families find and access appropriate medical care and benefits.

## Features

### 🔍 Insured Provider Finder
- Search for doctors and specialists who accept specific low-income insurance plans
- View provider ratings, reviews, and availability
- Filter by specialty, insurance type, and location
- Get contact information and directions

### 🛡️ Benefits Eligibility Checker
- Discover additional healthcare benefits you may qualify for
- Get personalized recommendations based on your situation
- Learn about prescription assistance, transportation vouchers, and more
- Receive guidance on application processes

### 📅 Appointment & Navigation Assistant
- AI-powered chat assistant for healthcare navigation
- Get help with appointment scheduling
- Find transportation assistance options
- Receive reminders and preparation tips

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (via OnchainKit)
- **Styling**: Tailwind CSS with custom design system
- **AI**: OpenAI/OpenRouter integration
- **Type Safety**: TypeScript throughout
- **Farcaster**: MiniKit integration for Frame functionality

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OnchainKit API key
- OpenAI/OpenRouter API key (optional, for AI features)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd healthbridge-base-miniapp
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your API keys:
```env
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key_here
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Main application page
│   ├── providers.tsx      # MiniKit and other providers
│   ├── globals.css        # Global styles and design system
│   ├── loading.tsx        # Loading UI
│   └── error.tsx          # Error boundary
├── components/            # Reusable UI components
│   ├── AppShell.tsx       # Main app container
│   ├── ProviderCard.tsx   # Provider display component
│   ├── BenefitAlert.tsx   # Benefit information component
│   ├── AgentChat.tsx      # AI chat interface
│   └── LoadingSpinner.tsx # Loading states
├── lib/                   # Utilities and types
│   ├── types.ts           # TypeScript type definitions
│   ├── utils.ts           # Utility functions
│   └── openai.ts          # AI integration
└── public/                # Static assets
```

## Design System

### Colors
- **Primary**: `hsl(210, 80%, 50%)` - Blue for trust and reliability
- **Accent**: `hsl(160, 70%, 40%)` - Green for success and health
- **Background**: `hsl(220, 15%, 95%)` - Light neutral
- **Surface**: `hsl(220, 15%, 100%)` - Pure white

### Components
- **Glass Cards**: Translucent containers with backdrop blur
- **Gradient Buttons**: Primary actions with purple-to-blue gradients
- **Input Fields**: Consistent form styling with focus states
- **Provider Cards**: Horizontal layout with ratings and insurance info
- **Benefit Alerts**: Color-coded benefit information with CTAs

### Typography
- **Display**: `text-2xl font-semibold` for headings
- **Body**: `text-base leading-6` for content
- **Small**: `text-sm` for secondary information

## API Integration

### Mock Data
The app currently uses mock data for demonstration purposes:
- Provider search returns sample healthcare providers
- Benefit checks show example assistance programs
- All data is generated locally for MVP functionality

### Future Integrations
- Healthcare provider directories (e.g., NPI Registry)
- Insurance plan databases
- Government benefit APIs
- Real-time appointment scheduling

## Business Model

**Micro-transactions**: Pay-per-lookup pricing model
- Provider searches: Small fee per search
- Benefit assistance: Fee per detailed analysis
- Premium features: Monthly subscription for unlimited access

This model makes healthcare navigation accessible to low-income families while providing sustainable revenue.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please contact the HealthBridge team or open an issue in the repository.

---

**HealthBridge** - Making healthcare navigation accessible for everyone.
