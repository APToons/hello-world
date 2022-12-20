import React from 'react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Modal } from "react-bootstrap";




const SlotMachine = ({ numSlots, slotValues, spinTime }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  
  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {

    } catch (error) {
        toast.error("Please refresh your page");
    }
  }
  
  const symbols = ['🍒', '🍋', '🍎', '🍌', '🍉', '💣'];
  const [reel1, setReel1] = useState('🍒');
  const [reel2, setReel2] = useState('🍒');
  const [reel3, setReel3] = useState('🍒');
  const [result, setResult] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  let winnings_amt = 0;

  const spin = () => {

    if (isSpinning) {
      return;
    }

    setIsSpinning(true);

    setTimeout(() => {
      setIsSpinning(false);
    }, 1000);

    let combination = [
      getRandomSymbol(),
      getRandomSymbol(),
      getRandomSymbol()
    ];

    setReel1(combination[0]);
    setReel2(combination[1]);
    setReel3(combination[2]);

    setShow(true);

    winnings_amt = checkWinnings(combination);
    if (winnings_amt > 0) {
      setResult('You won $' + winnings_amt + '!');
    } else {
      setResult('Sorry, you lost.');
    }
  };

  function reset() {
    setResult('');
    setReel1('🍒');
    setReel2('🍒');
    setReel3('🍒');
  }
  function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
  }
  function checkWinnings(combination) {
    let cherryCount = 0;
    let lemonCount = 0;
    let appleCount = 0;
    let bannanaCount = 0;
    let melonCount = 0;
    let bombCount = 0;

    for (let i = 0; i < combination.length; i++) {
      if (combination[i] === '🍒') {
        cherryCount++;
      } else if (combination[i] === '🍋') {
        lemonCount++;
      } else if (combination[i] === '🍎') {
        appleCount++;
      } else if (combination[i] === '🍌') {
        bannanaCount++;
      } else if (combination[i] === '🍉') {
        melonCount++;
      } else if (combination[i] === '💣') {
        bombCount++;
      }
    }

    if (cherryCount === 3 || lemonCount === 3 || appleCount === 3 ||
      bannanaCount === 3 || melonCount === 3 || bombCount === 3 ) {
      return 50;
    } else if (lemonCount === 2 || appleCount === 2 || cherryCount === 2 ||
      bannanaCount === 2 || melonCount === 2 || bombCount === 2) {
      return 20;
    } else {
      return 0;
    }
  }

  return (
    <div>
      <div class="container d-flex justify-content-center align-items-center">
        <div class="row">
          <div className="col-12 mt-auto mb-5 ">
            
            <div className="SlotMachine-slots mb-5">
              <div id="reel1" className="SlotMachine-slot">{reel1}</div>
              <div id="reel2" className="SlotMachine-slot">{reel2}</div>
              <div id="reel3" className="SlotMachine-slot">{reel3}</div>
            </div>
          </div>
        </div>
      </div>

      <div class=" d-flex  justify-content-center align-items-center">
        <div class="row" style={{marginRight: "10px"}}>
          <div className="justify-content-center  ">
            <button class="glow-on-hover" type="button" onClick={spin}> Spin! </button>
          </div>
          </div>
        <div class="row"  style={{marginLeft: "10px"}}>
          <div className=" ">
            <button class="glow-on-hover" type="button" onClick={reset}> Reset </button>
          </div>
        </div>
      </div>

      <div>
            <Modal left show={show} onHide={handleClose}>
                <Modal.Body style={{ background: "#3E4551"}}>
                    <div>
                        <div className="container text-center">
                            <h4 className="mt-4 fw-bold" style={{ color: "#ffffff"}}>Thanks for playing.</h4>
                        </div>
                        <div className="container mt-4 text-center">
                            {
                                <div>
                                    <p className="mt-4 fw-bold" style={{ color: "#ffffff"}}>{result}</p>
                                </div>
                            }
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    </div>
  );
};

export default SlotMachine
