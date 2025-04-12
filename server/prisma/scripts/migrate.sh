#!/bin/bash

# Check if a migration name is provided
if [ -z "$1" ]; then
    echo "❌ Error: Please provide a migration name."
    echo "Usage: ./migrate.sh <migration_name>"
    exit 1
fi

echo "🔄 Switching to local database..."
sed -i 's/DATABASE_URL/DATABASE_URL_LOCAL/' prisma/schema/schema.prisma

echo "🚀 Running Prisma migration: $1"
npx prisma migrate dev --name "$1"

echo "🔄 Reverting back to main database..."
sed -i 's/DATABASE_URL_LOCAL/DATABASE_URL/' prisma/schema/schema.prisma

echo "✅ Migration completed successfully!"
