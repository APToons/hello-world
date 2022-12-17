import { Modal } from "react-bootstrap"
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function SelectWallet({ show, setShow }) {

    const [isOptionsMore, setIsOptionMore] = useState(false);
    const handleClose = () => setShow(false);
    const {
        wallets,
        connect
    } = useWallet();

    useEffect(() => {
        sortInstalledWallet();
    }, []);

    const handleConnectWallet = async (name, readyState, url) => {
        if (readyState == "Installed") {
            toast.promise(
                connect(name),
                {
                    pending: 'Connecting to Wallet',
                    success: 'Wallet Connected!',
                    error: 'User Rejected'
                }
            )
            setIsOptionMore(false);
            setShow(false);
        } else {
            window.open(url, '_blank');
        }
    }

    const sortInstalledWallet = () => {
        wallets.sort((a, b) => {
            if (a.readyState < b.readyState) {
                return -1;
            }
            if (a.readyState > b.readyState) {
                return 1;
            }
            return 0;
        })
    }

    return (
        <div>
            <Modal centered show={show} onHide={handleClose}>
                <Modal.Body style={{ background: "#3E4551"}}>
                    <div>
                        <div className="container text-center">
                            <h4 className="mt-4 fw-bold" style={{ color: "#ffffff"}}>Connect Wallet</h4>
                        </div>
                        <div className="container mt-4">
                            {
                                wallets.map((wallet) => {
                                    return (
                                        <div>
                                            <button class="glow-on-hover-3 " type="button" onClick={() => { setShow(true) }}>
                                              <div key={wallet.adapter["name"]} onClick={async () => { await handleConnectWallet(wallet.adapter["name"], wallet.readyState, wallet.adapter["url"]) }} style={{ marginBottom: "20px" }} className={wallet.readyState == "Installed"}>
                                                <div className="align-items-center align-items-lg-center" style={{ marginTop: "20px"}}>
                                                  <img src={wallet.adapter["name"] == 'Fletch' ? "https://play-lh.googleusercontent.com/gDJDAI3PSjcbxMAdZz3YpP29VwNRwR4u34nC4vvp410LPqPSjNSiZZhQFcYPZegPeQ=w240-h480-rw" : wallet.adapter["icon"]} height="35" width="35" ></img>
                                                  <h5 className=" fw-bold" style={{ color: "#ffffff"}}>{wallet.adapter ? wallet.adapter["name"] : ""}<br></br></h5>
                                                  
                                                <div >
                                                {
                                                wallet.readyState == "Installed" ? (
                                                    <span className="badge bg-success mx-3" style={{ fontSize: "12px"}}>{wallet.readyState}</span>
                                                )
                                                    : <></>
                                                }
                                                </div>
                                                </div>
                                              </div>
                                            </button>

                                        </div>)
                                      })
                            }
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}