"use client";
import { useState } from "react";

interface TokenboundOptions {
  address: string;
  parentWallet: string;
}

interface WalletIds {
  id: string;
  label: string;
}

export default function Home() {
  const [options, setOptions] = useState<TokenboundOptions>({
    address: "",
    parentWallet: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value,
    }));
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Send the options data to the parent window
    if (options.address.length == 0 || options.parentWallet.length == 0) {
      alert("Please fill all fields");
      return;
    }

    window.parent.postMessage(options, "*");
  };

  const wallets: WalletIds[] = [
    {
      id: "braavos",
      label: "Braavos",
    },
    {
      id: "argentX",
      label: "ArgentX",
    },
    {
      id: "ArgentWebWallet",
      label: "Argent Web Wallet",
    },
  ];

  return (
    <main className="flex items-center  h-[100vh]">
      <div className="w-full bg-overlay h-full rounded-[24px] bg-cover bg-no-repeat">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center h-full">
          <div className=" hidden md:flex flex-col items-center md:py-[200px] h-full">

            <div className="flex items-center">
              <div className="w-10 h-10">
                <img className="" src="/logo.svg" alt="logo" />
              </div>
              <h1 className="text-[16px] font-poppins font-medium  text-[#F0F0F0]">
                Connect Account
              </h1>
            </div>
            <p className="text-[27px] font-poppins font-bold leading-[40px] text-[#F0F0F0]">
              Tokenbound Account
            </p>
          </div>

          <div className="flex flex-col py-40 md:py-[100px] bg-white rounded-[24px] h-full px-5">
            <div className="space-y-2">
              <p className="text-[#1E1E1E] font-poppins text-[18px] font-semibold leading-[30px]">
                Connect Your Tokenbound Account
              </p>
              <p className="text-[#7E7E7E] font-poppins text-[14px] font-normal leading-[21px]">
                Provide your Tokenbound account address and select its parent
                wallet.
              </p>
            </div>
            <div className="pt-[60px] space-y-4">
              <input
                type="text"
                placeholder="Account address"
                id="tba-address"
                name="address"
                value={options.address}
                onChange={handleChange}
                className="w-full border font-poppins text-sm border-[#C7C7C7] bg-white text-black h-[50px] font-normal rounded-[4px] px-3 py-2 mb-1 placeholder:text-gray-500 focus:outline-none focus:border-blue-500"
              />

              <div className="w-full border text-sm border-[#C7C7C7] bg-white text-black h-[50px] font-normal rounded-[4px] px-3 py-2 mb-1 placeholder:text-gray-500 focus:outline-none focus:border-blue-500 ">
                <select
                  id="options"
                  name="parentWallet"
                  value={options.parentWallet}
                  onChange={handleSelectChange}
                  className="w-full h-full focus:outline-none font-poppins text-gray-300"
                >
                  <option className="" value="" disabled>
                    Select an option
                  </option>

                  {wallets.map(({ id, label }) => (
                    <option className="capitalize" value={id}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="py-5 pt-8 w-full">
                <button
                  onClick={handleSubmit}
                  className="w-full text-[#F9F9F9] font-poppins  bg-[#238DFD] rounded-lg text-base h-[46px] border-[#238DFD] outline-none p-2"
                >
                  Connect account
                </button>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
