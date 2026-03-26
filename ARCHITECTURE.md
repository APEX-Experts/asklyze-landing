# Deployment Architecture Diagram

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                 INTERNET                                 │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │
                        DNS: yourdomain.com
                                 │
                    ┌────────────▼────────────┐
                    │    VPS (Ubuntu/Debian)  │
                    │   IP: XXX.XXX.XXX.XXX   │
                    │                         │
                    │  ┌───────────────────┐  │
                    │  │  UFW Firewall     │  │
                    │  │  - Port 22 (SSH)  │  │
                    │  │  - Port 80 (HTTP) │  │
                    │  │  - Port 443(HTTPS)│  │
                    │  └────────┬──────────┘  │
                    │           │             │
                    │  ┌────────▼──────────┐  │
                    │  │  Nginx (Port 80/  │  │
                    │  │       443)        │  │
                    │  │                   │  │
                    │  │ - SSL Termination │  │
                    │  │ - Rate Limiting   │  │
                    │  │ - Gzip Compress   │  │
                    │  │ - Security Headers│  │
                    │  │ - Static Caching  │  │
                    │  └────────┬──────────┘  │
                    │           │             │
                    │  ┌────────▼──────────┐  │
                    │  │  Docker Container │  │
                    │  │  asklyze-landing  │  │
                    │  │                   │  │
                    │  │  ┌─────────────┐  │  │
                    │  │  │  Next.js 15 │  │  │
                    │  │  │   Port 3000 │  │  │
                    │  │  │             │  │  │
                    │  │  │ - SSR/SSG   │  │  │
                    │  │  │ - API Routes│  │  │
                    │  │  │ - i18n      │  │  │
                    │  │  └──────┬──────┘  │  │
                    │  │         │         │  │
                    │  │  ┌──────▼──────┐  │  │
                    │  │  │ Payload CMS │  │  │
                    │  │  │             │  │  │
                    │  │  │ - Admin UI  │  │  │
                    │  │  │ - GraphQL   │  │  │
                    │  │  │ - REST API  │  │  │
                    │  │  └──────┬──────┘  │  │
                    │  │         │         │  │
                    │  └─────────┼─────────┘  │
                    │            │            │
                    │  ┌─────────▼─────────┐  │
                    │  │  Docker Volumes   │  │
                    │  │                   │  │
                    │  │  /data/           │  │
                    │  │  └─ SQLite DB     │  │
                    │  │                   │  │
                    │  │  /media/          │  │
                    │  │  └─ Uploads       │  │
                    │  └───────────────────┘  │
                    └─────────────────────────┘
```

## CI/CD Pipeline Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          DEVELOPMENT WORKFLOW                            │
└─────────────────────────────────────────────────────────────────────────┘

  Developer                    GitHub                      VPS
     │                           │                          │
     │  1. Git Push              │                          │
     ├──────────────────────────>│                          │
     │                           │                          │
     │                    ┌──────▼──────┐                   │
     │                    │GitHub Actions│                  │
     │                    │   Workflow   │                  │
     │                    └──────┬───────┘                  │
     │                           │                          │
     │                    2. Build Docker                   │
     │                    ┌──────▼───────┐                  │
     │                    │  Docker Build │                 │
     │                    │  Multi-stage  │                 │
     │                    └──────┬────────┘                 │
     │                           │                          │
     │                    3. Push to GHCR                   │
     │                    ┌──────▼────────┐                 │
     │                    │   Container    │                │
     │                    │   Registry     │                │
     │                    └──────┬─────────┘                │
     │                           │                          │
     │                    4. SSH to VPS                     │
     │                           ├─────────────────────────>│
     │                           │                   ┌──────▼──────┐
     │                           │                   │ Pull Image  │
     │                           │                   └──────┬──────┘
     │                           │                          │
     │                           │                   5. Restart
     │                           │                   ┌──────▼──────┐
     │                           │                   │docker-compose│
     │                           │                   │     up -d   │
     │                           │                   └──────┬──────┘
     │                           │                          │
     │                           │                   6. Health Check
     │                           │                   ┌──────▼──────┐
     │                           │                   │   /api/     │
     │                           │                   │   health    │
     │                           │                   └──────┬──────┘
     │                           │                          │
     │                    7. Notify Success                 │
     │  <─────────────────┴──────────────────────────────────┘
     │                           │                          │
```

## Data Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                            USER REQUEST FLOW                             │
└─────────────────────────────────────────────────────────────────────────┘

User Browser
     │
     │ HTTPS Request
     │ https://yourdomain.com/en
     │
     ▼
┌─────────────────┐
│  DNS Resolution │  yourdomain.com → VPS IP
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Nginx (443)    │
│                 │
│ 1. SSL Term     │  Decrypt HTTPS
│ 2. Rate Check   │  Verify limits
│ 3. Add Headers  │  Security headers
│ 4. Gzip         │  Compress response
└────────┬────────┘
         │
         │ HTTP (localhost:3000)
         ▼
