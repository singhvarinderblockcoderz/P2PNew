import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CustomizeConnectButton } from "../Component/ui/ConnectButton";
import { useAccount, useDisconnect } from "wagmi";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function login() {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  // const { disconnect } = useDisconnect();
  const { address } = useAccount();
  console.log({ address }, "to get the address");

  useEffect(() => {
    if (address) {
      console.log(address, "addresssssss");
      localStorage.setItem("address", address);
      setShow(true);
      formSubmitHandler();
    }
    if (!address) {
      setShow(false);
    }
  }, [address]);

  // const disconnectWallet = async () => {
  //   disconnect();
  //   // refreshState();
  // };

  async function walletCheck(data) {
    try {
      let res = await axios.post("/api/login/walletCheck", data);
      const response = res.data;
      console.log(
        response.data,
        "to get the response from api to send address"
      );
      const tokenData = response.data.data;
      localStorage.setItem("token", tokenData);
      if (tokenData) {
        setShow(false);
        setShow2(true);
      }
      if (!tokenData) {
        setShow(true);
        setShow2(false);
      }

      setShow(true);
    } catch (err) {
      console.log(err);
      setShow(false);
      setShow2(false);
      // toast.error("User Already exist");
      // setTimeout(() => {
      //   disconnectWallet();
      // }, 1000);
    }
  }

  async function formSubmitHandler() {
    // event.preventDefault()

    const data = {
      address: address,
    };
    console.log(data, "address to send to api");
    walletCheck(data);
  }

  // function backFn(e) {
  //   e.preventDefault();

  //   setShow2(false);
  //   setShow(false);
  //   window.location.reload();
  // }

  return (
    <div>
      <section class="p2p-hero">
        <ToastContainer />
        <div class="p2p-herobox">
          <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
              <a class="navbar-brand" href="#" id="p2p-logo">
                {/* <img src="img/logo192-removebg-preview.png" alt="" /> */}
                P2P.HELP
              </a>
              <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#"></a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#"></a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#"></a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#"></a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div class="p2p-main">
            <div class="headline">
              <p>CONNECTING A DECENTRALIZED WORLD</p>
            </div>
            <div class="denet">
              <h2>Welcome to DeNet</h2>
              <p class="denet_p">A NEW AGE OF NETWORK MARKETING</p>

              <CustomizeConnectButton />

              <Modal
                show={show}
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <div className="modal-content" id="connect-content">
                  <div className="modal-body" id="connect-body">
                    <div className="connect-icon">
                      <img src="/tron.png" alt="" />
                    </div>
                    <p className="p2p-email" style={{ color: "white" }}>
                      {address}
                    </p>
                    <h6 style={{ textAlign: "center" }}>Hi There !</h6>
                    <div className="create-some">
                      <p className="some-text">
                        This wallet is not linked with any account if you wish
                        please create a new one
                      </p>
                    </div>
                  </div>
                  <div className="modal-footer" id="connect-footer">
                    <a href="/getStarted">
                      <button type="button" className="btn  connect-wallet">
                        Create Account
                      </button>
                    </a>
                  </div>
                </div>
              </Modal>

              <Modal
                show={show2}
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <div className="modal-content" id="connect-content">
                  <div className="modal-body" id="connect-body">
                    <div className="connect-icon">
                      <img src="/tron.png" alt="" />
                    </div>
                    <p className="p2p-email" style={{ color: "white" }}>
                      {address}
                    </p>
                    <h6 style={{ textAlign: "center" }}>Hi There !</h6>
                    <div className="create-some">
                      <p className="some-text">This wallet is Already exist</p>
                    </div>
                  </div>
                  <div className="modal-footer" id="connect-footer">
                    <Link href="/dashboard">
                      <button
                        type="button"
                        // onClick={backFn}
                        className="btn  connect-wallet"
                      >
                        LogIn
                      </button>
                    </Link>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
