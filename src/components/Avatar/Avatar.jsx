import React from "react";

const Avatar = ({ children, backgroundColor, px, py, color, borderRadius }) => {
  const style = {
    backgroundColor,
    padding: `${py} ${px}`,
    color: color || "black",
    textAlign: "center",
    textDecoration: "none",
    borderRadius,
  };
  return <div style={style}>{children}</div>;
};

export default Avatar;
