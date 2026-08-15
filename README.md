# Jamachi Mauricennadi – Developer Portfolio

A modern, responsive portfolio website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. This multi-page portfolio showcases professional development services, projects, and provides a seamless way for clients to get in touch.

## 🌟 Features

### 📱 **Multi-Page Architecture**

- **Home** - Hero section with animated elements, milestone timeline, and standup updates
- **About** - Personal story, skills, and interactive hobby tags
- **Projects** - Portfolio showcase with detailed project information
- **Services** - Comprehensive service offerings with pricing, subscription plans, and development process
- **Contact** - Professional contact form, appointment booking, and email notifications

### 🎨 **Design & User Experience**

- **Light/Dark Theme Toggle** - Seamless theme switching with system preference detection
- Responsive design optimized for all devices
- **3D Animations** - Enhanced 3D effects, floating animations, and parallax backgrounds
- Smooth animations and micro-interactions using Framer Motion
- Modern gradient designs with emerald and sky color scheme
- Interactive elements with hover states and transitions
- Professional typography using Inter and Calistoga fonts
- **Redesigned Hero Section** - Modern layout with profile image, social links, and statistics

### 🤖 **AI Integration**

- **AI Chat Assistant** - Powered by Gemini AI for intelligent conversations
- **Appointment Scheduling** - AI-powered booking system with automated confirmations
- **Payment Processing** - AI-integrated Bachs.io payment gateway with multi-currency support
- **Email & Reminder System** - Automated email notifications and reminders
- **Voice Integration** - Speech synthesis for AI responses (Speechify.ai ready)
- **AI Avatar** - Animated visual representation with speaking/thinking states

### � **Payment System**

- **Bachs.io Integration** - Secure payment processing
- **Multi-Currency Support** - NGN and USD pricing options
- **Subscription Plans** - Monthly and yearly plans with 20% yearly discount
- **Real-time Payment Processing** - Instant payment verification and confirmation

### � **Contact System**

- Working contact form with validation
- **Appointment Booking** - Interactive scheduling with available time slots
- Dual email system (notification + confirmation emails)
- Professional HTML email templates
- SMTP configuration for reliable email delivery
- Real-time form submission feedback
- **Automated Reminders** - Appointment and payment reminder system

### � **Milestone & Standup Features**

- **Milestone Timeline** - Visual journey through career achievements
- **Standup Updates** - Daily progress updates and activity tracking
- **Statistics Dashboard** - Real-time project and task metrics
- **Activity Tracking** - Monitor daily tasks and project progress

### 🔍 **SEO Optimization**

- **Robots.txt** - Search engine crawling configuration
- **Sitemap.xml** - Dynamic sitemap generation for all pages
- **LLMs.txt** - AI-readable documentation for LLM indexing
- **Meta Tags** - Enhanced OpenGraph and metadata for social sharing
- **Structured Data** - SEO-friendly page structure

### � **Technical Features**

- Built with Next.js 14 and TypeScript
- Tailwind CSS for styling with custom animations
- SVG icon system with gradient fills
- Optimized images and assets
- SEO-friendly metadata and structure
- **AgentRouter Integration** - Advanced AI routing and processing
- **Environment Configuration** - Secure API key management

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd jamachi-mauricennadi-portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Configure environment variables**

   ```bash
   cp .env.local.example .env.local
   ```

   Update the `.env.local` file with your SMTP configuration (see Configuration section below).

4. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## ⚙️ Configuration

### Email Setup (SMTP)

The contact form uses SMTP for sending emails. Configure your email service in `.env.local`:

```env
# SMTP Configuration
SMTP_HOST=your-smtp-host.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@domain.com
SMTP_PASSWORD=your-email-password
EMAIL_FROM=your-email@domain.com
EMAIL_TO=jamachimauricennadi0@gmail.com
```

### AI Integration Setup

Configure AI services in `.env.local`:

```env
# AI Agent Configuration
GEMINI_API_KEY=your_gemini_api_key_here
AGENTROUTER_API_KEY=your_agentrouter_api_key_here
SPEECHIFY_API_KEY=your_speechify_api_key_here
```

### Payment System Setup

Configure Bachs.io payment gateway in `.env.local`:

```env
# Bachs.io Payment Configuration
BACHS_SECRET_KEY=your_bachs_secret_key_here
BACHS_API_URL=https://api.bachs.io
```

#### Popular SMTP Providers

**Gmail:**

- Host: `smtp.gmail.com`
- Port: `587`
- Secure: `false`
- Use App Password (not regular password)

**Outlook/Hotmail:**

