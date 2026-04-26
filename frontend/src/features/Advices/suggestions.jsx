import React from "react";
import "../../styles/Suggestions.css";

const ImageGrid = () => {

  const imageUrl = "https://images.unsplash.com/photo-1727434032773-af3cd98375ba?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"; // random nature image from Unsplash

  return (
    <div className="grid-container">
      <div className="image-wrapper top-left">
        <img src={imageUrl} alt="Sample 1" />
      </div>
      <div className="image-wrapper top-right">
        <img src={imageUrl} alt="Sample 2" />
      </div>
      <div className="image-wrapper bottom-left">
        <img src={imageUrl} alt="Sample 3" />
      </div>
      <div className="image-wrapper bottom-right">
        <img src={imageUrl} alt="Sample 4" />
      </div>
    </div>
  );
};

export default ImageGrid;