# VPS Deployment Documentation

This directory contains scripts and configurations for deploying the Asklyze Landing Page to a VPS.

## Files

- **nginx.conf**: Nginx reverse proxy configuration with SSL termination
- **setup-vps.sh**: Initial VPS setup script (installs Docker, Nginx, Certbot, etc.)
- **init-ssl.sh**: SSL certificate setup script using Let's Encrypt

## Prerequisites

- Ubuntu 20.04/22.04 or Debian 11/12 VPS
- Root or sudo access
- Domain name with DNS configured
- Minimum 2GB RAM, 2 CPU cores, 20GB storage

## Quick Start

### 1. Prepare Your VPS

```bash
# SSH into your VPS
ssh root@your-vps-ip

# Clone or upload the repository
git clone https://github.com/APEX-Experts/asklyze-landing.git
cd asklyze-landing

# Run VPS setup script
sudo bash deploy/setup-vps.sh yourdomain.com your@email.com
```

### 2. Configure DNS

Point your domain's DNS A records to your VPS IP:

```
A    @              your-vps-ip
A    www            your-vps-ip
```

Wait for DNS propagation (can take up to 24 hours, usually 5-10 minutes).

### 3. Set Up SSL Certificates

```bash
# Run SSL setup script
sudo bash deploy/init-ssl.sh yourdomain.com your@email.com
```

### 4. Configure Nginx

```bash
# Copy nginx configuration
sudo cp deploy/nginx.conf /etc/nginx/sites-available/asklyze-landing

# Update domain name in the config
sudo sed -i 's/yourdomain.com/your-actual-domain.com/g' /etc/nginx/sites-available/asklyze-landing

# Enable the site
sudo ln -s /etc/nginx/sites-available/asklyze-landing /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### 5. Set Up GitHub Actions Secrets

In your GitHub repository, go to Settings → Secrets and variables → Actions, and add:

```
VPS_HOST=your-vps-ip
VPS_USER=deploy
VPS_PORT=22
SSH_PRIVATE_KEY=<your-private-key>
PAYLOAD_SECRET=<strong-random-secret>
SENDGRID_API_KEY=<your-sendgrid-api-key>
MAIL_FROM=noreply@yourdomain.com
NEXT_PUBLIC_SERVER_URL=https://yourdomain.com
```

### 6. Deploy

Push to the main branch to trigger automatic deployment:

```bash
git push origin main
```

## Manual Deployment

If you prefer to deploy manually without GitHub Actions:

```bash
# SSH into VPS
ssh deploy@your-vps-ip

# Navigate to application directory
cd /opt/asklyze-landing

# Create .env file
nano .env
# Add all environment variables

# Pull and start the application
docker-compose pull
docker-compose up -d

# Check logs
docker-compose logs -f
```

## Maintenance

### View Logs

```bash
docker-compose logs -f
```

### Restart Application

```bash
docker-compose restart
```

### Update Application

```bash
docker-compose pull
docker-compose up -d
```

### Backup Database

```bash
# Backup SQLite database
cp /opt/asklyze-landing/data/payload-sqlite.db ~/backups/payload-$(date +%Y%m%d).db
```

### SSL Certificate Renewal

Certificates auto-renew via certbot timer. To manually renew:

```bash
sudo certbot renew
sudo systemctl reload nginx
```

## Troubleshooting

### Check Container Status

```bash
docker ps
docker-compose ps
```

### Check Container Logs

```bash
docker-compose logs app
```

### Check Nginx Logs

```bash
sudo tail -f /var/log/nginx/asklyze-landing-error.log
sudo tail -f /var/log/nginx/asklyze-landing-access.log
```

### Test Nginx Configuration

```bash
sudo nginx -t
```

### Restart Nginx

```bash
sudo systemctl restart nginx
```

## Security Notes

- Firewall is configured to only allow SSH, HTTP, and HTTPS
- Fail2ban is enabled to prevent brute force attacks
- Rate limiting is configured in Nginx for API routes
- All traffic is encrypted with TLS 1.2+
- Security headers are configured in Nginx
- Application runs as non-root user in container

## Support

For issues or questions, contact the development team.
