import React from "react";

const LogoProfilePicFlipCard = (props) => {
    return(
        <div className={props.className} >
            <img className={props.imgClassName} src={props.src} />
        </div>
    )
}

export default LogoProfilePicFlipCard;

