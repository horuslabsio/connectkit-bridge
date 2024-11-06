"use client";
import {  useState } from "react";
import TBALOGO from "./components/tba-logo";
import CloseIcon from "./components/close-icon";


interface TokenboundOptions {
  address: string;
  parentWallet: string;
}

interface WalletIds {
  id: string;
  label: string;
}


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
  {
    id: "controller",
    label: "Cartridge Controller",
  },
];


const ETH_CONTRACT =
  "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7";


export default function Home() {
  const [options, setOptions] = useState<TokenboundOptions>({
    address: "",
    parentWallet: "",
  });

  const [errors, setErrors] = useState({
    address: "",
    parentWallet: "",
  });



 
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };
  


  const closeModal = () => {
    window.parent.postMessage({ action: "closeConnectKit" }, "*");
  };




  const handleSubmit = () => {
    const newErrors = {
      address: !options.address ? "Please enter a valid tokenbound account address" : "",
      parentWallet: !options.parentWallet ? "Please select parent wallet" : "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error)) return;
  
      setTimeout(() => {
        window.parent.postMessage(options, "*");
      }, 0);
    
  };

  
  return (
    <main className="h-screen w-screen flex items-center justify-center overflow-y-hidden">
      <div className="bg-overlay bg-left w-full max-w-[400px] md:max-w-[650px] font-poppins border border-gray-500 h-[65%] max-h-[450px] md:max-h-[420px] overflow-clip rounded-[14px] md:rounded-[24px] flex flex-col justify-between md:flex-row">
        <div className="md:basis-[40%] basis-[20%] p-4 w-full relative rounded-[14px] flex flex-col gap-4 justify-center items-center">
          <button
            id="close-button"
            onClick={closeModal}
            className="absolute left-4 top-4 text-white text-xl"
          >
            <CloseIcon />
          </button>
          <div className="md:w-[70px] w-[50px] relative before:content-[''] before:w-[60%] before:absolute before:left-1/2 before:-translate-x-1/2 before:h-[65%] before:top-1/2 before:rounded-full before:-translate-y-1/2  before:bg-white">
            <TBALOGO />
          </div>
          <div>
            <p className="text-base md:text-lg font-medium text-[#F0F0F0]">
              Connect Account
            </p>
          </div>
        </div>
        <div className="bg-white flex-1 md:basis-[60%] flex h-full items-center justify-center rounded-[14px] md:rounded-[24px]">
          <div className="p-4">
            <div>
              <h1 className="text-[#1E1E1E] text-lg md:text-xl font-semibold mb-2">
                Connect Tokenbound Account
              </h1>
              <p className="text-[#7E7E7E] text-xs md:text-sm ">
                Provide your Tokenbound account address and select its parent
                wallet.
              </p>
            </div>
            <div className="md:mt-8 mt-4 flex flex-col gap-4 md:gap-6">
              <label htmlFor="tba-address" className="relative block">
                <span className="sr-only">Tokenbound Account address</span>
                <input
                  autoFocus
                  type="text"
                  placeholder="Account address"
                  id="tba-address"
                  name="address"
                  value={options.address}
                  onChange={handleChange}
                  aria-invalid={!!errors.address}
                  aria-describedby="address-error"
                  className={`w-full border text-sm bg-white text-black font-normal rounded-[4px] px-3 py-2 mb-1 placeholder:text-gray-500 focus:outline-none focus:border-gray-500 ${errors.address ? "border-red-500" : "border-[#C7C7C7]"
                    }`}
                />
                {errors.address && (
                  <p
                    id="address-error"
                    role="alert"
                    className="text-red-500 absolute -top-4 right-2 text-xs"
                    aria-live="assertive"
                  >
                    {errors.address} *
                  </p>
                )}
              </label>

              <div className="relative">
                <label htmlFor="options" className="sr-only">
                  Parent Wallet
                </label>
                <div
                  className={`w-full border text-sm bg-white text-black font-normal rounded-[4px] px-3 py-2 mb-1 placeholder:text-gray-500 focus-within:outline-none focus-within:border-gray-500 ${errors.parentWallet ? "border-red-500" : "border-[#C7C7C7]"
                    }`}
                >
                  <select
                    id="options"
                    name="parentWallet"
                    value={options.parentWallet}
                    onChange={handleSelectChange}
                    aria-invalid={!!errors.parentWallet}
                    aria-describedby="wallet-error"
                    className="w-full h-full focus:outline-none"
                  >
                    <option value="" disabled>
                      Select parent wallet
                    </option>
                    {wallets.map(({ id, label }) => (
                      <option key={id} value={id} className="capitalize">
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.parentWallet && (
                  <p
                    id="wallet-error"
                    role="alert"
                    className="text-red-500 absolute -top-4 right-2 text-xs"
                    aria-live="assertive"
                  >
                    {errors.parentWallet} *
                  </p>
                )}
              </div>
            </div>

            
            <div className="w-full mt-4 md:mt-8">
              
           <button
                  onClick={handleSubmit}
                  className="w-full text-[#F9F9F9]  bg-[#272727] rounded-lg text-sm md:text-base  border-[#272727] outline-none p-2"
                >
                  Connect account
                </button>
              

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
