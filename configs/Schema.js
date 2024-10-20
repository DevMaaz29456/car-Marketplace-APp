import { pgTable, varchar, serial, json, integer } from "drizzle-orm/pg-core";

export const CarListing = pgTable("carListing", {
  id: serial("id").primaryKey(),
  listingTitle: varchar("listingTitle").notNull(),
  tagline: varchar("tagline"),
  originalPrice: varchar("originalPrice"),
  sellingPrice: varchar("sellingPrice").notNull(),
  category: varchar("category").notNull(),
  condition: varchar("condition").notNull(),
  make: varchar("make").notNull(),
  model: varchar("model").notNull(),
  year: varchar("year").notNull(),
  driveType: varchar("driveType"),
  transmission: varchar("transmission"),
  fuelType: varchar("fuelType").notNull(),
  mileage: varchar("mileage"),
  engineSize: varchar("engineSize"),
  cylinder: varchar("cylinder"),
  color: varchar("color").notNull(),
  door: varchar("door"),
  vin: varchar("vin").notNull(),
  offerType: varchar("offerType").notNull(),
  listingDescription: varchar("listingDescription"),
  features: json("features"),
  createdBy: varchar("createdBy").notNull(), // Field to store creator's email
  postedOn: varchar("postedOn"), // Field to store the date
});

export const CarImages = pgTable("carImages", {
  id: serial("id").primaryKey(),
  imageUrl: varchar("imageUrl").notNull(),
  carListingId: integer("carListingId").references(() => CarListing.id), // Foreign key reference to CarListing
});
