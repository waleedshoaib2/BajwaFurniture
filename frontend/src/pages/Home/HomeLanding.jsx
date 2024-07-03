import React from "react";
import { useNavigate } from "react-router-dom";
import homelanding from "./homelanding.jpg";
export default function HomeLanding() {
  const navigate = useNavigate();

  return (
    <div className="home__landing">
      <div
        className="home__landing__content"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <h1 className="home__landing__title">
          Discover Your Dream Space with Our Exquisite Furniture Collection
        </h1>
      </div>

      <img className="home__landing__image" src={homelanding} />
    </div>
  );
}
