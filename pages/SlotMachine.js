import React from 'react';
import { useState, useEffect } from 'react';

const SlotMachine = ({ numSlots, slotValues, spinTime }) => {
  const [slots, setSlots] = useState(
    numSlots > 0 && slotValues ? Array(numSlots).fill(slotValues[0]) : []
  );


  const spin = () => {
    const newSlots = [];
    for (let i = 0; i < numSlots; i++) {
      const randomIndex = Math.floor(Math.random() * slotValues.length);
      newSlots.push(slotValues[randomIndex]);
    }
    setSlots(newSlots);
  };

  useEffect(() => {
    const timeout = setTimeout(spin, spinTime);
    return () => clearTimeout(timeout);
  }, [spinTime]);

  return (
    <div>
      {slots.map((slot, index) => (
        <div key={index}>{slot}</div>
      ))}
      <button onClick={spin}>Spin!</button>
    </div>
  );
};

export default SlotMachine