- Host: `smtp-mail.outlook.com`
- Port: `587`
- Secure: `false`

**SendGrid:**

- Host: `smtp.sendgrid.net`
- Port: `587`
- User: `apikey`
- Password: Your SendGrid API key

**Mailgun:**

- Host: `smtp.mailgun.org`
- Port: `587`
- User: Your Mailgun SMTP username
- Password: Your Mailgun SMTP password

### Contact Information

Update your contact details in:

- `src/app/contact/page.tsx` - Contact page display
- `src/app/api/contact/route.ts` - Email templates
- `src/sections/Footer.tsx` - Footer links

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── api/               # API endpoints
│   │   ├── ai-chat/       # AI chat assistant endpoint
│   │   ├── appointments/  # Appointment booking endpoint
│   │   ├── contact/       # Contact form API endpoint
│   │   ├── payment/       # Payment processing endpoint
│   │   ├── subscription/  # Subscription processing endpoint
│   │   └── verify/        # Transaction verification endpoint
│   ├── contact/           # Contact page with appointment booking
│   ├── projects/          # Projects page
│   ├── services/          # Services page with subscription plans
│   ├── globals.css        # Global styles with 3D animations
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Home page
│   └── sitemap.ts         # Dynamic sitemap generation
├── components/            # Reusable components
│   ├── AIChat.tsx         # AI chat assistant with avatar
│   ├── AIAvatar.tsx       # Animated AI avatar component
│   ├── AppointmentBooking.tsx # Interactive appointment booking
│   ├── Card.tsx          # Card component with grain texture
│   ├── CardHeader.tsx    # Card header with star icon
│   ├── ClientHeader.tsx  # Client-side navigation with theme toggle
│   ├── HeroOrbit.tsx     # Animated orbit elements
│   ├── Milestones.tsx    # Career milestone timeline
│   ├── SectionHeader.tsx # Section title component
│   ├── Standup.tsx       # Daily standup updates component
│   ├── TechIcon.tsx      # Technology icon with gradient
│   ├── ThemeProvider.tsx # Light/dark theme provider
│   └── ToolboxItems.tsx  # Animated toolbox items
├── lib/                   # Utility libraries
│   ├── ai-agent.ts       # AI agent integration (Gemini/AgentRouter)
│   ├── appointments.ts   # Appointment scheduling logic
│   ├── bachs.ts          # Bachs.io payment integration
│   └── reminders.ts      # Email and reminder system
├── sections/              # Page sections
│   ├── About.tsx         # About section with interactive elements
│   ├── Contact.tsx       # Contact CTA section
│   ├── Footer.tsx        # Footer with social links
│   ├── Header.tsx        # Navigation header
│   ├── Hero.tsx          # Redesigned hero section with 3D effects
│   ├── Projects.tsx      # Projects showcase
│   ├── Tape.tsx          # Animated tape section
│   └── Testimonials.tsx  # Client testimonials
└── assets/               # Static assets
    ├── icons/            # SVG icons
    └── images/           # Images and graphics
public/                    # Public assets
    ├── robots.txt        # Search engine configuration
    └── llms.txt          # AI-readable documentation
```

## 🎨 Customization

### Colors

The design uses a custom color scheme defined in Tailwind CSS:

- Primary: Emerald (green) tones
- Secondary: Sky (blue) tones
- Background: Dark gray with transparency

### Fonts

- **Sans-serif**: Inter (body text)
- **Serif**: Calistoga (headings)

### Animations

Custom animations defined in `tailwind.config.ts`:

- `ping-large` - Large ping animation for availability indicator
- `move-left` - Continuous left movement for tape sections
- `move-right` - Continuous right movement for toolbox items

## 📧 Email Templates

The contact form sends two types of emails:

1. **Notification Email** (to you)
   - Clean, professional format
   - Includes all form data
   - Timestamp and sender information

2. **Confirmation Email** (to sender)
   - Branded template with your colors
   - Message summary for reference
   - Your contact information and social links
   - Call-to-action to visit your portfolio

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from [PersonalFolio Template](https://www.figma.com/community/file/1297484254996536416/personalfolio-portfolio-template)
- Icons and graphics from various open-source projects
- Next.js and React communities for excellent documentation

## 📞 Support

For support or questions about this portfolio:

- **Email**: <jamachimauricennadi0@gmail.com>
- **Phone**: +2349024428551
- **LinkedIn**: [mauricennadijamachi](https://linkedin.com/in/mauricennadijamachi)
- **Twitter**: [@fushiondevhub](https://x.com/fushiondevhub)

---

**Built with ❤️ by Jamachi Mauricennadi**
