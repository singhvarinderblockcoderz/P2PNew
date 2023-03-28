import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import contractInterface from "../contract-abi.json";
import { ContractInterface1 } from "../token-abi.json";
import { useAccount, usePrepareContractWrite, useContractWrite } from "wagmi";
import { useContractRead } from "wagmi";
import Approve from "./Approve";
// import Write from "../Component/Write";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import $ from "jquery";
import moment from "moment";
import Link from "next/link";

export default function Ewallet() {
  const [userData, setUserData] = useState();
  async function jQueryFunction() {
    $(document).on("click", "ul li", function () {
      $(this).addClass("active").siblings().removeClass("active");
    });
  }

  async function getUserStatus() {
    try {
      const token = localStorage.getItem("token");
      console.log(token, "to get token from localStorage");
      let res = await axios.post("/api/getUserStatus", {
        token: token,
      });
      const response = res.data;
      console.log(response, "to get response from api");
      setUserData(response.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    jQueryFunction();
    getUserStatus();
  }, []);

  return (
    <>
      <section class="e-wallet">
        <div class="container">
          <h4>E-WALLET</h4>
          <div class="wallet-card">
            <img src="/star.png" alt="" class="wallet-star" />
            <p>Wallet Balance (in tokens)</p>
            <span>{userData?.wallet}</span>
            <button
              type="button"
              class="btn btn-primary Withdraw"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Withdraw
            </button>

            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog dialog-withdraw">
                <div class="modal-content content-withdraw">
                  <div class="modal-header header-withdraw">
                    <button
                      type="button"
                      class="btn-close withdraw-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body body-withdraw">
                    <img src="/alert.png" alt="" />
                    <span>Are you sure ?</span>
                    <p>You want to request for withdrawl</p>
                    <input
                      type="text"
                      placeholder="Enter Value"
                      class="wallet-input"
                    />
                  </div>
                  <div class="modal-footer footer-withdraw">
                    <a href="" class="footer-ahead">
                      Yes Go Ahead !
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="wallet-table">
            <div class="accordion" id="accordionExample">
              <div class="accordion-item" id="ewallet-item">
                <h2 class="accordion-header ewallet-header" id="headingOne">
                  <button
                    class="accordion-button ewallet-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Transaction History
                  </button>
                  <div class="dropdown" id="e-dropdown">
                    <button
                      id="wallet-dropdown"
                      class="btn btn-secondary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src="/dropdown-arrow.png" alt="" />
                    </button>
                    <ul class="dropdown-menu" id="ewallet-ul">
                      <li class="ewallet-li">
                        <a class="dropdown-item edrop-a" href="#">
                          All
                        </a>
                      </li>
                      <li class="ewallet-li">
                        <a class="dropdown-item edrop-a" href="#">
                          Deposit
                        </a>
                      </li>
                      <li class="ewallet-li">
                        <a class="dropdown-item edrop-a" href="#">
                          Withdraw
                        </a>
                      </li>
                    </ul>
                  </div>
                </h2>
                <div
                  id="collapseOne"
                  class="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body" id="eaccordian-body">
                    <table class="table">
                      <thead>
                        <tr>
                          <th></th>
                          <th>Transaction Id</th>
                          <th>Token</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <img src="/Group 1.png" alt="" />
                          </td>
                          <td>
                            <div class="wallet-td">
                              <span>#84592</span>
                              <p>
                                Deposit .<span>11-8-2022</span>
                              </p>
                            </div>
                          </td>
                          <td class="wallet-point">25.00</td>
                        </tr>
                        <tr>
                          <td>
                            <img src="/Group 2.png" alt="" />
                          </td>
                          <td>
                            <div class="wallet-td">
                              <span>#84592</span>
                              <p>
                                Withdraw .<span>11-8-2022</span>
                              </p>
                            </div>
                          </td>
                          <td class="wallet-point">25.00</td>
                        </tr>
                        <tr>
                          <td>
                            <img src="/Group 2.png" alt="" />
                          </td>
                          <td>
                            <div class="wallet-td">
                              <span>#84592</span>
                              <p>
                                Withdraw .<span>11-8-2022</span>
                              </p>
                            </div>
                          </td>
                          <td class="wallet-point">25.00</td>
                        </tr>
                        <tr>
                          <td>
                            <img src="/Group 2.png" alt="" />
                          </td>
                          <td>
                            <div class="wallet-td">
                              <span>#84592</span>
                              <p>
                                Withdraw .<span>11-8-2022</span>
                              </p>
                            </div>
                          </td>
                          <td class="wallet-point">25.00</td>
                        </tr>
                        <tr>
                          <td>
                            <img src="/Group 2.png" alt="" />
                          </td>
                          <td>
                            <div class="wallet-td">
                              <span>#84592</span>
                              <p>
                                Withdraw .<span>11-8-2022</span>
                              </p>
                            </div>
                          </td>
                          <td class="wallet-point">25.00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="bottom-nav">
        <div class="container">
          <div class="bottomnav-head">
            <ul>
              <li class="active">
                <Link href="/dashboard">
                  <img src="/dashboard.png" alt="" />
                </Link>
              </li>
              <li>
                <a href="genealogy.html">
                  <img src="/member_tree.png" alt="" />
                </a>
              </li>
              <li>
                <Link href="/incentive">
                  <img src="/incentive.png" alt="" />
                </Link>
              </li>
              <li>
                <Link href="/ewallet">
                  <img src="/wallet.png" alt="" />
                </Link>
              </li>
              <li>
                <a>
                  <img src="/user.png" alt="" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
