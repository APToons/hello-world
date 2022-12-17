import SlotMachine from './SlotMachine';
import styles from '../styles/Home.module.css'
import SelectWallet from '../components/SelectWallet';
import { useEffect, useState } from 'react';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';

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
            return "https://fullnode.testnet.aptoslabs.com/v1"
    }
}

const aptos_client = new aptos.AptosClient(getNode());
const OCTAS = 100000000;


const getBalance = async (address) => {
  try {
      //let resp = await axios.get(`${NODE_URL}/accounts/${address}/resource/0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>`);
      let resp = await aptos_client.getAccountResource(address, '0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>')
      return Number(resp.data.coin.value / OCTAS);
  } catch (error) {
      console.log(error);
  }
}

export default function Home() {
  const [show, setShow] = useState(false);
  const [balance, setBalance] = useState(0);

  const {
    disconnect,
    account,
    connected,
    wallet
  } = useWallet();

  useEffect(() => {
    init();
  }, [connected]);

  const init = async () => {
    try {
      let balance = await getBalance(account.address);
      setBalance(balance);


    } catch (error) {
      toast.error("Please refresh your page");
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
    )
  }
  return (
    <div >
      
      <nav class="navbar navbar-expand-lg">
                <div class="container">
                    <a class="navbar-brand" href="index.html">
                        APToons
                    </a>

                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
    
                    <div class="collapse navbar-collapse" id="navbarNav">
                        {
                          connected ?

                          <ul class="navbar-nav align-items-lg-center ms-auto me-lg-5">
                            
                            <li class="nav-item">
                                <a class="nav-link click-scroll" href="#">Aptos Reels</a>
                            </li>
                            
                            <li class="nav-item">
                                <a class="nav-link" href="#"> | </a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link" href="#"> Balance: {balance}</a>
                            </li>
                          </ul>
                          
                          :
                        
                          <ul class="navbar-nav align-items-lg-center ms-auto me-lg-5">
                            
                            <li class="nav-item">
                                <a class="nav-link click-scroll" href="#">Aptos Reels</a>
                            </li>

                            
                            <button class="glow-on-hover-2" type="button" onClick={() => { setShow(true) }}>
                              <span  class="">Connect</span>
                            </button>
                          </ul>

                        }
                    </div>
                </div>
            </nav>
            
                
    <div class="hero-section">
      <SlotMachine
        numSlots={3}
        slotValues={['🍒', '🍊', '🍋', '🍉', '🍇']}
        spinTime={1000}
      />
    </div>

    <SelectWallet show={show} setShow={setShow} />
    </div>
  )
}
