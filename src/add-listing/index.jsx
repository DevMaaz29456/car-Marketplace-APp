import Header from "@/components/Header";
import React, { useState } from "react";
import InputField from "./components/InputField";
import carDetails from "../Shared/carDetails.json";
import DropdownField from "./components/DropdownField";
import TextAreaField from "./components/TextAreaField";
import { Separator } from "@/components/ui/separator";
import features from "./../Shared/features.json";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { db } from "./../../configs";
import { CarListing } from "./../../configs/Schema";
import IconsFields from "./components/IconsFields";
import UploadImages from "./components/UploadImages";
import { FiLoader } from "react-icons/fi";
// import { toast } from "../components/ui/sonner"; // Corrected import path
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import moment from "moment";

const AddListing = () => {
  const [formData, setFormData] = useState({});
  const [featureData, setFeatureData] = useState([]);
  const [triggerUploadImage, setTriggerUploadImage] = useState(null);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const { user } = useUser();

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFeatureChange = (name, value) => {
    if (value) {
      setFeatureData((prevData) => [...prevData, name]);
    } else {
      setFeatureData((prevData) =>
        prevData.filter((feature) => feature !== name)
      );
    }
  };

  const onSubmit = async (e) => {
    toast("Please wait....");
    e.preventDefault();
    setLoader(true);
    console.log(formData);

    try {
      const featuresJson = JSON.stringify(featureData);

      const result = await db
        .insert(CarListing)
        .values({
          ...formData,
          features: featuresJson, // Corrected feature data
          createdBy: user?.primaryEmailAddress?.emailAddress, // Correctly saving user email
          postedOn: moment().format("DD/MM/YYYY"), // Correctly saving date
        })
        .returning({ id: CarListing.id });

      if (result) {
        console.log("Data Saved");
        setTriggerUploadImage(result[0]?.id);
      }
    } catch (e) {
      console.log("Error", e);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="px-10 md:px-20 my-10">
        <h2 className="font-bold text-4xl">Add New Listing</h2>
        <form className="p-10 border rounded-xl mt-10" onSubmit={onSubmit}>
          {/* Car Details */}
          <div>
            <h2 className="font-md text-4xl mb-6">Car Details</h2>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
              {carDetails.carDetails.map((item, index) => (
                <div key={index}>
                  <label className="text-sm flex gap-2 items-center mb-1">
                    <IconsFields icon={item?.icon} />
                    {item.label}
                    {item.required && <span className="text-red-500">*</span>}
                  </label>
                  {item.fieldType === "text" || item.fieldType === "number" ? (
                    <InputField
                      item={item}
                      handleInputChange={handleInputChange}
                    />
                  ) : item.fieldType === "dropdown" ? (
                    <DropdownField
                      item={item}
                      handleInputChange={handleInputChange}
                    />
                  ) : item.fieldType === "textarea" ? (
                    <TextAreaField
                      item={item}
                      handleInputChange={handleInputChange}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
          <Separator className="my-6" />
          {/* Feature List */}
          <div>
            <h2 className="font-medium text-xl my-6">Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {features.features.map((item, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Checkbox
                    onCheckedChange={(value) =>
                      handleFeatureChange(item.name, value)
                    }
                  />
                  <h2>{item.label}</h2>
                </div>
              ))}
            </div>
          </div>

          {/* Car Images Section */}
          <Separator className="my-6" />
          <UploadImages
            triggerUploadImage={triggerUploadImage}
            setLoader={(v) => {
              setLoader(v);
              navigate("/profile");
            }}
          />

          {/* Submit Button */}
          <div className="mt-10 flex justify-end">
            <Button
              type="submit"
              disabled={loader}
              onClick={(e) => onSubmit(e)}
            >
              {!loader ? (
                "Submit"
              ) : (
                <FiLoader className="animate-spin text-lg " />
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddListing;
