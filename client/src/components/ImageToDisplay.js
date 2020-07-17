import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";

export default function ImageToDisplay() {
  let { id } = useParams();
  const [imagesToDisplay, setImageToDisplay] = useState([]);

  useEffect(() => {
    api.getOneApartmentImages(id).then((response) => {
      console.log(response.data);
      setImageToDisplay(response.data[0].img);
    });
  }, [id]);

  return (
    <div class="relative pb-2/3">
      {console.log(imagesToDisplay)}
      <img
        class="absolute h-full w-full object-cover"
        src={imagesToDisplay}
        alt="property.imageAlt"
      />
    </div>
  );
}
