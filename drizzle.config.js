import { defineConfig } from "drizzle-kit"
export default defineConfig({
    schema: "./utils/schema.jsx",
    dialect: "postgresql",
    dbCredentials: {
      // url: process.env.NEXT_PUBLIC_DATABASE_URL,
      url: "postgresql://neondb_owner:EtIeAa0SPV6d@ep-steep-resonance-a5kocyhn.us-east-2.aws.neon.tech/finly?sslmode=require",
    }
  })