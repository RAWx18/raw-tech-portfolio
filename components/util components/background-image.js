import React from 'react'

export default function BackgroundImage(props) {
    const bg_images = {
        "wall-0": "./images/wallpapers/spydr_background.png",
    };
    return (
        <div style={{ backgroundImage: `url(${bg_images[props.img]})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPositionX: "center" }} className="bg-ubuntu-img absolute -z-10 top-0 right-0 overflow-hidden h-full w-full">
        </div>
    )
}
