# Overview
'Dharanas' is a fullstack project where frontend and backend repository are made separately.
This project is a small social media like web based application. 

# Features 
1. User account creation and login authentication
2. Token based authentication
3. Profile customization
   > profile picture change

   > name and bio updateable
4. Users can follow each other
5. Users can search other users

# Technologies and Dependencies used
1. React vite
2. Tailwindcss : Styling
3. React Router V7.2
4. Zod/react-hook-form : form validation
5. axios : API requests
6. React Redux : State management

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




