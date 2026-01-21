#!/bin/bash
#
# SSL Certificate Setup Script using Let's Encrypt
# Obtains SSL certificates for the domain
#
# Usage: sudo bash init-ssl.sh yourdomain.com your@email.com
#

set -e

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo "Please run as root (use sudo)"
    exit 1
fi

# Check arguments
if [ $# -lt 2 ]; then
    echo "Usage: sudo bash init-ssl.sh <domain> <email>"
    echo "Example: sudo bash init-ssl.sh asklyze.com admin@asklyze.com"
    exit 1
fi

DOMAIN=$1
EMAIL=$2

echo "========================================="
echo "SSL Certificate Setup"
echo "========================================="
echo "Domain: $DOMAIN"
echo "Email: $EMAIL"
echo ""

# Check if DNS is pointing to this server
echo "🔍 Checking DNS configuration..."
SERVER_IP=$(curl -s ifconfig.me)
DOMAIN_IP=$(dig +short $DOMAIN | tail -n1)

echo "Server IP: $SERVER_IP"
echo "Domain IP: $DOMAIN_IP"

if [ "$SERVER_IP" != "$DOMAIN_IP" ]; then
    echo "⚠️  Warning: Domain DNS does not point to this server!"
    echo "Please update your DNS A record to point to $SERVER_IP"
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Create temporary Nginx config for certificate challenge
echo "📝 Creating temporary Nginx configuration..."
cat > /etc/nginx/sites-available/temp-certbot << EOF
server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN www.$DOMAIN;

    location ^~ /.well-known/acme-challenge/ {
        root /var/www/certbot;
        allow all;
    }

    location / {
        return 200 'Certificate validation in progress...';
        add_header Content-Type text/plain;
    }
}
EOF

# Enable temporary config
ln -sf /etc/nginx/sites-available/temp-certbot /etc/nginx/sites-enabled/temp-certbot
rm -f /etc/nginx/sites-enabled/default

# Test and reload Nginx
echo "🔄 Testing Nginx configuration..."
nginx -t

echo "🔄 Reloading Nginx..."
systemctl reload nginx

# Obtain SSL certificate
echo "🔒 Obtaining SSL certificate from Let's Encrypt..."
certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email $EMAIL \
    --agree-tos \
    --no-eff-email \
    --force-renewal \
    -d $DOMAIN \
    -d www.$DOMAIN

# Check if certificate was obtained successfully
if [ $? -eq 0 ]; then
    echo "✅ SSL certificate obtained successfully!"
    
    # Remove temporary config
    rm -f /etc/nginx/sites-enabled/temp-certbot
    
    # Set up automatic renewal
    echo "⏰ Setting up automatic certificate renewal..."
    
    # Create renewal hook to reload Nginx
    cat > /etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh << EOF
#!/bin/bash
systemctl reload nginx
EOF
    chmod +x /etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh
    
    # Test renewal process
    echo "🧪 Testing certificate renewal..."
    certbot renew --dry-run
    
    echo ""
    echo "========================================="
    echo "SSL Setup Complete!"
    echo "========================================="
    echo "Certificates location: /etc/letsencrypt/live/$DOMAIN/"
    echo "Certificate will auto-renew via certbot timer"
    echo ""
    echo "Next steps:"
    echo "1. Update nginx.conf with your domain name"
    echo "2. Copy nginx.conf to /etc/nginx/sites-available/asklyze-landing"
    echo "3. Create symlink: ln -s /etc/nginx/sites-available/asklyze-landing /etc/nginx/sites-enabled/"
    echo "4. Test config: nginx -t"
    echo "5. Reload Nginx: systemctl reload nginx"
    echo ""
else
    echo "❌ Failed to obtain SSL certificate"
    echo "Please check:"
    echo "1. DNS is pointing to this server"
    echo "2. Ports 80 and 443 are open"
    echo "3. No other service is using port 80"
    exit 1
fi