┌─────────────────┐
│  Next.js App    │
│                 │
│ 1. Middleware   │  i18n redirect
│ 2. Route        │  Match route
│ 3. SSR/SSG      │  Render page
│ 4. Components   │  React render
└────────┬────────┘
         │
         │ (if CMS request)
         ▼
┌─────────────────┐
│  Payload CMS    │
│                 │
│ 1. Auth Check   │  Verify session
│ 2. Query DB     │  SQLite read/write
│ 3. Transform    │  Format data
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  SQLite DB      │
│  (Volume)       │
└─────────────────┘
         │
         │ HTML Response
         ▼
     User Browser
```

## Security Layers

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           SECURITY ARCHITECTURE                          │
└─────────────────────────────────────────────────────────────────────────┘

Layer 1: Network
┌──────────────────────────────┐
│  UFW Firewall                │  Only 22, 80, 443
│  + Fail2ban                  │  Brute force protection
└──────────────────────────────┘

Layer 2: SSL/TLS
┌──────────────────────────────┐
│  Let's Encrypt Cert          │  TLS 1.2+
│  + HSTS Header               │  Force HTTPS
│  + Strong Ciphers            │  Modern crypto
└──────────────────────────────┘

Layer 3: Nginx
┌──────────────────────────────┐
│  Rate Limiting               │  10 req/s API, 2 req/m contact
│  + Security Headers          │  XSS, Clickjack protection
│  + Request Validation        │  Size limits, timeouts
└──────────────────────────────┘

Layer 4: Application
┌──────────────────────────────┐
│  Input Validation            │  Type checking, sanitization
│  + Authentication            │  Payload CMS auth
│  + CSRF Protection           │  Next.js built-in
└──────────────────────────────┘

Layer 5: Container
┌──────────────────────────────┐
│  Non-root User               │  nextjs:nodejs (UID 1001)
│  + Minimal Image             │  Alpine base
│  + Read-only Filesystem      │  Where possible
└──────────────────────────────┘

Layer 6: Data
┌──────────────────────────────┐
│  Encrypted Secrets           │  GitHub Secrets, env vars
│  + Volume Permissions        │  Restricted access
│  + Database Encryption       │  At-rest encryption option
└──────────────────────────────┘
```

## Deployment Environments

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         ENVIRONMENT SEPARATION                           │
└─────────────────────────────────────────────────────────────────────────┘

Development                Production                 (Future) Staging
┌──────────────┐          ┌──────────────┐           ┌──────────────┐
│ Local        │          │ VPS          │           │ VPS/Cloud    │
│              │          │              │           │              │
│ - Hot Reload │          │ - Optimized  │           │ - Pre-prod   │
│ - Source Maps│          │ - Minified   │           │ - Testing    │
│ - SQLite     │          │ - SQLite     │           │ - PostgreSQL?│
│ - Mock Email │          │ - SendGrid   │           │ - Real Email │
│              │          │ - SSL/HTTPS  │           │ - SSL/HTTPS  │
│ localhost:   │          │ yourdomain.  │           │ staging.     │
│   3000       │          │   com        │           │   yourdomain │
└──────────────┘          └──────────────┘           └──────────────┘
```

## File Structure for Deployment

```
asklyze-landing/
│
├── Dockerfile                  # Production container definition
├── .dockerignore              # Build context optimization
├── docker-compose.yml         # Container orchestration
├── .env.example               # Environment template
│
├── .github/
│   ├── workflows/
│   │   └── deploy.yml         # CI/CD pipeline
│   └── SETUP_SECRETS.md       # Secret configuration guide
│
├── deploy/
│   ├── nginx.conf             # Nginx reverse proxy config
│   ├── setup-vps.sh           # VPS initialization script
│   ├── init-ssl.sh            # SSL certificate setup
│   └── README.md              # Deployment documentation
│
├── src/
│   ├── app/
│   │   └── api/
│   │       └── health/        # Health check endpoint
│   │           └── route.ts
│   └── payload.config.ts      # CMS configuration
│
├── DEPLOYMENT_CHECKLIST.md    # Step-by-step guide
├── DEPLOYMENT_SUMMARY.md      # Complete overview
└── README.md                  # Main documentation
```

## Resource Requirements

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           VPS SPECIFICATIONS                             │
└─────────────────────────────────────────────────────────────────────────┘

Minimum (Light Traffic)        Recommended (Moderate)    High Traffic
┌──────────────────┐          ┌──────────────────┐      ┌──────────────┐
│ 2 GB RAM         │          │ 4 GB RAM         │      │ 8+ GB RAM    │
│ 2 CPU Cores      │          │ 4 CPU Cores      │      │ 8+ CPU Cores │
│ 20 GB Storage    │          │ 40 GB Storage    │      │ 100+ GB SSD  │
│ 1 TB Bandwidth   │          │ 2 TB Bandwidth   │      │ Unmetered    │
│                  │          │                  │      │              │
│ ~100 users/day   │          │ ~1000 users/day  │      │ 10k+ users   │
│ $5-10/month      │          │ $20-40/month     │      │ $80+/month   │
└──────────────────┘          └──────────────────┘      └──────────────┘
```

---

**Visual guide to understand the complete deployment architecture**
