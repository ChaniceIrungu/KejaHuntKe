import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
export default function SearchList(props) {
  const [apartments, setApartments] = useState([]);
  const { search } = useLocation();
  const getAllApartments = () => {
    console.log(search);
    fetch(`/apartments${search}`)
      .then((response) => response.json())
      .then((response) => {
        setApartments(response);
      });
  };
  useEffect(() => {
    getAllApartments();
  }, [search]);
  return (
    <div>
      <ul className="my-3 list-group text-black">
        {apartments.map((apartment) => (
          <li
            key={apartment.id}
            className=" list-group-item d-flex justify-content-between"
          >
            <span>
              {apartment.location} {apartment.number_of_bedrooms}{" "}
              {apartment.parking_space} {apartment.monthly_rent}{" "}
              <img src={apartment.image} alt="" />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
