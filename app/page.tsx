"use client"
import { useState } from "react";

interface TokenboundOptions {
  address: string;
  parentWallet: string
}

export default function Home() {
  const [options, setOptions] = useState<TokenboundOptions>({ address: "", parentWallet: "" })

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
    if(options.address.length == 0 || options.parentWallet.length == 0){
      alert("Please fill all fields")
      return
    }
    
    window.parent.postMessage(options, '*');
  };


  const wallets = ["Braavos", "ArgentX", "ArgentWebWallet"]

  return (
    <main className="h-[100vh] flex flex-col items-center justify-center">
      <div className=" w-full max-w-[500px]">
        <div className="py-5">
          <p className="font-bold text-center text-[20px]">          Connect to tokenbound account
          </p>
        </div>
        <div className="w-full py-2 ">
          <label
            className="text-black text-sm mb-3 font-medium block"
            htmlFor="tba-address"
          >
            TBA Address
          </label>
          <input
            type="text"
            placeholder="Your tokenbound account address?"
            id="tba-address"
            name="address"
            value={options.address}
            onChange={handleChange}
            className="w-full border text-sm border-gray-300 bg-white text-black h-[50px] rounded-lg px-3 py-2 mb-1 placeholder:text-black focus:outline-none focus:border-blue-500"
          />

          <p className="text-black  py-3 font-medium text-sm">
            Select Parent Account
          </p>

          <select
            id="options"
            name="parentWallet"
            value={options.parentWallet}
            onChange={handleSelectChange}
            className="block w-full px-3 py-2 border h-[50px] border-gray-300 text-black rounded-lg  text-sm shadow-sm focus:outline-none focus:border-blue-500 "
          >
            <option value="" disabled>
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
            className="w-full text-white bg-[#0C0C4F] rounded-xl h-[46px] border-gray-500 outline-none p-2"
          >
            Connect
          </button>
        </div>
      </div>

    </main>
  );
}
