

# Technologies used
1. React vite
2. Tailwindcss
3. React Router
4. Zod/react-hook-form (form validation)
5. axios (for post and get requests)

# React Vite Setup 
1. npm create vite@latest
2. cd "folder name"
3. npm install
4. npm run dev

# tailwindcss Setup
1. npm install -D tailwindcss@3 postcss autoprefixer
2. npx tailwindcss init -p
3. In tailwind.config.js file content should have follwing
        content: [
            "./index.html",
            "./src/**/*.{js,ts,jsx,tsx}",
        ],

4. in index.css put
        @tailwind base;
        @tailwind components;
        @tailwind utilities;

5. Note* If you are not seeing tailwind css changes instantly,
   try, (npm run dev) again and restart the application 




