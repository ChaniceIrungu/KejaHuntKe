import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import utils from "./utils";

export default function ListAll() {
  const [allList, setList] = useState([]);

  const getAllApartments = () => {
    api.getAllApartments().then((response) => {
      // console.log(response.data);
      setList(response.data);
    });
  };

  useEffect(() => {
    getAllApartments();
  }, []);

  return (
    <div className="container " style={{ width: "100%", objectFit: "cover" }}>
      <ul className="row row-cols-2">
        {allList.map((apartment) => (
          <li
            key={apartment.id}
            className="list-group-item d-flex justify-content-between"
          >
            <span>
              <Link to={`apartments/${apartment.id}`}>
                <img src="/house2.jpg" alt="ERROR" className="img-fluid w-80" />
              </Link>
              <div class="p-6">
                <div class="flex items-baseline">
                  <span class="inline-block bg-teal-200 text-teal-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide">
                    New
                  </span>
                  <div class="ml-2 text-gray-600 text-xs uppercase font-semibold tracking-wide">
                    {apartment.numBedrooms} bedrooms &bull;
                    {apartment.numBathrooms} baths &bull; {apartment.numParking}{" "}
                    Parking Space(s)
                  </div>
                </div>
                <h4 class="mt-1 font-semibold text-lg leading-tight truncate">
                  <strong> Modern Home in {apartment.location} </strong>
                </h4>
                <div class="mt-1">
                  {utils.formatCurrency(apartment.monthlyRent || 0)}
                  <span class="text-gray-600 text-sm"> / month</span>
                </div>
              </div>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
