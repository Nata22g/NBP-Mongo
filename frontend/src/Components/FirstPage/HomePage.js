import React from "react";
import videoBg from "../../Assets/bg.mp4"
import Footer from "./Footer";

export default function HomePage() {
  
  return (
    <div className="Homepage">
      <div>
        <div className="overlay"></div>
        <video src={videoBg} autoPlay loop muted />
        <div className="content" >
            <h1>SmartWalls</h1>
        </div>
      </div>
      <footer> <Footer /> </footer>
    </div>
   
  );
}
