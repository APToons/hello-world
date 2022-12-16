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
      <div class="container d-flex justify-content-center align-items-center">
        <div class="row">
          <div className="col-12 mt-auto mb-5 ">
            
            <div className="SlotMachine-slots mb-5">
              {slots.map((slot, index) => (
                <div key={index} className="SlotMachine-slot"> {slot} </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div class="container d-flex justify-content-center align-items-center">
        <div class="row">
          <div className="col-12 mt-auto mb-5 ">
            <button class="glow-on-hover" type="button" onClick={spin}> Spin! </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SlotMachine
