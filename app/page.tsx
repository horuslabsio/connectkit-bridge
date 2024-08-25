"use client"
import { useState } from "react";

interface TokenboundOptions {
  address: string;
  parentWallet: string
}

export default function Home() {
  const [options, setOptions] = useState<TokenboundOptions>({ address: "", parentWallet: "" })
 const TOKENBOUND_ACCOUNT_ICON = `data:image/png;base64,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`;


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setOptions(prevOptions => ({
      ...prevOptions,
      [name]: value
    }));
  };


  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setOptions(prevOptions => ({
      ...prevOptions,
      [name]: value
    }));
  };


  const handleSubmit = () => {
    // Send the options data to the parent window
    if (options.address.length == 0 || options.parentWallet.length == 0) {
      alert("Please fill all fields")
      return
    }

    window.parent.postMessage(options, '*');
  };


  const wallets = ["Braavos", "ArgentX", "ArgentWebWallet"]

  return (
    <main className="h-[100vh] grid grid-cols-2 items-center justify-center px-20 gap-[130px] ">

      <div className="flex flex-col items-center justify-center border-r border-gray-300 h-full ">
        <div className="w-[60px] h-[60px] mb-5">
         <img className="w-fill h-full" src={TOKENBOUND_ACCOUNT_ICON} alt="Tokenbound connector" />
        </div>
        <p className="font-normal text-center text-[16px]">          Connect to 
        </p>
        <p className="text-[26px] font-bold py-1 pb-2" >Tokenbound Account</p>
        <p className="text-center text-sm text-gray-500">Please provide tokenbound account address and select parent wallet of your tokenbound account</p>

      
      </div>

      <div className=" w-full max-w-[500px]">
        <div className="py-5">
        </div>
        <div className="w-full py-3 ">
          <label
            className="text-black text-medium mb-4 font-medium block"
            htmlFor="tba-address"
          >
            Tokenbound Account Address
          </label>
          <input
            type="text"
            placeholder="0x077e0925380d1529772ee99caefa8cd7a7017a823ec3db7c003e56ad2e85e300"
            id="tba-address"
            name="address"
            value={options.address}
            onChange={handleChange}
            className="w-full border text-sm border-gray-300 bg-white text-black h-[50px] font-normal rounded-lg px-3 py-2 mb-1 placeholder:text-gray-500 focus:outline-none focus:border-blue-500"
          />

          <p className="text-black  py-4 font-medium text-medium">
            Select Parent Account
          </p>

          <select
            id="options"
            name="parentWallet"
            value={options.parentWallet}
            onChange={handleSelectChange}
            className="block w-full px-3 py-2 border h-[50px] border-gray-300 text-black rounded-lg  text-sm shadow-sm focus:outline-none focus:border-blue-500 "
          >
            <option className="text-gray-300" value="" disabled>
              Select an option
            </option>

            {
              wallets.map((id) => (
                <option className="capitalize" value={id}>{id}</option>
              ))
            }

          </select>

        </div>

        <div className="py-5 w-full">
          <button
            onClick={handleSubmit}
            className="w-full text-white bg-[#0C0C4F] rounded-lg text-sm h-[46px] border-gray-500 outline-none p-2"
          >
            Connect with tokenbound account
          </button>
          <div>
          </div>
        </div>
      </div>
    </main>
  );
}
