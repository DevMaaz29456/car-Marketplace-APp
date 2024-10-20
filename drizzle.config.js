/** @type { import("drizzle-kit").Config } */
export default {
  dialect: "postgresql", // Use "postgresql" for PostgreSQL
  schema: "./configs/Schema.js", // Your schema path
  out: "./drizzle", // Output folder for generated files
  dbCredentials: {
    url: "postgresql://car-marketplace_owner:WASQaMIY0m3D@ep-gentle-resonance-a8ua6wjr.eastus2.azure.neon.tech/car-marketplace?sslmode=require",
  },
};
