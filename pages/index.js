import SelectWallet from '../components/SelectWallet';
import { useEffect, useState } from 'react';
import { useWallet  } from '@manahippo/aptos-wallet-adapter';
import { ToastContainer, toast } from "react-toastify";
import { Modal } from "react-bootstrap";

//import { useTokens } from '../hooks/useTokens';

const axios = require('axios').default;
const aptos = require("aptos");
const getNode = (network) => {
    switch (network) {
        case "devnet":
            return "https://fullnode.devnet.aptoslabs.com/v1"
        case "testnet":
            return "https://fullnode.testnet.aptoslabs.com/v1"
        case "mainnet":
            return "https://fullnode.mainnet.aptoslabs.com/v1"
        default:
            return "https://fullnode.devnet.aptoslabs.com/v1"
    }
}
const aptos_client = new aptos.AptosClient(getNode());
const OCTAS = 100000000;

let lose_counter = 0;
let win_counter = 0;

const getBalance = async (address) => {
  try {
      let resp = await aptos_client.getAccountResource(address, '0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>')
      return Number(resp.data.coin.value / OCTAS);
  } catch (error) {
      console.log(error);
  }
}

export default function Home() {
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [balance, setBalance] = useState(0);
  const [tokens, setTokens] = useState(0);
  

  // Connection to aptos-wallet-adapter 
  const {
    account,
    connect,
    connected,
    wallet
  } = useWallet();

  useEffect(() => {
    init();
  }, [connected]);

  const balanceRefesh = async () => {
    let balance = await getBalance(account.address);
    setBalance(balance);
  }

  const init = async () => {
    try {
      if (connected && account)
      {
        let balance = await getBalance(account.address);
        setBalance(balance);
      }
    
    } catch (error) {
      toast.error("Please refresh your page", {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 5000
      });
      console.log("error");
    }
  }

  const disconectWallet = () => {
    toast.promise(
      disconnect(),
      {
        pending: 'Disconnecting to Wallet',
        success: 'Wallet Disconected!',
        error: 'User Rejected'
      }
    , { position: toast.POSITION.BOTTOM_LEFT,
      autoClose: 5000 });
  }

  const handleClose = () => setShowModal(false);

  const symbols = ['🍒', '🍋', '🍎', '🍌', '🍉', '💣'];

  const [reel1, setReel1] = useState('🍒');
  const [reel2, setReel2] = useState('🍒');
  const [reel3, setReel3] = useState('🍒');

  const [result, setResult] = useState('');
  const [winCounter, setWinCounter] = useState('');
  const [loseCounter,  setLoseCounter] = useState('');
 
  const [isSpinning, setIsSpinning] = useState(false);

  let winnings_amt = 0;

  const spin = async () => {

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

    setShowModal(true);

    winnings_amt = checkWinnings(combination);
    if (winnings_amt > 0) {
      setResult('You won devnet $APT!');
      win_counter++;

      if (connected) {
        try {
          const res = axios({
            method: 'POST',
            baseURL: 'https://faucet.devnet.aptoslabs.com',
            url: '/mint',
            params: {
              amount: winnings_amt * OCTAS,
              address: account.address,
            },
          });
          balanceRefesh();
          toast.success("Won", {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 2000
          });
        } catch (error) {
          console.log("error");
        }
      }

    } else {
      setResult('Sorry, you lost.');
      lose_counter++;
      toast.error("Lost", {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 2000
      });
    }

    setWinCounter(win_counter);
    setLoseCounter(lose_counter);
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
      <nav className='main-menu'>
        <div class="center" style={{marginTop: "200px", left: "50%"}}>
            <h1 style={{fontSize: "12px"}}><a href="https://aptoons.vercel.app/">
              <span>APToonsDAO</span>
              <span>APToonsDAO</span>
              <span>APToonsDAO</span> </a>
            </h1>
        </div>

        <ul>
          <img src="https://aptosfoundation.org/assets/logomark/PNG/Aptos_mark_WHT-1eeb072e4547ee306fa6898165772fcfaff9d561.png" class="aptosimg"></img>
          
          <li class="menu-title" style={{marginTop: "120px"}}>
            <p> APToonsDAO</p>
          </li>
          <li>
            <a href="https://hello-world-aptoons.vercel.app/">
              <span class="nav-text">
                About
              </span>
            </a>
          </li>
                        <li class="active">
                            <a href="https://hello-world-aptoons.vercel.app/">
                                <span class="nav-text">
                                    AptosReels
                                </span>
                            </a>
                        </li>
                        {
                          connected ?
                          <li class="">
                              <a>
                                  <span class="nav-text">
                                      Balance: {balance}
                                  </span>
                              </a>
                          </li>
                          :
                          <li class="active">
                              <a onClick={() => { setShow(true) }}>
                                  <span class="nav-text">
                                      Connect Wallet
                                  </span>
                              </a>
                          </li>
                          
                        }
                        <li class="">
                            <a href="https://aptoons.vercel.app/">
                                <span class="nav-text"> 
                                </span>
                            </a>
                        </li>
                        <li class="">
                            <a href="https://aptoons.vercel.app/">
                                <span class="nav-text">
                                    APToons NFT
                                </span>
                            </a>
                        </li>
                        <li class="">
                            <a href="https://aptoons.vercel.app/sneakpeek.html">
                                <span class="nav-text">
                                    Sneak Peek
                                </span>
                            </a>
                        </li>
                        <li class="menu-title"style={{marginTop: "20px"}}>
                            <p href="#">
                              Aptos
                            </p>
                        </li>
                        <li class="has-subnav">
                            <a href="#">
                                <span class="nav-text">
                                    Discover DeFi
                                </span>
                            </a>
                        </li>
                        <li class="has-subnav">
                            <a href="#">
                                <span class="nav-text">
                                    Discover NFTs
                                </span>
                            </a>
                        </li>
                        <li class="has-subnav">
                            <a href="#">
                                <span class="nav-text">
                                    Discover Tokens
                                </span>
                            </a>
                        </li>
                        <li class="menu-title" style={{marginTop: "20px"}}>
                            <p href="#">
                              Join Us!
                            </p>
                        </li>
                        <li>
                            <a href=" ">
                                <span class="nav-text">
                                    Discord
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span class="nav-text">
                                    Twitter
                                </span>
                            </a>
                        </li>
                    </ul>
                  
      </nav>
            
                
    <div class="hero-section" style={{ height: "1262px"}}>
      
    <div>
      <div class="container d-flex justify-content-center align-items-center">
        <div class="row" style={{ marginTop: "100px", paddingRight: "50px"}}>
                        <div class="col-12 mt-auto mb-5 text-center">
                            <small>APToons DAO Presents</small>

                            <h1 class="text-white mb-5">AptosReels</h1>

                            <small>One of, if not, the first Slot Machine built for Aptos.</small><br></br>
                            <small><i>Currently live on DEVNET</i></small><br></br>

                        </div>
          <div >
            
            <div style={{marginLeft: "300px"}} className="SlotMachine-slots justify-content-center align-items-center" id="sm">
              <div id="reel1" className="slot" >{reel1}</div>
              <div id="reel2" className="slot" >{reel2}</div>
              <div id="reel3" className="slot" >{reel3}</div>
            </div>

          </div>
        </div>
      </div>

      <div>
        {
          connected ?
          <div class="d-flex justify-content-center align-items-center" style={{ paddingRight: "50px"}}>

            <div class="row" style={{marginRight: "10px"}}>
              <div className="justify-content-center  ">
                <button id="spin-button" class="glow-on-hover" type="button" onClick={spin}> Spin! </button>
              </div>
            </div>

            <div class="row" style={{marginRight: "10px"}}>
              <div className="justify-content-center  ">
                <button class="glow-on-hover" type="button" onClick={reset}> Reset </button>
              </div>
            </div>

            <div className="d-flex justify-content-center align-items-center">
        </div>
          </div>
        :
        <div class="d-flex justify-content-center align-items-center">

          <div class="row" style={{marginRight: "10px"}}>
            <div className="justify-content-center  ">
              <button id="spin-button" class="glow-on-hover" type="button" onClick={spin}> DEMO Spin! </button>
            </div>
          </div>

          <div class="row" style={{marginRight: "10px"}}>
            <div className="justify-content-center  ">
              <button class="glow-on-hover" type="button" onClick={reset}> Reset </button>
            </div>
          </div>

        </div>
        }


        <div>
          <Modal left show={showModal} onHide={handleClose} style={{marginTop: "100px"}}>
            <Modal.Body style={{ background: "#3E4551"}}>
              <div>
                <div className="container text-center">
                  <h4 className="mt-4 fw-bold" style={{ color: "#ffffff"}}>Thanks for playing.</h4>
                </div>

                <div className="container mt-4 text-center">
                {
                  <div>
                    <p className="mt-4 fw-bold" style={{ color: "#ffffff"}}>{result}</p><br></br>
                    <h5 className="mt-4 fw-bold" style={{ color: "#ffffff"}}>SESSION STATS</h5>
                    <table className="container mt-4 text-center" style={{ }}>
                      <tr>
                        <th>Wins</th>
                        <th>Losses</th>
                      </tr>
                      <tr>
                        <td>{winCounter}</td>
                        <td>{loseCounter}</td>
                      </tr>
                    </table>
                  </div>
                }

              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  </div>

    </div>
    <ToastContainer />
    <SelectWallet show={show} setShow={setShow} />
    </div>
  )
}
