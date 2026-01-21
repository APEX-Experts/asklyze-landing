# 🚀 Quick Start Deployment Guide

**Deploy in under 1 hour!**

## Before You Begin

- [ ] VPS with Ubuntu 20.04+ (2GB RAM, 2 CPU)
- [ ] Domain name with DNS access
- [ ] Azure account (for email)
- [ ] GitHub account with repo access

## Step 1: VPS Setup (15 min)

```bash
# SSH into your VPS
ssh root@YOUR_VPS_IP

# Clone the repository
git clone https://github.com/APEX-Experts/asklyze-landing.git
cd asklyze-landing

# Run setup script
sudo bash deploy/setup-vps.sh YOUR_DOMAIN.com YOUR_EMAIL@example.com
```

**What this does:**

- Installs Docker, Nginx, Certbot
- Configures firewall
- Sets up fail2ban
- Creates deployment user

## Step 2: DNS Configuration (5 min)

In your domain registrar's DNS settings:

```
Type    Name    Value
A       @       YOUR_VPS_IP
A       www     YOUR_VPS_IP
```

**Verify DNS propagation:**

```bash
dig YOUR_DOMAIN.com
```

## Step 3: SSL Setup (5 min)

```bash
# Still on VPS
sudo bash deploy/init-ssl.sh YOUR_DOMAIN.com YOUR_EMAIL@example.com
```

**What this does:**

- Obtains Let's Encrypt certificates
- Configures auto-renewal
- Sets up HTTPS

## Step 4: Configure Nginx (3 min)

```bash
# Copy configuration
sudo cp deploy/nginx.conf /etc/nginx/sites-available/asklyze-landing

# Update domain name
sudo sed -i 's/yourdomain.com/YOUR_DOMAIN.com/g' /etc/nginx/sites-available/asklyze-landing

# Enable site
sudo ln -s /etc/nginx/sites-available/asklyze-landing /etc/nginx/sites-enabled/

# Test and reload
sudo nginx -t && sudo systemctl reload nginx
```

## Step 5: Azure Setup (10 min)

1. Go to [Azure Portal](https://portal.azure.com)
2. Azure Active Directory → App registrations → New
3. Name: "Asklyze Email Service"
4. Note **Tenant ID** and **Client ID**
5. Certificates & secrets → New client secret
6. Copy **Secret Value** immediately
7. API permissions → Add → Microsoft Graph → Application
8. Select **Mail.Send** → Grant admin consent

## Step 6: GitHub Secrets (10 min)

Go to your repo: **Settings → Secrets and variables → Actions**

Add these secrets:

| Secret Name              | Value           | Example                             |
| ------------------------ | --------------- | ----------------------------------- |
| `VPS_HOST`               | VPS IP          | `192.168.1.100`                     |
| `VPS_USER`               | SSH user        | `deploy`                            |
| `SSH_PRIVATE_KEY`        | SSH private key | `-----BEGIN OPENSSH...`             |
| `PAYLOAD_SECRET`         | Random string   | Generate: `openssl rand -base64 32` |
| `AZURE_TENANT_ID`        | From Azure      | `12345678-...`                      |
| `AZURE_CLIENT_ID`        | From Azure      | `87654321-...`                      |
| `AZURE_CLIENT_SECRET`    | From Azure      | `AbC~1dE2f...`                      |
| `MAIL_FROM`              | Email sender    | `noreply@YOUR_DOMAIN.com`           |
| `NEXT_PUBLIC_SERVER_URL` | Site URL        | `https://YOUR_DOMAIN.com`           |

**Generate SSH key:**

```bash
# On your local machine
ssh-keygen -t ed25519 -f ~/.ssh/github_deploy -C "github-deploy"
ssh-copy-id -i ~/.ssh/github_deploy.pub deploy@YOUR_VPS_IP
cat ~/.ssh/github_deploy  # Copy this to SSH_PRIVATE_KEY
```

## Step 7: Deploy! (2 min)

```bash
# Push to trigger deployment
git push origin main
```

Watch the deployment: **GitHub → Actions tab**

## Step 8: Verify (3 min)

1. **Visit your site:** https://YOUR_DOMAIN.com
2. **Check SSL:** Green padlock in browser
3. **Test contact form:** Fill and submit
4. **Access admin:** https://YOUR_DOMAIN.com/admin
5. **Create admin user** in Payload CMS

## Verification Checklist

- [ ] Site loads over HTTPS
- [ ] SSL certificate valid (green padlock)
- [ ] English version works (/en)
- [ ] Arabic version works (/ar)
- [ ] Contact form submits successfully
- [ ] Admin panel accessible
- [ ] No console errors

## Common Issues

### DNS not propagating

```bash
# Wait 5-60 minutes, then check
dig YOUR_DOMAIN.com
nslookup YOUR_DOMAIN.com
```

### Container not starting

```bash
# Check logs
ssh deploy@YOUR_VPS_IP
cd /opt/asklyze-landing
docker-compose logs -f
```

### GitHub Actions fails

- Verify all 9 secrets are set
- Check SSH key has no passphrase
- Ensure VPS allows SSH from GitHub IPs

### Email not sending

- Verify Azure app has Mail.Send permission
- Check admin consent was granted
- Ensure MAIL_FROM email exists in tenant

## Quick Commands

```bash
# View logs
ssh deploy@YOUR_VPS_IP "cd /opt/asklyze-landing && docker-compose logs -f"

# Restart app
ssh deploy@YOUR_VPS_IP "cd /opt/asklyze-landing && docker-compose restart"

# Check status
ssh deploy@YOUR_VPS_IP "docker ps"

# Update manually
ssh deploy@YOUR_VPS_IP "cd /opt/asklyze-landing && docker-compose pull && docker-compose up -d"
```

## 🎉 Success!

Your site is now live at **https://YOUR_DOMAIN.com**

### Next Steps

1. Create admin user at `/admin`
2. Add blog posts via CMS
3. Customize content
4. Monitor logs and performance
5. Set up backups (optional)

## Need Help?

- [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) - Detailed steps
- [DEPLOYMENT_SUMMARY.md](DEPLOYMENT_SUMMARY.md) - Complete overview
- [ARCHITECTURE.md](ARCHITECTURE.md) - System architecture
- [.github/SETUP_SECRETS.md](.github/SETUP_SECRETS.md) - Secret setup guide
- [deploy/README.md](deploy/README.md) - VPS deployment docs

---

**Total time: ~45 minutes** ⏱️

Replace `YOUR_DOMAIN.com`, `YOUR_VPS_IP`, and `YOUR_EMAIL@example.com` with your actual values.
