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

export default function Dashboard() {
  const [userData, setUserData] = useState();
  // const [p2ptotrx, setP2pToTrx] = useState();
  // const [p2ptousdt, setP2ptoUsdt] = useState();
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

  // async function getTrxToUSDT() {
  //   try {
  //     let res = await axios.get(
  //       "https://api.coingecko.com/api/v3/simple/price?ids=tron&vs_currencies=usd"
  //     );
  //     const response = res.data;
  //     console.log(response, "to get response from api trx");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // async function getP2pToTRX() {
  //   try {
  //     let end_ts = moment().unix();
  //     let start_ts = moment().subtract(7, "days").unix();
  //     let res = await axios.get(
  //       `https://apilist.tronscan.io/api/justswap/kline?token_address=TCuM5Er3BJ6tYTEp12MCZkWgPTjGqK5hEM&granularity=5min&time_start=${start_ts}&time_end=${end_ts}&type=1`
  //     );
  //     const response = res.data;
  //     console.log(response, "to get resonse from api for p2p to trx");
  //     setP2pToTrx(response.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // async function getP2pToUSDT() {
  //   try {
  //     let end_ts = moment().unix();
  //     let start_ts = moment().subtract(2, "days").unix();
  //     let res = await axios.get(
  //       `https://apilist.tronscan.io/api/justswap/kline?token_address=TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t&granularity=5min&time_start=${start_ts}&time_end=${end_ts}&type=1`
  //     );
  //     const response = res.data;
  //     console.log(response, "to get resonse from api for p2p to usd");
  //     setP2ptoUsdt(response.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // const convertedAmount = async () => {
  //   // const p2pToUSD = await getP2pToTRX();
  //   // const p2pToUSDT = await getP2pToUSDT();
  //   // console.clear();
  //   const _p2p = await p2ptotrx;
  //   const _usdt = await p2ptousdt;
  //   console.log(_usdt, "usdt");

  //   const defaultValue = 70;
  //   let p2pPrice = 0;
  //   let usdtPrice = 0;
  //   let coinsInUsdt = 0;

  //   for (const key in _p2p) {
  //     let isFound = _p2p[key].base_symbol === "P2P";
  //     console.log("p2p price======>>>>", _p2p[key]);
  //     console.log("P2P", isFound);
  //     if (isFound) {
  //       p2pPrice = parseFloat(_p2p[key].price);
  //       break;
  //     }
  //   }

  //   for (const key in _usdt) {
  //     let isFound = _usdt[key].base_symbol === "USDT";
  //     console.log("USDT", isFound);
  //     if (isFound) {
  //       usdtPrice = parseFloat(_usdt[key].price);
  //       break;
  //     }
  //   }
  //   console.log("p2pPrice", p2pPrice);
  //   console.log("usdtPrice", usdtPrice);
  //   if (p2pPrice > 0 && usdtPrice > 0) {
  //     let p2pInUsdt = p2pPrice / usdtPrice;
  //     console.log("valuep2pusd", p2pInUsdt);
  //     coinsInUsdt = defaultValue / p2pInUsdt;
  //   }
  //   console.log("cakdsf", coinsInUsdt);
  //   return p2pPrice;
  // };

  useEffect(() => {
    jQueryFunction();
    getUserStatus();
    // getTrxToUSDT();
    // getP2pToUSDT();
    // getP2pToTRX();
    // convertedAmount();
  }, []);

  return (
    <>
      <section class="dashboard">
        <h4>DASHBOARD</h4>
        <div class="dashboard-head">
          <img src="/Hi.gif" alt="" />
        </div>
        <div class="dashboard-upper">
          <div class="dashboard-box">
            <h6>My Information</h6>
            <div class="dashboard-row">
              <p class="dash-blue">Name</p>
              <p>{userData?.userDetail[0]?.firstName}</p>
            </div>
            <div class="dashboard-row">
              <p class="dash-blue">Wallet Address</p>
              <p>{userData?.userDetail[0]?.tronAddress}</p>
            </div>
            <div class="dashboard-row">
              <p class="dash-blue">Referral Link</p>
              <p>
                <a
                  href="http://10.1.1.100:3000/referral/TCJS4GjExrgBrqHuEQg81V1mnpKUhq43J8"
                  target="_blank"
                >
                  {userData?.userDetail[0]?.referCode}
                </a>
              </p>
            </div>
          </div>
          <div class="dashboard-box">
            <h6>Security Status</h6>
            <div class="dashboard-row">
              <p class="dash-blue">Two Factor Authentication</p>
              <p>Off</p>
            </div>
            <div class="dashboard-row">
              <p class="dash-blue">Human Identification</p>
              <p>Unrecogonized</p>
            </div>
          </div>
        </div>
        <div class="dashboard-lower">
          <div class="dashlower-left">
            <span>27.30</span>
            <img src="/tron.png" alt="" />
          </div>
          <div class="dashlower-right">
            <span>491.5763</span>
            <img src="/tron.png" alt="" />
          </div>
        </div>
      </section>
      <section class="dashboard-rewards">
        <h4>REWARDS</h4>
        <div class="rewardboard-upper">
          <div class="rewardupper-left">
            <img src="/tron.png" alt="" />
            <span>{userData?.directIncome || "1000"}</span>
            <p>Direct Reward</p>
          </div>
          <div class="rewardupper-right">
            <img src="/tron.png" alt="" />
            <span>{userData?.levelIncome || "1000"}</span>
            <p>Level Reward</p>
          </div>
        </div>
        <div class="rewardboard-upper">
          <div class="rewardupper-row">
            <img src="/tron.png" alt="" />
            <p>Matching Reward</p>
            <div class="reward-dash">
              <div class="some">
                <span>{userData?.matchingIncome || "1000"}</span>
                <p>Number's Reward</p>
              </div>
              <div class="some">
                <span>{userData?.levelRewards || "1000"}</span>
                <p>Amount's Rewards</p>
              </div>
            </div>
          </div>
        </div>
        <div class="rewardboard-upper">
          <div class="rewardupper-left">
            <img src="/tron.png" alt="" />
            <span>{userData?.stakingRewards || "1000"}</span>
            <p>Staking Rewards</p>
          </div>
          <div class="rewardupper-right">
            <img src="/tron.png" alt="" />
            <span>{userData?.wallet || "1000"}</span>
            <p>Total Reward</p>
          </div>
        </div>
      </section>
      <section class="dashboard-team">
        <h4>TEAM SIZE</h4>
        <div class="team-direct">
          <h6>Direct Reference</h6>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Particular</th>
                <th scope="col">Left</th>
                <th scope="col">Right</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Number</td>
                <td class="table-blue">{userData?.totalLeftCount}</td>
                <td class="table-blue">{userData?.totalRightCount}</td>
              </tr>
              <tr>
                <td>Amount</td>
                <td class="table-blue">{userData?.leftAmount || "500"}</td>
                <td class="table-blue">{userData?.rightAmount || "400"}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="team-direct">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Particular</th>
                <th scope="col">Left No.</th>
                <th scope="col">Right No.</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Total</td>
                <td>{userData?.totalLeftCount}</td>
                <td class="table-blue">{userData?.totalRightCount}</td>
              </tr>
              <tr>
                <td>Matched</td>
                <td> {userData?.totalLeftMatched || "500"}</td>
                <td class="table-blue">
                  {" "}
                  {userData?.totalRightMatched || "400"}
                </td>
              </tr>
              <tr>
                <td>Other</td>
                <td>{userData?.totalLeftOthers || "500"}</td>
                <td class="table-blue">{userData?.totalLeftOthers || "400"}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="team-direct">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Particular</th>
                <th scope="col">Left No.</th>
                <th scope="col">Right No.</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Total</td>
                <td class="table-blue">{userData?.totalLeftCount || "5"}</td>
                <td>{userData?.totalRightCount}</td>
              </tr>
              <tr>
                <td>Matched</td>
                <td class="table-blue">
                  {userData?.totalLeftMatched || "500"}
                </td>
                <td>{userData?.totalRightMatched || "400"}</td>
              </tr>
              <tr>
                <td>Other</td>
                <td class="table-blue">{userData?.totalLeftOthers || "500"}</td>
                <td>{userData?.totalLeftOthers || "400"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section class="bottom-nav">
        <div class="container">
          <div class="bottomnav-head">
            <ul>
              <li class="active">
                <a href="dashboard.html">
                  <img src="/dashboard.png" alt="" />
                </a>
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
