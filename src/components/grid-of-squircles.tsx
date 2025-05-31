"use client";

import React, { useEffect, useState } from "react";

const GridOfSquircles: React.FC = () => {
  const gridSize = 6; // Number of squircles per row/column (adjust as needed)
  const [squircleStates, setSquircleStates] = useState<boolean[]>(
    Array(gridSize * gridSize).fill(false)
  );

  // Function to generate random timing for each squircle
  const getRandomTime = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    squircleStates.forEach((_, index) => {
      const toggleVisibility = () => {
        const showTime = getRandomTime(5000, 10000); // Random time between 1-5 seconds to show the squircle
        const hideTime = getRandomTime(1000, 40000); // Random time after showTime to hide the squircle

        // Toggle squircle visibility
        setSquircleStates((prevState) => {
          const newState = [...prevState];
          newState[index] = !newState[index]; // Toggle visibility
          return newState;
        });

        // Schedule next visibility toggle
        const nextToggleTime = squircleStates[index] ? hideTime : showTime;
        timers.push(setTimeout(toggleVisibility, nextToggleTime)); // Recursively toggle visibility
      };

      // Initial call to start toggling visibility for the squircle
      timers.push(setTimeout(toggleVisibility, getRandomTime(1000, 5000)));
    });

    // Cleanup timers on component unmount
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }); // Empty dependency array so the effect runs only once

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="absolute bottom-100 transform rotate-45">
        <div className="grid grid-cols-5 gap-6 ">
          {squircleStates.map((isVisible, index) => (
            <div
              key={index}
              className={`w-60 h-60 bg-acm-blue/10 rounded-[20%] transition-opacity duration-1000 ease-in-out ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GridOfSquircles;
