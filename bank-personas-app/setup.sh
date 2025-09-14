#!/bin/bash

echo "🚀 Setting up Bank Personas App with Supabase..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "✅ .env file created. Please update it with your Supabase credentials."
else
    echo "✅ .env file already exists."
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env with your Supabase credentials"
echo "2. Run the SQL schema in your Supabase dashboard"
echo "3. Create users in Supabase Authentication"
echo "4. Run 'npm run dev' to start the development server"
echo ""
echo "For detailed instructions, see SUPABASE_SETUP.md"
