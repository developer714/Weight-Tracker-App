/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

export const UserSvgrepoCom = ({ color = "#50B498", className }) => {
  return (
    <svg
      className={`user-svgrepo-com ${className}`}
      fill="none"
      height="16"
      viewBox="0 0 16 16"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path"
        d="M7.99992 6.66683C9.47268 6.66683 10.6666 5.47292 10.6666 4.00016C10.6666 2.5274 9.47268 1.3335 7.99992 1.3335C6.52716 1.3335 5.33325 2.5274 5.33325 4.00016C5.33325 5.47292 6.52716 6.66683 7.99992 6.66683Z"
        stroke={color}
        strokeWidth="1.75"
      />
      <path
        className="path"
        d="M13.3334 11.6665C13.3334 13.3234 13.3334 14.6665 8.00008 14.6665C2.66675 14.6665 2.66675 13.3234 2.66675 11.6665C2.66675 10.0096 5.05456 8.6665 8.00008 8.6665C10.9456 8.6665 13.3334 10.0096 13.3334 11.6665Z"
        stroke={color}
        strokeWidth="1.75"
      />
    </svg>
  );
};

UserSvgrepoCom.propTypes = {
  color: PropTypes.string,
};
