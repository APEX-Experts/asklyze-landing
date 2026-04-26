# Asklyze Landing Page

A modern, bilingual (English/Arabic) landing page built with Next.js 15 and Payload CMS. Features SSR/SSG hybrid rendering, integrated CMS for blog management, and email integration via SendGrid API.

## 🚀 Features

- **Next.js 15** with App Router and React Server Components
- **Payload CMS** for content management
- **Bilingual Support** - English and Arabic with RTL support
- **Blog System** with dynamic routing and rich text editor
- **Contact Form** with SendGrid email integration
- **SEO Optimized** with sitemap, robots.txt, and schema markup
- **Responsive Design** with Tailwind CSS
- **Type-Safe** with TypeScript

## 📋 Prerequisites

- Node.js 20 or higher
- pnpm (recommended) or npm
- SendGrid account with API key (for email functionality)

## 🛠️ Development Setup

### 1. Clone the repository

```bash
git clone https://github.com/APEX-Experts/asklyze-landing.git
cd asklyze-landing
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` and add your configuration:

```env
PAYLOAD_SECRET=your-strong-random-secret
DATABASE_URI=file:postgresql://[username]:[password]@[host]:[port]/[db_name]
SENDGRID_API_KEY=your-sendgrid-api-key
MAIL_FROM=noreply@yourdomain.com
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

#### How to Generate Payload Secret

Run this command on Linux or Mac

```bash
openssl rand -base64 32
```

Then copy the output to the `PAYLOAD_SECRET` variable in the `.env` file.

### 4. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Access Payload CMS Admin

Navigate to [http://localhost:3000/admin](http://localhost:3000/admin) to access the CMS admin panel.

## 🏗️ Build for Production

```bash
pnpm build
pnpm start
```

## 🐳 Docker Deployment

### Local Docker Setup

```bash
# Build the image
docker build -t asklyze-landing .

# Run with docker-compose
docker-compose up -d
```

## 📁 Project Structure

```
asklyze-landing/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── [lang]/         # Internationalized routes
│   │   ├── (payload)/      # Payload CMS routes
│   │   └── api/            # API routes
│   ├── collections/        # Payload CMS collections
│   ├── components/         # React components
│   ├── data/              # Static data
│   ├── dictionaries/      # i18n translations
│   └── types/             # TypeScript types
├── public/                # Static assets
├── deploy/                # Deployment scripts and configs
│   ├── nginx.conf        # Nginx configuration
│   ├── setup-vps.sh      # VPS setup script
│   └── init-ssl.sh       # SSL setup script
├── .github/
│   └── workflows/
│       └── deploy.yml    # CI/CD pipeline
├── Dockerfile            # Production Docker image
├── docker-compose.yml    # Docker Compose config
└── .env.example         # Environment variables template
```

## 🌐 Internationalization

The site supports English and Arabic with automatic RTL layout for Arabic.

- English: `/en/*`
- Arabic: `/ar/*`
- Default locale: English
- Middleware handles automatic redirection

## 🔒 Security Features

- SSL/TLS encryption with Let's Encrypt
- Security headers (HSTS, CSP, X-Frame-Options)
- Rate limiting on API routes
- Fail2ban for brute force protection
- Docker non-root user execution
- Firewall configuration (UFW)

## 📧 Email Configuration

The contact form uses SendGrid API for sending emails. To set up:

1. Go to [SendGrid](https://sendgrid.com) and create an account
2. Navigate to Settings → API Keys
3. Create a new API key with "Mail Send" permission
4. Add the API key to your `.env` as `SENDGRID_API_KEY`
5. Verify your sender email domain in SendGrid

## 🧪 Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

## 📝 Environment Variables

See [.env.example](.env.example) for a complete list of required environment variables.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

Copyright © 2026 APEX Experts. All rights reserved.

## 🆘 Support

For deployment issues or questions, refer to:

- [Deployment Documentation](deploy/README.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [Payload CMS Documentation](https://payloadcms.com/docs)
