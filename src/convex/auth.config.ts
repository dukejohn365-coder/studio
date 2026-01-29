import { AuthConfig } from "convex/server";

// We read the CLERK_JWT_ISSUER_DOMAIN from the environment variables.
// This is a critical step for Convex to verify authentication tokens.
let clerkIssuerDomain = process.env.CLERK_JWT_ISSUER_DOMAIN;

// To make the setup more robust, we'll automatically remove any trailing slash
// from the URL, which is a common copy-paste error.
if (clerkIssuerDomain && clerkIssuerDomain.endsWith('/')) {
  clerkIssuerDomain = clerkIssuerDomain.slice(0, -1);
}

if (!clerkIssuerDomain) {
  // This is a common error. You need to set the CLERK_JWT_ISSUER_DOMAIN
  // environment variable on the Convex dashboard.
  //
  // 1. Go to your Clerk dashboard -> JWT Templates -> convex
  // 2. Copy the "Issuer" URL. It should look like: https://<your-app>.clerk.accounts.dev
  // 3. Go to your Convex dashboard -> Settings -> Environment Variables
  // 4. Add a new variable named CLERK_JWT_ISSUER_DOMAIN and paste the URL.
  //    **DOUBLE CHECK for any typos or extra characters.**
  // 5. Run `npx convex deploy` to apply the changes.
  //
  // If the error persists after this, it means the variable is still not set correctly
  // in your Convex project's environment.
  throw new Error(
    "CLERK_JWT_ISSUER_DOMAIN environment variable not set. Please set this on the Convex dashboard."
  );
}

export default {
  providers: [
    {
      domain: clerkIssuerDomain,
      applicationID: "convex",
    },
  ]
} satisfies AuthConfig;
