import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import $ from "jquery";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import Accordion from "react-bootstrap/Accordion";

export default function Incentive() {
  const [userData, setUserData] = useState();
  const [search, setSearch] = useState();
  const [searchDate, setSearchDate] = useState();
  async function jQueryFunction() {
    $(document).on("click", "ul li", function () {
      $(this).addClass("active").siblings().removeClass("active");
    });
  }

  async function directIncentives() {
    try {
      const token = localStorage.getItem("token");
      console.log(token, "to get token from localStorage");
      let res = await axios.post("/api/getDirectIncentives", {
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
    directIncentives();
  }, []);

  async function directHandleDateSearch() {
    console.log(searchDate, "to get the date");
    setSearch(null);
    const value = searchDate;
    const filteredData = userData?.directIncome?.filter((item) => {
      const searchDate = item?.incomeDate;
      return searchDate.toLowerCase().includes(value.toLowerCase());
    });
    console.log(filteredData);
    setSearch(filteredData);
  }

  async function directWalletSearch(e) {
    console.log(e.target.value, "to search Wallet");
    const value = e.target.value;
    const filteredData = userData?.directIncome?.filter((item) => {
      const searchWallet = item?.tronAddress;
      return searchWallet?.toLowerCase().includes(value?.toLowerCase());
    });
    console.log(filteredData, "search fileteredData");
    setSearch(filteredData);
  }

  async function directCurrent(e) {
    console.log(e.target.value, "to get the value of current");
    const value = e.target.value;
    if (value == 0) {
      setSearch(null);
      directIncentives();
      return;
    }
    if (value == 1) {
      console.log(new Date().getMonth() + 1, "to get the month");
      const CurrentMonthData = new Date().getMonth() + 1;
      const filteredData = userData?.directIncome?.filter((item) => {
        const searchMonth = item?.incomeDate;
        const MonthArray = searchMonth.split("-");
        const Month = MonthArray[1];
        console.log(Month, "to get the month ");
        return Month == CurrentMonthData;
      });
      console.log(filteredData, "search fileteredData");
      setSearch(filteredData);
    }
    if (value == 2) {
      console.log(new Date().getFullYear(), "to get the month");
      const YearData = new Date().getFullYear();
      const filteredData = userData?.directIncome?.filter((item) => {
        const searchYear = item?.incomeDate;
        const YearArray = searchYear.split("-");
        const year = YearArray[0];
        console.log(year, "to get the month ");
        return year?.includes(YearData);
      });
      console.log(filteredData, "search fileteredData");
      setSearch(filteredData);
    }
  }

  async function directLast(e) {
    console.log(e.target.value, "to get the value of current");
    const value = e.target.value;

    if (value == 0) {
      setSearch(null);
      directIncentives();
      return;
    }
    if (value == 1) {
      console.log(new Date().getMonth(), "to get the month");
      const LastMonthData = new Date().getMonth();
      const filteredData = userData?.directIncome?.filter((item) => {
        const searchMonth = item?.incomeDate;
        const MonthArray = searchMonth.split("-");
        const Month = MonthArray[1];
        console.log(Month, "to get the month ");
        return Month?.includes(LastMonthData);
      });
      console.log(filteredData, "search fileteredData");
      setSearch(filteredData);
    }
    if (value == 2) {
      console.log(new Date().getFullYear() - 1, "to get the month");
      const LastYearData = new Date().getFullYear() - 1;
      const filteredData = userData?.directIncome?.filter((item) => {
        const searchYear = item?.incomeDate;
        const YearArray = searchYear.split("-");
        const year = YearArray[0];
        console.log(year, "to get the month ");
        return year?.includes(LastYearData);
      });
      console.log(filteredData, "search fileteredData");
      setSearch(filteredData);
    }
  }

  async function matchingHandleDateSearch() {
    console.log(searchDate, "to get the date");
    setSearch(null);
    const value = searchDate;
    const filteredData = userData?.binaryIncome?.filter((item) => {
      const searchDate = item?.incomeDate;
      return searchDate.toLowerCase().includes(value.toLowerCase());
    });
    console.log(filteredData);
    setSearch(filteredData);
  }

  async function matchingWalletSearch(e) {
    console.log(e.target.value, "to search Wallet");
    const value = e.target.value;
    const filteredData = userData?.binaryIncome?.filter((item) => {
      const searchWallet = item?.tronAddress;
      return searchWallet?.toLowerCase().includes(value?.toLowerCase());
    });
    console.log(filteredData, "search fileteredData");
    setSearch(filteredData);
  }

  async function matchingCurrent(e) {
    console.log(e.target.value, "to get the value of current");
    const value = e.target.value;
    if (value == 0) {
      setSearch(null);
      directIncentives();
      return;
    }
    if (value == 1) {
      console.log(new Date().getMonth() + 1, "to get the month");
      console.log(new Date().getMonth(), "to get the month");
      const CurrentMonthData = new Date().getMonth() + 1;
      const LastMonthData = new Date().getMonth();
      const filteredData = userData?.binaryIncome?.filter((item) => {
        const searchMonth = item?.incomeDate;
        const MonthArray = searchMonth.split("-");
        const Month = MonthArray[1];
        console.log(Month, "to get the month ");
        return Month?.includes(LastMonthData && CurrentMonthData);
      });
      console.log(filteredData, "search fileteredData");
      setSearch(filteredData);
    }
    if (value == 2) {
      console.log(new Date().getFullYear(), "to get the month");
      const YearData = new Date().getFullYear();
      const filteredData = userData?.binaryIncome?.filter((item) => {
        const searchYear = item?.incomeDate;
        const YearArray = searchYear.split("-");
        const year = YearArray[0];
        console.log(year, "to get the month ");
        return year?.includes(YearData);
      });
      console.log(filteredData, "search fileteredData");
      setSearch(filteredData);
    }
  }

  async function matchingLast(e) {
    console.log(e.target.value, "to get the value of current");
    const value = e.target.value;

    if (value == 0) {
      setSearch(null);
      directIncentives();
      return;
    }
    if (value == 1) {
      console.log(new Date().getMonth(), "to get the month");
      const LastMonthDataa = new Date().getMonth();
      const filteredData = userData?.binaryIncome?.filter((item) => {
        const searchMonth = item?.incomeDate;
        const MonthArray = searchMonth.split("-");
        const Month = MonthArray[1];
        console.log(Month, "to get the month ");
        return Month == LastMonthDataa;
      });
      console.log(filteredData, "search fileteredData");
      setSearch(filteredData);
    }
    if (value == 2) {
      console.log(new Date().getFullYear() - 1, "to get the month");
      const LastYearData = new Date().getFullYear() - 1;
      const filteredData = userData?.binaryIncome?.filter((item) => {
        const searchYear = item?.incomeDate;
        const YearArray = searchYear.split("-");
        const year = YearArray[0];
        console.log(year, "to get the month ");
        return year?.includes(LastYearData);
      });
      console.log(filteredData, "search fileteredData");
      setSearch(filteredData);
    }
  }

  async function levelHandleDateSearch() {
    console.log(searchDate, "to get the date");
    setSearch(null);
    const value = searchDate;
    const filteredData = userData?.levelIncome?.filter((item) => {
      const searchDate = item?.incomeDate;
      return searchDate.toLowerCase().includes(value.toLowerCase());
    });
    console.log(filteredData);
    setSearch(filteredData);
  }

  async function levelWalletSearch(e) {
    console.log(e.target.value, "to search Wallet");
    const value = e.target.value;
    const filteredData = userData?.levelIncome?.filter((item) => {
      const searchWallet = item?.tronAddress;
      return searchWallet?.toLowerCase().includes(value?.toLowerCase());
    });
    console.log(filteredData, "search fileteredData");
    setSearch(filteredData);
  }

  async function levelCurrent(e) {
    console.log(e.target.value, "to get the value of current");
    const value = e.target.value;
    if (value == 0) {
      setSearch(null);
      directIncentives();
      return;
    }
    if (value == 1) {
      console.log(new Date().getMonth() + 1, "to get the month");
      const CurrentMonthData = new Date().getMonth() + 1;
      const filteredData = userData?.levelIncome?.filter((item) => {
        const searchMonth = item?.incomeDate;
        const MonthArray = searchMonth.split("-");
        const Month = MonthArray[1];
        console.log(Month, "to get the month ");
        return Month == CurrentMonthData;
      });
      console.log(filteredData, "search fileteredData");
      setSearch(filteredData);
    }
    if (value == 2) {
      console.log(new Date().getFullYear(), "to get the month");
      const YearData = new Date().getFullYear();
      const filteredData = userData?.levelIncome?.filter((item) => {
        const searchYear = item?.incomeDate;
        const YearArray = searchYear.split("-");
        const year = YearArray[0];
        console.log(year, "to get the month ");
        return year?.includes(YearData);
      });
      console.log(filteredData, "search fileteredData");
      setSearch(filteredData);
    }
  }

  async function levelLast(e) {
    console.log(e.target.value, "to get the value of current");
    const value = e.target.value;

    if (value == 0) {
      setSearch(null);
      directIncentives();
      return;
    }
    if (value == 1) {
      console.log(new Date().getMonth(), "to get the month");
      const LastMonthDataa = new Date().getMonth();
      const filteredData = userData?.levelIncome?.filter((item) => {
        const searchMonth = item?.incomeDate;
        const MonthArray = searchMonth.split("-");
        const Month = MonthArray[1];
        console.log(Month, "to get the month ");
        return Month == LastMonthDataa;
      });
      console.log(filteredData, "search fileteredData");
      setSearch(filteredData);
    }
    if (value == 2) {
      console.log(new Date().getFullYear() - 1, "to get the month");
      const LastYearData = new Date().getFullYear() - 1;
      const filteredData = userData?.levelIncome?.filter((item) => {
        const searchYear = item?.incomeDate;
        const YearArray = searchYear.split("-");
        const year = YearArray[0];
        console.log(year, "to get the month ");
        return year?.includes(LastYearData);
      });
      console.log(filteredData, "search fileteredData");
      setSearch(filteredData);
    }
  }

  async function resetDateFilter() {
    setSearch(null);
    directIncentives();
    return;
  }

  return (
    <>
      <section class="incentive" id="incentiveID">
        <div class="container">
          <h2>Incentive</h2>

          <Accordion
            defaultActiveKey="0"
            className="accordion accordion-flush incentive-accordian"
            id="accordionFlushExample"
          >
            <Accordion.Item eventKey="1" class="accordion-item">
              <Accordion.Header
                className="accordion-header"
                id="flush-headingOne"
              >
                <div class="incentive-btn">
                  <div class="incentivebtn-left">
                    <img src="/balanced.png" alt="" />
                  </div>
                  <div class="incentivebtn-right">Direct Incentive</div>
                </div>
              </Accordion.Header>

              <Accordion.Body>
                <div class="accordion-body" id="incentive-body">
                  <div class="directic-box">
                    <span>Transaction History</span>
                    <div class="dropdown" id="incentive-transaction">
                      <button
                        class="btn btn-secondary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img src="/dropdown-arrow.png" alt="" />
                      </button>
                      <ul class="dropdown-menu" id="transaction-ul">
                        <li id="todayText">
                          <a class="dropdown-item transaction-a" href="#">
                            Today
                          </a>

                          <i
                            class="bi bi-arrow-clockwise"
                            onClick={resetDateFilter}
                          ></i>
                        </li>
                        <li class="inc -transli">
                          <a class="dropdown-item transaction-a" href="#">
                            Current
                          </a>
                          <select
                            class="form-select transaction-select"
                            aria-label="Default select example"
                            onChange={(e) => directCurrent(e)}
                          >
                            <option selected value="0">
                              Select Year/Month
                            </option>
                            <option value="1">Month</option>
                            <option value="2">Year</option>
                          </select>
                        </li>
                        <li class="inc -transli">
                          <a class="dropdown-item transaction-a" href="#">
                            Last
                          </a>
                          <select
                            class="form-select transaction-select"
                            aria-label="Default select example"
                            onChange={(e) => directLast(e)}
                          >
                            <option selected value="0">
                              Select Year/Month
                            </option>
                            <option value="1">Month</option>
                            <option value="2">Year</option>
                          </select>
                        </li>
                        <li>
                          <a class="dropdown-item transaction-a" href="#">
                            Custom
                          </a>
                          <input
                            type="date"
                            class="transaction-date"
                            onChange={(e) => setSearchDate(e.target.value)}
                          />
                          <a
                            class="dropdown-item transaction-a"
                            href="#"
                            id="Apply"
                          >
                            <span onClick={directHandleDateSearch}>Apply</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="input-group" id="incentive-search">
                    <input
                      type="text"
                      class="form-control"
                      onChange={(e) => directWalletSearch(e)}
                    />
                    <img
                      src="/magnifying-glass.png"
                      alt=""
                      // onClick={(e) => walletSearch(e)}
                    />
                  </div>

                  <table class="table table-dark table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Sr No.</th>
                        <th scope="col">Date and Time</th>
                        <th scope="col">Wallet Address</th>
                        <th scope="col">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {search == null
                        ? userData?.directIncome?.map((item, id) => {
                            return (
                              <tr key={id}>
                                <td>{id + 1}</td>
                                <td>
                                  {new Date(item?.incomeDate).toLocaleString()}
                                </td>
                                <td class="incentive-copy">
                                  {item?.tronAddress}
                                  <img src="/table-copy1.png" alt="" />
                                </td>
                                <td>{item?.amount}</td>
                              </tr>
                            );
                          })
                        : search?.map((item, id) => {
                            return (
                              <tr key={id}>
                                <td>{id + 1}</td>
                                <td>
                                  {new Date(item?.incomeDate).toLocaleString()}
                                </td>
                                <td class="incentive-copy">
                                  {item?.tronAddress}
                                  <img src="/table-copy1.png" alt="" />
                                </td>
                                <td>{item?.amount}</td>
                              </tr>
                            );
                          })}
                    </tbody>
                  </table>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <Accordion
            defaultActiveKey="0"
            className="accordion accordion-flush incentive-accordian"
            id="accordionFlushExample"
          >
            <Accordion.Item eventKey="1" class="accordion-item">
              <Accordion.Header
                className="accordion-header"
                id="flush-headingOne"
              >
                <div class="incentive-btn">
                  <div class="incentivebtn-left">
                    <img src="/balanced.png" alt="" />
                  </div>
                  <div class="incentivebtn-right">Matching Incentive</div>
                </div>
              </Accordion.Header>

              <Accordion.Body>
                <div class="accordion-body" id="incentive-body">
                  <div class="directic-box">
                    <span>Transaction History</span>
                    <div class="dropdown" id="incentive-transaction">
                      <button
                        class="btn btn-secondary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img src="/dropdown-arrow.png" alt="" />
                      </button>
                      <ul class="dropdown-menu" id="transaction-ul">
                        <li>
                          <a class="dropdown-item transaction-a" href="#">
                            Today
                          </a>
                        </li>
                        <li class="inc -transli">
                          <a class="dropdown-item transaction-a" href="#">
                            Current
                          </a>
                          <select
                            class="form-select transaction-select"
                            aria-label="Default select example"
                            onChange={(e) => matchingCurrent(e)}
                          >
                            <option selected value="0">
                              select Year/month
                            </option>
                            <option value="1">Month</option>
                            <option value="2">Year</option>
                          </select>
                        </li>
                        <li class="inc -transli">
                          <a class="dropdown-item transaction-a" href="#">
                            Last
                          </a>
                          <select
                            class="form-select transaction-select"
                            aria-label="Default select example"
                            onChange={(e) => matchingLast(e)}
                          >
                            <option selected value="0">
                              select Year/month
                            </option>
                            <option value="1">Month</option>
                            <option value="2">Year</option>
                          </select>
                        </li>
                        <li>
                          <a class="dropdown-item transaction-a" href="#">
                            Custom
                          </a>
                          <input
                            type="date"
                            class="transaction-date"
                            onChange={(e) => setSearchDate(e.target.value)}
                          />
                          <a
                            class="dropdown-item transaction-a"
                            href="#"
                            id="Apply"
                          >
                            <span onClick={matchingHandleDateSearch}>
                              Apply
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="input-group" id="incentive-search">
                    <input
                      type="text"
                      class="form-control"
                      onChange={(e) => matchingWalletSearch(e)}
                    />
                    <img src="/magnifying-glass.png" alt="" />
                  </div>
                  <div className="tableHeader">
                    <table class="table table-dark table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Sr No.</th>
                          <th scope="col">Date and Time</th>
                          <th scope="col">Wallet Address</th>
                          <th scope="col">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {search == null
                          ? userData?.binaryIncome?.map((item, id) => {
                              return (
                                <tr>
                                  <td>{id + 1}</td>
                                  <td>
                                    {new Date(
                                      item?.incomeDate
                                    ).toLocaleString()}
                                  </td>
                                  <td class="incentive-copy">
                                    {item?.tronAddress}{" "}
                                    <img src="/table-copy1.png" alt="" />
                                  </td>
                                  <td>{item?.amount}</td>
                                </tr>
                              );
                            })
                          : search?.map((item, id) => {
                              return (
                                <tr>
                                  <td>{id + 1}</td>
                                  <td>
                                    {new Date(
                                      item?.incomeDate
                                    ).toLocaleString()}
                                  </td>
                                  <td class="incentive-copy">
                                    {item?.tronAddress}{" "}
                                    <img src="/table-copy1.png" alt="" />
                                  </td>
                                  <td>{item?.amount}</td>
                                </tr>
                              );
                            })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <Accordion
            defaultActiveKey="0"
            className="accordion accordion-flush incentive-accordian"
            id="accordionFlushExample"
          >
            <Accordion.Item eventKey="1" class="accordion-item">
              <Accordion.Header
                className="accordion-header"
                id="flush-headingOne"
              >
                <div class="incentive-btn">
                  <div class="incentivebtn-left">
                    <img src="/balanced.png" alt="" />
                  </div>
                  <div class="incentivebtn-right">Level Incentive</div>
                </div>
              </Accordion.Header>

              <Accordion.Body>
                <div class="accordion-body" id="incentive-body">
                  <div class="directic-box">
                    <span>Transaction History</span>
                    <div class="dropdown" id="incentive-transaction">
                      <button
                        class="btn btn-secondary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img src="/dropdown-arrow.png" alt="" />
                      </button>
                      <ul class="dropdown-menu" id="transaction-ul">
                        <li>
                          <a class="dropdown-item transaction-a" href="#">
                            Today
                          </a>
                        </li>
                        <li class="inc -transli">
                          <a class="dropdown-item transaction-a" href="#">
                            Current
                          </a>
                          <select
                            class="form-select transaction-select"
                            aria-label="Default select example"
                            onChange={(e) => levelCurrent(e)}
                          >
                            <option selected value="0">
                              Select Year/Month
                            </option>
                            <option value="1">Month</option>
                            <option value="2">Year</option>
                          </select>
                        </li>
                        <li class="inc -transli">
                          <a class="dropdown-item transaction-a" href="#">
                            Last
                          </a>
                          <select
                            class="form-select transaction-select"
                            aria-label="Default select example"
                            onChange={(e) => levelLast(e)}
                          >
                            <option selected value="0">
                              Select Year/Month
                            </option>
                            <option value="1">Month</option>
                            <option value="2">Year</option>
                          </select>
                        </li>
                        <li>
                          <a class="dropdown-item transaction-a" href="#">
                            Custom
                          </a>
                          <input
                            type="date"
                            class="transaction-date"
                            onChange={(e) => setSearchDate(e.target.value)}
                          />
                          <a
                            class="dropdown-item transaction-a"
                            href="#"
                            id="Apply"
                          >
                            <span onClick={levelHandleDateSearch}>Apply</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="input-group" id="incentive-search">
                    <input
                      type="text"
                      class="form-control"
                      onChange={(e) => levelWalletSearch(e)}
                    />
                    <img src="/magnifying-glass.png" alt="" />
                  </div>
                  <div className="tableHeader">
                    <table class="table table-dark table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Sr No.</th>
                          <th scope="col">Date and Time</th>
                          <th scope="col">Wallet Address</th>
                          <th scope="col">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {search == null
                          ? userData?.levelIncome?.map((item, id) => {
                              return (
                                <tr key={id}>
                                  <td>{id + 1}</td>
                                  <td>
                                    {new Date(
                                      item?.incomeDate
                                    ).toLocaleString()}
                                  </td>
                                  <td class="incentive-copy">
                                    {item?.tronAddress}{" "}
                                    <img src="/table-copy1.png" alt="" />
                                  </td>
                                  <td>{item?.amount}</td>
                                </tr>
                              );
                            })
                          : search?.map((item, id) => {
                              return (
                                <tr key={id}>
                                  <td>{id + 1}</td>
                                  <td>
                                    {new Date(
                                      item?.incomeDate
                                    ).toLocaleString()}
                                  </td>
                                  <td class="incentive-copy">
                                    {item?.tronAddress}{" "}
                                    <img src="/table-copy1.png" alt="" />
                                  </td>
                                  <td>{item?.amount}</td>
                                </tr>
                              );
                            })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <Accordion
            defaultActiveKey="0"
            className="accordion accordion-flush incentive-accordian"
            id="accordionFlushExample"
          >
            <Accordion.Item eventKey="1" class="accordion-item">
              <Accordion.Header
                className="accordion-header"
                id="flush-headingOne"
              >
                <div class="incentive-btn">
                  <div class="incentivebtn-left">
                    <img src="/balanced.png" alt="" />
                  </div>
                  <div class="incentivebtn-right">
                    Staking Matching Incentive
                  </div>
                </div>
              </Accordion.Header>

              <Accordion.Body>
                <div class="accordion-body" id="incentive-body">
                  <div class="directic-box">
                    <span>Transaction History</span>
                    <div class="dropdown" id="incentive-transaction">
                      <button
                        class="btn btn-secondary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img src="/dropdown-arrow.png" alt="" />
                      </button>
                      <ul class="dropdown-menu" id="transaction-ul">
                        <li>
                          <a class="dropdown-item transaction-a" href="#">
                            Today
                          </a>
                        </li>
                        <li class="inc -transli">
                          <a class="dropdown-item transaction-a" href="#">
                            Current
                          </a>
                          <select
                            class="form-select transaction-select"
                            aria-label="Default select example"
                          >
                            <option selected>Year</option>
                            <option value="1">Month</option>
                            <option value="2">Year</option>
                          </select>
                        </li>
                        <li>
                          <a class="dropdown-item transaction-a" href="#">
                            Last
                          </a>
                        </li>
                        <li>
                          <a class="dropdown-item transaction-a" href="#">
                            Custom
                          </a>
                          <input type="date" class="transaction-date" />
                          <a
                            class="dropdown-item transaction-a"
                            href="#"
                            id="Apply"
                          >
                            <span>Apply</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="input-group" id="incentive-search">
                    <input type="text" class="form-control" />
                    <img src="/magnifying-glass.png" alt="" />
                  </div>

                  <div className="tableHeader">
                    <table class="table table-dark table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Sr No.</th>
                          <th scope="col">Date and Time</th>
                          <th scope="col">Wallet Address</th>
                          <th scope="col">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>01</td>
                          <td>10.11.2020 11:34</td>
                          <td class="incentive-copy">
                            araerfddgsgds <img src="/table-copy1.png" alt="" />
                          </td>
                          <td>3243</td>
                        </tr>
                        <tr>
                          <td>01</td>
                          <td>12.11.2020 13:11</td>
                          <td class="incentive-copy">
                            wrwrfdasdffdgds
                            <img src="/table-copy1.png" alt="" />
                          </td>
                          <td>3243</td>
                        </tr>
                        <tr>
                          <td>01</td>
                          <td>15.11.2020 14:12</td>
                          <td class="incentive-copy">
                            gdsgsgedfjhghu
                            <img src="/table-copy1.png" alt="" />
                          </td>
                          <td>55424</td>
                        </tr>
                        <tr>
                          <td>01</td>
                          <td>10.11.2020 11:34</td>
                          <td class="incentive-copy">
                            araerfddgsgds <img src="/table-copy1.png" alt="" />
                          </td>
                          <td>3243</td>
                        </tr>
                        <tr>
                          <td>01</td>
                          <td>12.11.2020 13:11</td>
                          <td class="incentive-copy">
                            wrwrfdasdffdgds
                            <img src="/table-copy1.png" alt="" />
                          </td>
                          <td>3243</td>
                        </tr>
                        <tr>
                          <td>01</td>
                          <td>15.11.2020 14:12</td>
                          <td class="incentive-copy">
                            gdsgsgedfjhghu
                            <img src="/table-copy1.png" alt="" />
                          </td>
                          <td>55424</td>
                        </tr>
                        <tr>
                          <td>01</td>
                          <td>10.11.2020 11:34</td>
                          <td class="incentive-copy">
                            araerfddgsgds <img src="/table-copy1.png" alt="" />
                          </td>
                          <td>3243</td>
                        </tr>
                        <tr>
                          <td>01</td>
                          <td>12.11.2020 13:11</td>
                          <td class="incentive-copy">
                            wrwrfdasdffdgds
                            <img src="/table-copy1.png" alt="" />
                          </td>
                          <td>3243</td>
                        </tr>
                        <tr>
                          <td>01</td>
                          <td>15.11.2020 14:12</td>
                          <td class="incentive-copy">
                            gdsgsgedfjhghu
                            <img src="/table-copy1.png" alt="" />
                          </td>
                          <td>55424</td>
                        </tr>
                        <tr>
                          <td>01</td>
                          <td>10.11.2020 11:34</td>
                          <td class="incentive-copy">
                            araerfddgsgds <img src="/table-copy1.png" alt="" />
                          </td>
                          <td>3243</td>
                        </tr>
                        <tr>
                          <td>01</td>
                          <td>12.11.2020 13:11</td>
                          <td class="incentive-copy">
                            wrwrfdasdffdgds
                            <img src="/table-copy1.png" alt="" />
                          </td>
                          <td>3243</td>
                        </tr>
                        <tr>
                          <td>01</td>
                          <td>15.11.2020 14:12</td>
                          <td class="incentive-copy">
                            gdsgsgedfjhghu
                            <img src="/table-copy1.png" alt="" />
                          </td>
                          <td>55424</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
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
