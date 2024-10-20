import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CarImages, CarListing } from "./../../../configs/Schema";
import { eq, desc } from "drizzle-orm"; // Make sure to import `desc` for sorting
import { useUser } from "@clerk/clerk-react";
import { db } from "./../../../configs";

const MyListing = () => {
  const { user } = useUser();
  const [listings, setListings] = useState([]);

  useEffect(() => {
    if (user) {
      GetUserCarListing();
    }
  }, [user]);

  const GetUserCarListing = async () => {
    try {
      const result = await db
        .select()
        .from(CarListing)
        .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
        .where(
          eq(CarListing.createdBy, user?.primaryEmailAddress?.emailAddress)
        ) // Ensure user email is checked correctly
        .orderBy(desc(CarListing.id)); // Import `desc` and use for sorting

      setListings(result); // Save the fetched listings to state
      console.log(result); // Optional: Check result in console
    } catch (error) {
      console.error("Error fetching listings:", error); // Handle potential errors
    }
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl">My Listings</h2>
        <Link to={"/add-listing"}>
          <Button>+ Add New Listing</Button>
        </Link>
      </div>

      {/* Listings display */}
      {listings.length > 0 ? (
        <div className="mt-6">
          {listings.map((listing, index) => (
            <div key={index} className="border p-4 mb-4 rounded-lg">
              <h3 className="font-semibold text-xl">
                {listing.CarListing.title}
              </h3>
              {/* Optionally render car images if they exist */}
              {listing.CarImages?.url && (
                <img
                  src={listing.CarImages.url}
                  alt="Car"
                  className="w-full h-48 object-cover mt-2"
                />
              )}
              {/* Add other fields as needed */}
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-6">No listings found.</p>
      )}
    </div>
  );
};

export default MyListing;
