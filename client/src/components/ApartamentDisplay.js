import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import ImageToDisplay from "./ImageToDisplay";
import "../App.css";
import Map from "./Map";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import utils from "./utils";

export default function ApartamentDisplay(props) {
  let { id } = useParams();
  let [apartments, setApartments] = useState({ props });
  let [apartmentToDisplay, setApartmentToDisplay] = useState({});

  useEffect(() => {
    api.getOneApartment(id).then((response) => {
      setApartmentToDisplay(response.data);
    });
  }, [id]);

  return (
    <div className="container border-card">
      <Table responsive="text-center">
        <tbody className="">
          <tr>
            <td>
              <div class="bg-white border rounded-lg overflow-hidden">
                <ImageToDisplay />
                <div class="p-6">
                  <div class="flex items-baseline">
                    <span class="inline-block bg-teal-200 text-teal-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide">
                      New
                    </span>
                    <div class="ml-2 text-gray-600 text-xs uppercase font-semibold tracking-wide">
                      {apartmentToDisplay.numBedrooms} bedrooms &bull;
                      {apartmentToDisplay.numBathrooms} baths &bull;{" "}
                      {apartmentToDisplay.numParking} Parking Space(s)
                    </div>
                  </div>
                  <h4 class="mt-1 font-semibold text-lg leading-tight truncate">
                    <strong>
                      {" "}
                      Modern Home in {apartmentToDisplay.location}{" "}
                    </strong>
                  </h4>
                  <div class="mt-1">
                    {utils.formatCurrency(apartmentToDisplay.monthlyRent || 0)}
                    <span class="text-gray-600 text-sm"> / month</span>
                  </div>
                  <div class="mt-2 flex items-center">
                    <span class="ml-2 text-gray-600 text-sm"> Description</span>
                  </div>
                  <h5 class="mt-1 font-semibold text-lg leading-tight truncate">
                    {" "}
                    {apartmentToDisplay.description}
                  </h5>
                </div>
              </div>
            </td>

            <td className="mb-0">
              <Map />
              <div className="card-body">
                <div className="row d-flex justify-content-around">
                  <div className="col d-flex justify-content-center">
                    <a href="/search" className="btn btn-info btn-lg">
                      Go back to the search
                    </a>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
