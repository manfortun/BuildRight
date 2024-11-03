import { useEffect, useState } from "react";
import Hero from "./Hero";

const PictureHero = ({ src, height = "800px", alt = "" }) => {

    return (
        <Hero alt={alt }>
            <div style={{ backgroundImage: `url('/assets/${src}')`, width: "100%", height: `${height}`, backgroundSize: "cover", backgroundPosition: "center" }} />
        </Hero>
    )
};

export default PictureHero;