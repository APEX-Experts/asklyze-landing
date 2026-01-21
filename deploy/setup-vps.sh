#!/bin/bash
#
# VPS Setup Script for Asklyze Landing Page
# This script prepares a fresh Ubuntu/Debian VPS for Docker deployment
#
# Usage: sudo bash setup-vps.sh yourdomain.com your@email.com
#

set -e

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo "Please run as root (use sudo)"
    exit 1
fi

# Check arguments
if [ $# -lt 2 ]; then
    echo "Usage: sudo bash setup-vps.sh <domain> <email>"
    echo "Example: sudo bash setup-vps.sh asklyze.com admin@asklyze.com"
    exit 1
fi

DOMAIN=$1
EMAIL=$2

echo "========================================="
echo "VPS Setup for Asklyze Landing Page"
echo "========================================="
echo "Domain: $DOMAIN"
echo "Email: $EMAIL"
echo ""

# Update system
echo "📦 Updating system packages..."
apt-get update
apt-get upgrade -y

# Install essential packages
echo "📦 Installing essential packages..."
apt-get install -y \
    curl \
    wget \
    git \
    vim \
    ufw \
    fail2ban \
    software-properties-common \
    apt-transport-https \
    ca-certificates \
    gnupg \
    lsb-release

# Install Docker
echo "🐳 Installing Docker..."
if ! command -v docker &> /dev/null; then
    # Add Docker's official GPG key
    install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    chmod a+r /etc/apt/keyrings/docker.gpg

    # Add Docker repository
    echo \
        "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
        $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

    # Install Docker Engine
    apt-get update
    apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

    # Start and enable Docker
    systemctl start docker
    systemctl enable docker

    echo "✅ Docker installed successfully"
else
    echo "✅ Docker already installed"
fi

# Install Docker Compose (standalone)
echo "🐳 Installing Docker Compose..."
if ! command -v docker-compose &> /dev/null; then
    DOCKER_COMPOSE_VERSION=$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep 'tag_name' | cut -d\" -f4)
    curl -L "https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
    echo "✅ Docker Compose installed successfully"
else
    echo "✅ Docker Compose already installed"
fi

# Install Nginx
echo "🌐 Installing Nginx..."
if ! command -v nginx &> /dev/null; then
    apt-get install -y nginx
    systemctl start nginx
    systemctl enable nginx
    echo "✅ Nginx installed successfully"
else
    echo "✅ Nginx already installed"
fi

# Install Certbot for Let's Encrypt
echo "🔒 Installing Certbot..."
if ! command -v certbot &> /dev/null; then
    apt-get install -y certbot python3-certbot-nginx
    echo "✅ Certbot installed successfully"
else
    echo "✅ Certbot already installed"
fi

# Configure firewall
echo "🔥 Configuring firewall..."
ufw --force reset
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable
echo "✅ Firewall configured"

# Configure fail2ban
echo "🛡️  Configuring fail2ban..."
systemctl start fail2ban
systemctl enable fail2ban
echo "✅ Fail2ban configured"

# Create application directory
echo "📁 Creating application directory..."
mkdir -p /opt/asklyze-landing
mkdir -p /opt/asklyze-landing/data
mkdir -p /opt/asklyze-landing/media
mkdir -p /var/www/certbot

# Set permissions
echo "🔐 Setting permissions..."
chown -R www-data:www-data /var/www/certbot

# Create deployment user (optional)
echo "👤 Creating deployment user..."
if ! id -u deploy &>/dev/null; then
    useradd -m -s /bin/bash deploy
    usermod -aG docker deploy
    echo "✅ User 'deploy' created and added to docker group"
else
    echo "✅ User 'deploy' already exists"
fi

# Display versions
echo ""
echo "========================================="
echo "Installation Summary"
echo "========================================="
docker --version
docker-compose --version
nginx -v
certbot --version

echo ""
echo "========================================="
echo "Next Steps:"
echo "========================================="
echo "1. Point your DNS A records for $DOMAIN to this server's IP"
echo "2. Run the SSL setup script: bash init-ssl.sh $DOMAIN $EMAIL"
echo "3. Copy the nginx.conf to /etc/nginx/sites-available/asklyze-landing"
echo "4. Update the domain name in nginx.conf"
echo "5. Create symbolic link: ln -s /etc/nginx/sites-available/asklyze-landing /etc/nginx/sites-enabled/"
echo "6. Test nginx config: nginx -t"
echo "7. Reload nginx: systemctl reload nginx"
echo "8. Set up GitHub Actions secrets for deployment"
echo "9. Push to main branch to trigger deployment"
echo ""
echo "✅ VPS setup complete!"
