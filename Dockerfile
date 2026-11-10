# Używamy oficjalnego obrazu Playwright z Node.js (wersja Ubuntu-based)
FROM mcr.microsoft.com/playwright:v1.49.0-jammy

# Ustawienie katalogu roboczego w kontenerze
WORKDIR /app

# Kopiowanie plików definicji zależności
COPY package*.json ./

# Instalacja zależności npm
RUN npm ci
 npx playwright install
npm install
# Kopiowanie reszty kodu źródłowego projektu
COPY . .

# Domyślna komenda uruchamiająca testy
CMD ["npx", "playwright", "test"]