# GitHub Actions Setup Guide

This guide explains how to configure GitHub Actions secrets for automated deployment to your VPS.

## Required Secrets

Navigate to your GitHub repository → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

### 1. VPS Connection Secrets

#### `VPS_HOST`

Your VPS IP address or hostname

```
Example: 192.168.1.100
or: vps.yourdomain.com
```

#### `VPS_USER`

SSH username for deployment (recommended: `deploy`)

```
Example: deploy
```

#### `VPS_PORT` (Optional)

SSH port, defaults to 22 if not set

```
Example: 22
```

#### `SSH_PRIVATE_KEY`

Private SSH key for authentication

**How to generate:**

```bash
# On your local machine, generate SSH key pair
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_deploy

# Copy public key to VPS
ssh-copy-id -i ~/.ssh/github_deploy.pub deploy@your-vps-ip

# Display private key (copy this to GitHub secret)
cat ~/.ssh/github_deploy
```

**Important:** Copy the entire private key including the header and footer:

```
-----BEGIN OPENSSH PRIVATE KEY-----
...key content...
-----END OPENSSH PRIVATE KEY-----
```

### 2. Application Secrets

#### `PAYLOAD_SECRET`

Strong random secret for Payload CMS authentication

**Generate:**

```bash
openssl rand -base64 32
```

Example output: `jK8vN2mP9qR4sT6uV7wX8yZ0aB1cD2eF3gH4iJ5kL6m=`

#### `SENDGRID_API_KEY`

Your SendGrid API key for sending emails

**Create:**

1. Go to [SendGrid](https://sendgrid.com) → **Settings** → **API Keys**
2. Click **Create API Key**
3. Select **Restricted Access** and enable **Mail Send**
4. Copy the API key immediately

⚠️ **Important:** Copy immediately! It won't be shown again.

Example: `SG.xxxxxxxxxxxxxxxxxxxx.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

#### `MAIL_FROM`

Email address for sending contact form emails

Must be a verified sender in your SendGrid account.

Example: `noreply@yourdomain.com`

#### `NEXT_PUBLIC_SERVER_URL`

Public URL of your production site

Example: `https://yourdomain.com`

## Complete Secret List

Here's a checklist of all secrets to add:

- [ ] `VPS_HOST` - VPS IP address or hostname
- [ ] `VPS_USER` - SSH username (e.g., deploy)
- [ ] `VPS_PORT` - SSH port (optional, defaults to 22)
- [ ] `SSH_PRIVATE_KEY` - Private SSH key for authentication
- [ ] `PAYLOAD_SECRET` - Random secret for Payload CMS
- [ ] `SENDGRID_API_KEY` - SendGrid API key
- [ ] `MAIL_FROM` - Sender email address
- [ ] `NEXT_PUBLIC_SERVER_URL` - Production site URL

## Testing the Setup

After adding all secrets:

1. **Make a test commit:**

```bash
git commit --allow-empty -m "Test deployment"
git push origin main
```

2. **Monitor the workflow:**
   - Go to your repository → **Actions** tab
   - Watch the deployment workflow run
   - Check for any errors in the logs

3. **Verify deployment:**
   - SSH into your VPS: `ssh deploy@your-vps-ip`
   - Check running containers: `docker ps`
   - View logs: `cd /opt/asklyze-landing && docker-compose logs -f`

## Troubleshooting

### SSH Authentication Failed

- Verify `SSH_PRIVATE_KEY` includes header/footer
- Ensure public key is in `~/.ssh/authorized_keys` on VPS
- Check VPS firewall allows SSH connections

### Container Won't Start

- Check environment variables in GitHub secrets
- View container logs: `docker-compose logs app`
- Verify VPS has enough resources (RAM/disk)

### Health Check Timeout

- Ensure application is listening on port 3000
- Check container logs for startup errors
- Verify no firewall blocking internal port

### SendGrid Email Not Working

- Verify `SENDGRID_API_KEY` is correct and not expired
- Check API key has `Mail Send` permission enabled
- Ensure sender domain is verified in SendGrid
- Verify `MAIL_FROM` email matches a verified sender

## Security Best Practices

1. **Use separate secrets for production and staging**
2. **Rotate secrets periodically** (every 90 days)
3. **Never commit secrets to repository**
4. **Use least privilege** - VPS user should only have necessary permissions
5. **Enable 2FA** on your GitHub account
6. **Review deployment logs** regularly for suspicious activity

## Environment-Specific Secrets

If you have multiple environments (staging, production), use GitHub Environments:

1. Go to **Settings** → **Environments**
2. Create environments: `production`, `staging`
3. Add environment-specific secrets
4. Update workflow to use environment: `environment: production`

Example:

```yaml
deploy:
  name: Deploy to VPS
  needs: build-and-push
  runs-on: ubuntu-latest
  environment: production # Uses production secrets
```

## Additional Resources

- [GitHub Actions Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [SSH Key Authentication Guide](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
- [Azure App Registration Guide](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app)
