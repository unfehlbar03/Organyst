import { View, Text } from "react-native";
import React from "react";

const FlagIcon = ({ fill }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5 21V4H14L14.4 6H20V16H13L12.6 14H7V21H5Z" fill="white" />
    </svg>
  );
};

export default FlagIcon;
