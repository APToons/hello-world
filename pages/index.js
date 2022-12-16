import SlotMachine from './SlotMachine';
import styles from '../styles/Home.module.css'
import SelectWallet from '../components/SelectWallet';
import { useEffect, useState } from 'react';

export default function Home() {
  const [show, setShow] = useState(false);

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
                        <ul class="navbar-nav align-items-lg-center ms-auto me-lg-5">
                            <li class="nav-item">
                                <a class="nav-link click-scroll" href="https://aptoons.vercel.app/">Home</a>
                            </li>
     
                            <li class="nav-item">
                                <a class="nav-link " href="https://aptoons.vercel.app/discover.html">Discover Aptos</a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link click-scroll" href="#">Aptos Reels</a>
                            </li>
                            
                            <button class="glow-on-hover-2" type="button" onClick={() => { setShow(true) }}>
                              <span class="">Connect</span>
                            </button>
                        </ul>
                        


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
