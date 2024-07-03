import React from "react";
import HomeLanding from "./HomeLanding";
import HomeAbout from "./HomeAbout";
import HomeAboutMaterials from "./HomeAboutMaterials";

export default function Home() {
  return (
    <div className="home">
      <HomeLanding />
      <HomeAbout />
      <HomeAboutMaterials />
    </div>
  );
}
