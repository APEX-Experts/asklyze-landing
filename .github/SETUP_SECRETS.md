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

#### `AZURE_TENANT_ID`

Your Azure AD tenant ID

**Find it:**

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to **Azure Active Directory**
3. Copy the **Tenant ID** from Overview

Example: `12345678-1234-1234-1234-123456789012`

#### `AZURE_CLIENT_ID`

Your Azure application (client) ID

**Find it:**

1. Go to Azure Portal → **Azure Active Directory** → **App registrations**
2. Select your app
3. Copy the **Application (client) ID**

Example: `87654321-4321-4321-4321-210987654321`

#### `AZURE_CLIENT_SECRET`

Your Azure application client secret

**Create:**

1. Go to your app registration
2. Navigate to **Certificates & secrets**
3. Click **New client secret**
4. Copy the **Value** (not the Secret ID!)

⚠️ **Important:** Copy immediately! It won't be shown again.

Example: `AbC~1dE2fG3hI4jK5lM6nO7pQ8rS9tU0vW1xY2zA3`

#### `MAIL_FROM`

Email address for sending contact form emails

Must be a valid email in your Microsoft 365 tenant.

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
- [ ] `AZURE_TENANT_ID` - Azure AD tenant ID
- [ ] `AZURE_CLIENT_ID` - Azure app client ID
- [ ] `AZURE_CLIENT_SECRET` - Azure app client secret
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

### Azure Email Not Working

- Verify all Azure credentials are correct
- Check app has `Mail.Send` permission granted
- Ensure admin consent was granted for the permission
- Verify `MAIL_FROM` email exists in your tenant

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
