import React from "react";
import contractInterface from "../token-abi.json";
import { useContractWrite } from "wagmi";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";

export default function Approve(setAmount) {
  const [open, setOpen] = useState(false);
  console.log(contractInterface, "to get the contractInterface");
  console.log(setAmount, "to get the set amount");

  const { write } = useContractWrite({
    address: "0xb51c90f4757cc9eae1eac1815498d06222b2bf31",
    abi: contractInterface,
    functionName: "approve",
    // chainId: 80001,
    overrides: {
      gasLimit: "800000",
    },
    args: [
      "0x5CE89eB0D609D018C7EfA23214767CeE486B4e25",
      "70000000000000000000",
    ],
    onError(error) {
      console.log("Error", error);
    },
    async onSuccess(data) {
      setOpen(true);
      console.log("Success", data);
      let tx = await data.wait();
      console.log(tx.status, "to get the tx");
      if (tx.status == "1") {
        setAmount?.setAmount("70000000000000000000");
      }
      setOpen(false);
    },
  });

  return (
    <section class="camera">
      <Backdrop
        sx={{ color: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="captureDiv">
        <button
          className="btn connect-wallet"
          onClick={() => write?.()}
          type="submit"
        >
          Approve Transaction
        </button>
      </div>
    </section>
  );
}
