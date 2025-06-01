import React from 'react'

export default function BackgroundImage(props) {
    const bg_images = {
        "wall-0": "./images/wallpapers/spydr_background.png",
        "wall-1": "./images/wallpapers/lando.jpg",
        "wall-2": "./images/wallpapers/mclaren.webp",
        "wall-3": "./images/wallpapers/f1.jpg",
    };
    return (
        <div style={{ backgroundImage: `url(${bg_images[props.img]})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPositionX: "center" }} className="bg-ubuntu-img absolute -z-10 top-0 right-0 overflow-hidden h-full w-full">
        </div>
    )
}
