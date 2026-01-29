import { AuthConfig } from "convex/server";

const clerkIssuerDomain = process.env.CLERK_JWT_ISSUER_DOMAIN;

if (!clerkIssuerDomain) {
  // This is a common error. You need to set the CLERK_JWT_ISSUER_DOMAIN
  // environment variable on the Convex dashboard.
  //
  // 1. Go to your Clerk dashboard -> JWT Templates -> convex
  // 2. Copy the "Issuer" URL.
  // 3. Go to your Convex dashboard -> Settings -> Environment Variables
  // 4. Add a new variable named CLERK_JWT_ISSUER_DOMAIN and paste the URL.
  // 5. Run `npx convex deploy` to apply the changes.
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
