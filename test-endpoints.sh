#!/usr/bin/env bash
set -u

BASE_URL="${BASE_URL:-http://localhost:3000}"
SQLITE_URL="${SQLITE_URL:-http://localhost:8080}"

echo "=== GET / ==="
curl -s -w " [%{http_code}]\n" "$BASE_URL/"

echo "=== GET /hola-mundo ==="
curl -s -w " [%{http_code}]\n" "$BASE_URL/hola-mundo"

echo "=== GET /productos ==="
curl -s -w " [%{http_code}]\n" "$BASE_URL/productos"

echo "=== GET /productos/1 ==="
curl -s -w " [%{http_code}]\n" "$BASE_URL/productos/1"

echo "=== POST /productos (class-validator, valido) ==="
curl -s -w " [%{http_code}]\n" -X POST "$BASE_URL/productos" \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Teclado","precio":150,"stock":10}'

echo "=== POST /productos (class-validator, invalido: precio negativo) ==="
curl -s -w " [%{http_code}]\n" -X POST "$BASE_URL/productos" \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Teclado","precio":-5,"stock":10}'

echo "=== POST /productos/zod (valido) ==="
curl -s -w " [%{http_code}]\n" -X POST "$BASE_URL/productos/zod" \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Mouse","precio":50,"stock":5}'

echo "=== POST /productos/zod (invalido: stock negativo) ==="
curl -s -w " [%{http_code}]\n" -X POST "$BASE_URL/productos/zod" \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Mouse","precio":50,"stock":-5}'

echo "=== GET /productos/999 (no existe) ==="
curl -s -w " [%{http_code}]\n" "$BASE_URL/productos/999"

echo "=== GET $SQLITE_URL (sqlite-web) ==="
curl -s -o /dev/null -w "[%{http_code}]\n" "$SQLITE_URL/"
