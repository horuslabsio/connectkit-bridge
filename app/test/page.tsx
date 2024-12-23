"use client";
import React, { useEffect, useState } from "react";
import { constants, Contract, RpcProvider } from "starknet";
import {
  connect,
  disconnect,
} from "tokenbound-connectkit-test";
import { CounterABi } from "../utils/abi";

const contractAddress = "0x18ba8fe6834e089c09d62b3ff41e94f549a9797a7b93a1fb112ca9fbaf3959d";

// const provider = new RpcProvider({
//   nodeUrl: "https://starknet-sepolia.public.blastapi.io/rpc/v0_7",
// })


const provider = new RpcProvider({
  nodeUrl: "https://starknet-mainnet.public.blastapi.io/rpc/v0_7",
})

export default function Page() {
  const [connection, setConnection] = useState<
    null | undefined
  >(null);

  const [address, setAddress] = useState<string>("");
  const [account, setAccount] = useState();
  const counterContract = new Contract(CounterABi, contractAddress, provider);
  const [count, setCount] = useState<number>(0)

  const connectFn = async () => {
    try {
      const { wallet } = await connect({
        tokenboundOptions: {
          chainId: constants.NetworkName.SN_MAIN,
        },
      });

      console.log(wallet, 'wallet')
      setConnection(wallet);
      setAccount(wallet?.account);
      setAddress(wallet?.selectedAddress)
    } catch (e) {
      console.error(e);
      alert((e as any).message);
    }
  };

  const disconnectFn = async () => {
    await disconnect();
    setAddress("")
    setAccount(undefined)
    setConnection(null);
  };



  if (account) {
    counterContract.connect(account)
  }


  const setCounter = async () => {
    const call = counterContract.populate("increase_balance", [20])
    const res = await counterContract.increase_balance(call.calldata)
    await provider.waitForTransaction(res?.transaction_hash)
    const newCount = await counterContract.get_balance()
    setCount(newCount.toString())

  }


  useEffect(() => {
    const getCounter = async () => {
      const counter = await counterContract.get_balance()
      setCount(counter.toString())

    }
    getCounter()
  }, [])



  return (
    <div className="flex bg-black flex-col items-center justify-center h-[100vh] ">
      <p className="py-2 text-white text-[35px] font-bold py-[40px]" > Simple Counter App</p>

      {!connection ? (
        <div>
          <button className="button cursor-pointer px-5 pt-5 py-3 text-white bg-[#0C0C4F]" onClick={connectFn}>
            Connect Wallet
          </button>
        </div>
      ) : (
        <button  className="text-white py-5" onClick={disconnectFn}>
          Disconnect
        </button> 
      )}

      <header className="">
        {address && (
          <p className="text-white">
            <b>Address: {address}</b>
          </p>
        )}

        <div className=" py-5">

          <div className=" py-5 flex items-center justify-center">
            <p className="text-[20px] text-white">Count: <span className="font-bold">{count}</span></p>
          </div>

          <div className="">
            <button
              className="px-5  py-3 bg-[#0C0C4F] text-white cursor-pointer"
              onClick={setCounter}
            >Set Count</button>
          </div>

          <hr />
        </div>
      </header>
    </div>
  );
}
