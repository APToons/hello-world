import React from 'react';
import { useState, useEffect } from 'react';

import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { toast } from 'react-toastify';

const aptos = require("aptos");

const NODE_URL =  "https://fullnode.devnet.aptoslabs.com";
const FAUCET_URL =  "https://faucet.devnet.aptoslabs.com";

const aptosCoin = "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>";


const SlotMachine = ({ numSlots, slotValues, spinTime }) => {

  const {
    account
  } = useWallet();

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {

    } catch (error) {
        toast.error("Please refresh your page");
    }
  }
  
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
