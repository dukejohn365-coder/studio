# FocusFlow

FocusFlow is a modern, beautifully simple to-do list application designed to help you gain clarity, focus, and peace of mind. Built with Next.js, Convex, and Clerk, it provides a seamless and secure experience for managing your tasks.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **UI**: [React](https://react.dev/) & [ShadCN UI](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Backend & Database**: [Convex](https://www.convex.dev/)
- **Authentication**: [Clerk](https://clerk.com/)
- **AI**: [Genkit](https://firebase.google.com/docs/genkit)

## Getting Started

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

2.  Fill in the values in `.env.local` with your credentials from the [Clerk Dashboard](https://dashboard.clerk.com/) and [Convex Dashboard](https://dashboard.convex.dev/).

3.  Set the `CLERK_JWT_ISSUER_DOMAIN` in your Convex project's environment variables dashboard.

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

## Available Scripts

- `npm run dev`: Starts the Next.js development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts a production server.
- `npm run lint`: Runs the linter.
