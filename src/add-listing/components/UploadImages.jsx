import { Button } from "@/components/ui/button";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./../../../configs/firebaseConfig";
import React, { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { db } from "./../../../configs";
import { CarImages } from "./../../../configs/Schema";

const UploadImages = ({ triggerUploadImage, setLoader }) => {
  const [selectedFileList, setSelectedFileList] = useState([]);

  useEffect(() => {
    if (triggerUploadImage) {
      UploadImagesToServer();
    }
  }, [triggerUploadImage]);

  const onFileSelected = (event) => {
    const files = event.target.files;
    const fileArray = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );
    setSelectedFileList((prev) => [...prev, ...fileArray]);
  };

  const onImageRemove = (image) => {
    const filteredList = selectedFileList.filter((item) => item !== image);
    setSelectedFileList(filteredList);
  };

  const UploadImagesToServer = async () => {
    setLoader(true);
    if (selectedFileList.length === 0) {
      console.log("No files selected for upload.");
      setLoader(false);
      return; // Early return if no files to upload
    }

    for (const file of selectedFileList) {
      const fileName = `${Date.now()}_${file.name}`;
      const storageRef = ref(storage, `car-marketplace/${fileName}`);
      const metaData = {
        contentType: file.type,
      };

      try {
        const snapShot = await uploadBytes(storageRef, file, metaData);
        console.log("Uploaded File: ", snapShot);
        const downloadUrl = await getDownloadURL(storageRef);
        console.log("Download URL: ", downloadUrl);
        console.log("Trigger Upload Image ID: ", triggerUploadImage);

        const result = await db.insert(CarImages).values({
          imageUrl: downloadUrl,
          carListingId: triggerUploadImage,
        });
        console.log("Image saved to database: ", result);
      } catch (error) {
        console.error("Error uploading file: ", error);
      }
      setLoader(false);
    }
  };

  return (
    <div>
      <h2 className="font-medium text-xl my-3">Upload Car Images</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {selectedFileList.map((image, index) => (
          <div key={index} className="relative">
            <IoIosClose
              className="absolute m-2 text-lg text-white cursor-pointer"
              onClick={() => onImageRemove(image)}
            />
            <a
              href={URL.createObjectURL(image)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={URL.createObjectURL(image)}
                alt="Selected"
                className="w-full h-[130px] object-cover rounded-xl"
              />
            </a>
          </div>
        ))}
        <label htmlFor="upload-images">
          <div className="border rounded-xl border-dotted border-primary bg-blue-100 p-4 cursor-pointer hover:shadow-md">
            <h2 className="text-lg text-center text-primary">+</h2>
          </div>
        </label>
        <input
          onChange={onFileSelected}
          type="file"
          multiple={true}
          id="upload-images"
          className="opacity-0"
        />
      </div>
    </div>
  );
};

export default UploadImages;
