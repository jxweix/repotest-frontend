// Snowfall.tsx
import React from "react";
import "./snowfall.css";

interface SnowfallProps {
  numSnowflakes: number;
}

const Snowfall: React.FC<SnowfallProps> = ({ numSnowflakes }) => {
  const createSnowflake = () => {
    return (
      <div
        key={Math.random()}
        className="snowflake"
        style={{
          left: `${Math.random() * 100}vw`,
          animationDuration: `${Math.random() * 2 + 2}s`,
          animationDelay: `${Math.random()}s`,
        }}
      />
    );
  };

  const snowflakes = Array.from({ length: numSnowflakes }, createSnowflake);

  return <div className="snowfall">{snowflakes}</div>;
};

export default Snowfall;
