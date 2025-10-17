#!/bin/bash

# Database setup script for development

echo "🚀 Setting up database for Micro SaaS Boilerplate..."

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ .env.local file not found. Please copy .env.example to .env.local and configure your database URL."
    exit 1
fi

# Generate Prisma client
echo "📦 Generating Prisma client..."
npx prisma generate

# Push database schema (for development)
echo "🗄️ Pushing database schema..."
npx prisma db push

# Seed the database
echo "🌱 Seeding database with initial data..."
npm run db:seed

echo "✅ Database setup completed!"
echo ""
echo "📋 Default users created:"
echo "   Admin: admin@example.com / admin123"
echo "   Customer: customer@example.com / customer123"
echo ""
echo "🚀 You can now start the development server with: npm run dev"