# Property Preview AI Insights

## Project Overview

This is a property preview application with AI-powered insights.

## How can I edit this code?

There are several ways to work with this project:

**Using your preferred IDE**

Clone this repository and open it in your preferred IDE. Make your changes and push them to your repository.

**Using GitHub Codespaces**

You can also work on this project using GitHub Codespaces:

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd pro-preview

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

This project can be deployed using Docker:

```bash
# Build the Docker image
docker build -t pro-preview .

# Run the container
docker run -p 8080:8080 pro-preview
```

## Custom Domain Setup

To use a custom domain with your deployment, configure your DNS settings to point to your hosting provider and set up the appropriate SSL certificates.


# Build the Docker image
docker build -t pro-preview .

# Test locally (optional)
docker run -p 8080:8080 pro-preview

# Tag and push to Google Container Registry
docker tag pro-preview gcr.io/gen-lang-client-0530904290/pro-preview
docker push gcr.io/gen-lang-client-0530904290/pro-preview

# Deploy to Cloud Run
gcloud run deploy pro-preview \
  --image gcr.io/gen-lang-client-0530904290/pro-preview \
  --platform managed \
  --allow-unauthenticated