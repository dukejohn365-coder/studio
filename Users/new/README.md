# FocusFlow

FocusFlow is a modern, beautifully simple to-do list application designed to help you gain clarity, focus, and peace of mind. Built with Next.js, Convex, and Clerk, it provides a seamless and secure experience for managing your tasks.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **UI**: [React](https://react.dev/) & [ShadCN UI](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Backend & Database**: [Convex](https://www.convex.dev/)
- **Authentication**: [Clerk](https://clerk.com/)
- **AI**: [Genkit](https://firebase.google.com/docs/genkit)

## Getting Started (Local Development)

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 20.x or higher)
- [npm](https://www.npmjs.com/) or your package manager of choice

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

### Environment Variables

This project requires environment variables for Clerk and Convex.

1.  Create a `.env.local` file in the root of your project by copying the example file:
    ```bash
    cp .env.example .env.local
    ```

2.  Fill in the values in `.env.local` with your **development** credentials from the [Clerk Dashboard](https://dashboard.clerk.com/) and [Convex Dashboard](https://dashboard.convex.dev/).

3.  In your Convex project's dashboard, go to **Settings -> Environment Variables**. Add a new variable named `CLERK_JWT_ISSUER_DOMAIN` and set it to your Clerk "Issuer URL" from the JWT Template page. Run `npx convex deploy` to apply the change.

### Running the App

1.  Run the Convex development server in one terminal:
    ```bash
    npx convex dev
    ```

2.  Run the Next.js development server in another terminal:
    ```bash
    npm run dev
    ```

Open [http://localhost:9004](http://localhost:9004) with your browser to see the result.

## Deployment to Vercel

Follow these steps to deploy your application to Vercel.

### 1. Set Up Vercel Project

Import your GitHub repository into Vercel. Vercel will automatically detect that it is a Next.js project and configure the build settings.

### 2. Configure Environment Variables

You must set your **production** environment variables in the Vercel project settings. Go to your project in Vercel, then navigate to **Settings -> Environment Variables**. Add the following:

| Name                            | Value                                                                                                                                                                                                                           |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Your **production** Publishable Key from the [Clerk Dashboard](https://dashboard.clerk.com/) -> Your App -> API Keys.                                                                                                         |
| `CLERK_SECRET_KEY`              | Your **production** Secret Key from the [Clerk Dashboard](https://dashboard.clerk.com/) -> Your App -> API Keys.                                                                                                                  |
| `NEXT_PUBLIC_CONVEX_URL`        | Your **production** Convex URL from the [Convex Dashboard](https://dashboard.convex.dev/) -> Settings. **Note:** This is different from your development URL!                                                                        |

### 3. Update Clerk Paths for Production

Clerk needs to know your production URL for redirects.

1.  Go to the [Clerk Dashboard](https://dashboard.clerk.com/) and select your application.
2.  Navigate to **Paths**.
3.  Ensure the paths for "Sign In", "Sign Up", etc., are enabled and using your Vercel production domain (e.g., `https://your-app.vercel.app/sign-in`).

### 4. Deploy

With the environment variables and Clerk paths configured, trigger a new deployment from your Vercel project dashboard. Your app should now be live!

## Available Scripts

- `npm run dev`: Starts the Next.js development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts a production server.
- `npm run lint`: Runs the linter.
