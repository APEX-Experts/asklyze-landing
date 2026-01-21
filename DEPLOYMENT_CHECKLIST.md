# VPS Deployment Checklist

Quick reference guide for deploying Asklyze Landing Page to a VPS.

## Pre-Deployment

- [ ] VPS provisioned (Ubuntu 20.04/22.04 or Debian 11/12)
  - [ ] Minimum 2GB RAM
  - [ ] 2 CPU cores
  - [ ] 20GB storage
- [ ] Domain name purchased
- [ ] Azure account with Microsoft 365 access
- [ ] GitHub repository access

## DNS Configuration

- [ ] Create A record: `@` → VPS IP
- [ ] Create A record: `www` → VPS IP
- [ ] Wait for DNS propagation (5-60 minutes)
- [ ] Verify DNS: `dig yourdomain.com` or `nslookup yourdomain.com`

## VPS Initial Setup

```bash
# 1. SSH into VPS
ssh root@your-vps-ip

# 2. Clone repository
git clone https://github.com/APEX-Experts/asklyze-landing.git
cd asklyze-landing

# 3. Run setup script
sudo bash deploy/setup-vps.sh yourdomain.com your@email.com

# 4. Setup SSL certificates
sudo bash deploy/init-ssl.sh yourdomain.com your@email.com

# 5. Configure Nginx
sudo cp deploy/nginx.conf /etc/nginx/sites-available/asklyze-landing
sudo sed -i 's/yourdomain.com/your-actual-domain.com/g' /etc/nginx/sites-available/asklyze-landing
sudo ln -s /etc/nginx/sites-available/asklyze-landing /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Azure Configuration

- [ ] Login to [Azure Portal](https://portal.azure.com)
- [ ] Navigate to Azure Active Directory → App registrations
- [ ] Create new app registration
  - [ ] Name: "Asklyze Email Service"
  - [ ] Supported account types: Single tenant
- [ ] Note Application (client) ID
- [ ] Note Directory (tenant) ID
- [ ] Navigate to Certificates & secrets
  - [ ] Create new client secret
  - [ ] Copy secret value immediately
- [ ] Navigate to API permissions
  - [ ] Add permission: Microsoft Graph → Application permissions
  - [ ] Select: `Mail.Send`
  - [ ] Grant admin consent

## GitHub Actions Configuration

Navigate to GitHub repository → Settings → Secrets and variables → Actions

- [ ] `VPS_HOST` = VPS IP address
- [ ] `VPS_USER` = deploy
- [ ] `VPS_PORT` = 22 (optional)
- [ ] `SSH_PRIVATE_KEY` = Private SSH key
- [ ] `PAYLOAD_SECRET` = Generated random secret
- [ ] `AZURE_TENANT_ID` = Azure tenant ID
- [ ] `AZURE_CLIENT_ID` = Azure client ID
- [ ] `AZURE_CLIENT_SECRET` = Azure client secret
- [ ] `MAIL_FROM` = noreply@yourdomain.com
- [ ] `NEXT_PUBLIC_SERVER_URL` = https://yourdomain.com

See [.github/SETUP_SECRETS.md](.github/SETUP_SECRETS.md) for detailed instructions.

## SSH Key Setup

```bash
# On your local machine
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_deploy
ssh-copy-id -i ~/.ssh/github_deploy.pub deploy@your-vps-ip

# Copy private key to GitHub secret
cat ~/.ssh/github_deploy
```

## First Deployment

```bash
# Test deployment
git commit --allow-empty -m "Test deployment"
git push origin main

# Monitor in GitHub Actions tab
# Watch deployment workflow execute
```

## Verification

- [ ] GitHub Actions workflow completed successfully
- [ ] SSH into VPS: `ssh deploy@your-vps-ip`
- [ ] Check containers: `docker ps`
- [ ] Verify healthy: `docker ps | grep healthy`
- [ ] Check logs: `cd /opt/asklyze-landing && docker-compose logs -f`
- [ ] Visit: `https://yourdomain.com`
- [ ] Test contact form
- [ ] Access admin: `https://yourdomain.com/admin`
- [ ] SSL verified: Check green padlock in browser

## Post-Deployment

- [ ] Create admin user in Payload CMS
- [ ] Test all pages (English & Arabic)
- [ ] Verify sitemap: `/sitemap.xml`
- [ ] Verify robots: `/robots.txt`
- [ ] Test contact form submission
- [ ] Check email delivery
- [ ] Setup monitoring (optional)
- [ ] Configure backups (optional)

## Monitoring Commands

```bash
# Container status
docker ps

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f app

# Nginx logs
sudo tail -f /var/log/nginx/asklyze-landing-access.log
sudo tail -f /var/log/nginx/asklyze-landing-error.log

# Disk usage
df -h

# Memory usage
free -h

# Container resource usage
docker stats
```

## Backup Commands

```bash
# Backup database
cp /opt/asklyze-landing/data/payload-sqlite.db ~/backups/db-$(date +%Y%m%d).db

# Backup media
tar -czf ~/backups/media-$(date +%Y%m%d).tar.gz /opt/asklyze-landing/media/

# Backup environment
cp /opt/asklyze-landing/.env ~/backups/.env-$(date +%Y%m%d)
```

## Maintenance

```bash
# Update application
cd /opt/asklyze-landing
docker-compose pull
docker-compose up -d

# Restart application
docker-compose restart

# View container logs
docker-compose logs -f

# Clean up old images
docker image prune -af

# Renew SSL (automatic via certbot, manual if needed)
sudo certbot renew
sudo systemctl reload nginx
```

## Troubleshooting

### Container won't start

```bash
cd /opt/asklyze-landing
docker-compose logs app
# Check for missing environment variables or errors
```

### SSL issues

```bash
sudo certbot renew --dry-run
sudo nginx -t
sudo systemctl status nginx
```

### Deployment fails

```bash
# Check GitHub Actions logs
# Verify all secrets are set correctly
# Check VPS SSH access: ssh deploy@your-vps-ip
# Verify Docker is running: docker ps
```

### Email not working

- Verify Azure credentials in GitHub secrets
- Check Mail.Send permission is granted
- Test Azure token: See Azure Graph API documentation

## Support Resources

- [Deployment Documentation](deploy/README.md)
- [GitHub Secrets Setup](.github/SETUP_SECRETS.md)
- [Main README](README.md)
- [Next.js Docs](https://nextjs.org/docs)
- [Payload CMS Docs](https://payloadcms.com/docs)

---

**Deployment Complete! 🚀**
