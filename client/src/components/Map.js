import React from "react";

export default function Maps() {
  return (
    <div
      className="position-static text-align-right display-inline-block"
      style={{ height: "400px", width: "450px" }}
    >
      <div
        className="overflow-hidden background-white!important"
        style={{ height: "400px", width: "450px" }}
      >
        <iframe
          style={{ width: "450px", height: "400px" }}
          src="https://maps.google.com/maps?q=Nairobi%20Haileselasie&t=k&z=13&ie=UTF8&iwloc=&output=embed"
          sytle={{
            frameborder: "0",
            scrolling: "yes",
            marginheight: "0",
            marginwidth: "0",
          }}
        >
          {" "}
        </iframe>
      </div>
    </div>
  );
}
