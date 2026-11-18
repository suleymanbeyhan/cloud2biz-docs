#!/usr/bin/env bash
# Cloud2Biz Docs – "Yapay Zekâya Sor" servisinin tek seferlik kurulumu.
# Kullanım (sunucuda, root olarak):
#   sudo bash /var/www/cloud2biz-docs/ask-ai/install.sh
# API anahtarını değiştirmek için aynı komutu tekrar çalıştırın.
set -euo pipefail

PROJECT=/var/www/cloud2biz-docs
ENV_FILE=/etc/c2b-ask-ai.env
UNIT=/etc/systemd/system/c2b-ask-ai.service
SNIPPET=/etc/nginx/snippets/c2b-ask-ai.conf
DOMAIN=docs.cloud2biz.com

[ "$(id -u)" -eq 0 ] || { echo "Lütfen sudo ile çalıştırın."; exit 1; }
NODE=$(command -v node) || { echo "node bulunamadı."; exit 1; }
[ -f "$PROJECT/ask-ai/server.mjs" ] || { echo "$PROJECT/ask-ai/server.mjs yok. Önce depo güncellenmeli."; exit 1; }

# 1) API anahtarı
echo
echo "Anthropic (Claude) API anahtarınızı yapıştırın (sk-ant-... ile başlar, ekranda görünmez):"
read -rs KEY; echo
[[ "$KEY" == sk-ant-* ]] || { echo "Anahtar 'sk-ant-' ile başlamalı."; exit 1; }
umask 077
cat > "$ENV_FILE" <<ENV
ANTHROPIC_API_KEY=$KEY
ASK_AI_MODEL=claude-haiku-5-5
ASK_AI_PER_IP=20
ASK_AI_DAILY=1000
ENV
chmod 600 "$ENV_FILE"
echo "✓ Anahtar $ENV_FILE dosyasına kaydedildi (yalnızca root okuyabilir)."

# 2) systemd servisi
cat > "$UNIT" <<UNITEOF
[Unit]
Description=Cloud2Biz Docs - Ask AI
After=network-online.target
Wants=network-online.target

[Service]
EnvironmentFile=$ENV_FILE
Environment=DOCS_ROOT=$PROJECT
ExecStart=$NODE $PROJECT/ask-ai/server.mjs
Restart=always
RestartSec=3
DynamicUser=yes
NoNewPrivileges=yes
ProtectSystem=strict
ProtectHome=yes
PrivateTmp=yes

[Install]
WantedBy=multi-user.target
UNITEOF
systemctl daemon-reload
systemctl enable --now c2b-ask-ai >/dev/null
systemctl restart c2b-ask-ai
echo "✓ c2b-ask-ai servisi çalışıyor."

# 3) Nginx: /api/ask -> 127.0.0.1:3210
mkdir -p /etc/nginx/snippets
cat > "$SNIPPET" <<'NGX'
location /api/ask {
    proxy_pass http://127.0.0.1:3210;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_buffering off;
    proxy_read_timeout 120s;
    client_max_body_size 64k;
}
NGX
CONF=$(grep -l "server_name[^;]*$DOMAIN" /etc/nginx/sites-enabled/* 2>/dev/null | head -1 || true)
[ -n "$CONF" ] || { echo "Nginx'te $DOMAIN için yapılandırma bulunamadı."; exit 1; }
CONF=$(readlink -f "$CONF")
if ! grep -q "snippets/c2b-ask-ai.conf" "$CONF"; then
  cp "$CONF" "/root/$(basename "$CONF").bak-askai"
  sed -i "/server_name[^;]*$DOMAIN/a\\    include snippets/c2b-ask-ai.conf;" "$CONF"
fi
if nginx -t 2>/dev/null; then
  systemctl reload nginx
  echo "✓ Nginx yapılandırıldı ($CONF)."
else
  echo "✗ Nginx testi başarısız, eski yapılandırma geri yükleniyor."
  [ -f "/root/$(basename "$CONF").bak-askai" ] && cp "/root/$(basename "$CONF").bak-askai" "$CONF"
  nginx -t; exit 1
fi

# 4) Test
sleep 2
echo
echo "Sağlık kontrolü:"
curl -s "https://$DOMAIN/api/ask/health" || curl -s http://127.0.0.1:3210/api/ask/health
echo
echo
echo "Deneme sorusu gönderiliyor..."
curl -s -N -X POST http://127.0.0.1:3210/api/ask -H 'content-type: application/json' \
  -d '{"locale":"tr","messages":[{"role":"user","content":"Windows lisansı ne kadar?"}]}'
echo
echo
echo "Kurulum tamam. Sitede sağ altta 'Yapay Zekâya Sor' düğmesi görünecek."
echo "Günlükler: journalctl -u c2b-ask-ai -f"
