// @ts-nocheck
"use client";
import Controller from "@cartridge/controller";
import { useEffect, useState } from "react";
import TBALOGO from "./components/tba-logo";
import CloseIcon from "./components/close-icon";
import DownChevronIcon from "./components/down-chevron-icon";

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

  const [errors, setErrors] = useState({
    address: "",
    parentWallet: "",
  });

  const ETH_CONTRACT =
    "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7";

  const controller = new Controller({
    policies: [
      {
        target: ETH_CONTRACT,
        method: "approve",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      },
      {
        target: ETH_CONTRACT,
        method: "transfer",
      },
    ],
  });

  const [username, setUsername] = useState<string>();

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

  const handleSubmit = () => {
    const newErrors = {
      address:
        options.address.length === 0
          ? "Please enter a valid tokenbound account address"
          : "",
      parentWallet:
        options.parentWallet.length === 0 ? "Please select parent wallet" : "",
    };

    setErrors(newErrors);
    if (newErrors.address || newErrors.parentWallet) {
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
    {
      id: "controller",
      label: "Cartridge Controller",
    },
  ];

  const connectCatridge = async () => {
    try {
      console.log(
        "Connecting to Cartridge...",
        await document.hasStorageAccess(),
      );
      const res = await controller.connect();
      if (res) {
        console.log("Connected:", res.address);
      }
    } catch (e) {
      console.error("Error connecting to Cartridge:", e);
    }
  };

  useEffect(() => {
    controller.username()?.then((n) => setUsername(n));
  }, [controller]);

  const closeModal = () => {
    window.parent.postMessage({ action: "closeConnectKit" }, "*");
  };

  interface MessageData {
    id: number;
    property: string;
    args?: any[];
  }

  class Account {
    balance: number;

    constructor(balance: number) {
      this.balance = balance;
    }

    getBalance() {
      return `Balance: ${this.balance}`;
    }
  }

  // Create an instance of Account
  const account = new Account(100);

  // Listen for requests from the parent
  useEffect(() => {
    window.addEventListener("message", (event) => {
      if (event.origin !== "http://localhost:3000") return;

      const { id, property, args } = event.data;

      if (property && id !== undefined) {
        let result;

        try {
          result =
            typeof account[property] === "function"
              ? account[property](...args) // Call the method with arguments if it's a function
              : account[property]; // Otherwise, just get the property value
        } catch (error) {
          result = `Error: ${error}`;
        }

        // Send the result back to the parent
        event.source?.postMessage({ id, result }, event.origin);
      }
    });
  }, []);

  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <div className="flex h-[65%] max-h-[450px] w-full max-w-[400px] flex-col justify-between rounded-[14px] border border-gray-500 bg-overlay bg-cover bg-left bg-no-repeat font-poppins md:max-h-[420px] md:max-w-[650px] md:flex-row md:rounded-[24px]">
        <div className="relative flex w-full basis-[20%] flex-col items-center justify-center gap-4 rounded-[14px] p-4 md:basis-[40%]">
          <button
            id="close-button"
            onClick={closeModal}
            className="absolute left-4 top-4 text-xl text-white"
          >
            <CloseIcon />
          </button>
          <div className="relative w-[50px] before:absolute before:left-1/2 before:top-1/2 before:h-[65%] before:w-[60%] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-white before:content-[''] md:w-[70px]">
            <TBALOGO />
          </div>
          <div>
            <p className="text-base font-medium text-[#F0F0F0] md:text-lg">
              Connect Account
            </p>
          </div>
        </div>
        <div className="flex h-full flex-1 items-center justify-center overflow-y-auto rounded-[14px] bg-white md:basis-[60%] md:rounded-[24px]">
          <div className="p-4">
            <div>
              <h1 className="mb-2 text-lg font-semibold text-[#1E1E1E] md:text-xl">
                Connect Tokenbound Account
              </h1>
              <p className="text-xs text-[#7E7E7E] md:text-sm">
                Provide your Tokenbound account address and select its parent
                wallet.
              </p>
            </div>
            <div className="mt-4 flex flex-col gap-4 md:mt-8 md:gap-6">
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
                  className={`mb-1 w-full rounded-[4px] border bg-white px-3 py-2 text-sm font-normal text-black placeholder:text-gray-500 focus:border-gray-500 focus:outline-none ${
                    errors.address ? "border-red-500" : "border-[#C7C7C7]"
                  }`}
                />
                {errors.address && (
                  <p
                    id="address-error"
                    role="alert"
                    className="absolute -top-4 right-2 text-xs text-red-500"
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
                  className={`mb-1 w-full rounded-[4px] border bg-white px-3 py-2 text-sm font-normal text-black placeholder:text-gray-500 focus-within:border-gray-500 focus-within:outline-none ${
                    errors.parentWallet ? "border-red-500" : "border-[#C7C7C7]"
                  }`}
                >
                  <span aria-hidden className="absolute right-4 text-xl">
                    <DownChevronIcon />
                  </span>
                  <select
                    id="options"
                    name="parentWallet"
                    value={options.parentWallet}
                    onChange={handleSelectChange}
                    aria-invalid={!!errors.parentWallet}
                    aria-describedby="wallet-error"
                    className="h-full w-full appearance-none focus:outline-none"
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
                    className="absolute -top-4 right-2 text-xs text-red-500"
                    aria-live="assertive"
                  >
                    {errors.parentWallet} *
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4 w-full md:mt-8">
              <button
                onClick={
                  options.parentWallet == "controller"
                    ? connectCatridge
                    : handleSubmit
                }
                className="w-full rounded-lg border-[#272727] bg-[#272727] p-2 text-sm text-[#F9F9F9] outline-none md:text-base"
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
