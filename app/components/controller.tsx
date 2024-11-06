// ConnectCatridge.tsx
"use client";
import { useEffect, useState } from "react";
import Controller from "@cartridge/controller";
import { AccountInterface } from "starknet";

interface ConnectCatridgeProps {
  onAccountConnected: (account: AccountInterface) => void;
}

const ETH_CONTRACT =
  "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7";

const ConnectCatridge: React.FC<ConnectCatridgeProps> = ({ onAccountConnected }) => {
  const [account, setAccount] = useState<AccountInterface | null>(null);
  const controller = new Controller({
    policies: [
      {
        target: ETH_CONTRACT,
        method: "approve",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      },
      {
        target: ETH_CONTRACT,
        method: "transfer",
      },
      {
        target: ETH_CONTRACT,
        method: "mint",
      },
      {
        target: ETH_CONTRACT,
        method: "burn",
      },
      {
        target: ETH_CONTRACT,
        method: "allowance",
      },
    ],
  });

  async function connectCatridge() {
    try {
      const res = await controller.connect();
      if (res) {
        setAccount(res);
        onAccountConnected(res); 
      }
    } catch (error) {
      console.error("Failed to connect:", error);
    }
  }

  useEffect(() => {
    const autoConnect = async () => {
      try {
        if (await controller.probe()) {
          await connectCatridge();
        }
      } catch (error) {
        console.error("Auto-connect failed:", error);
      }
    };
    autoConnect();
  }, [controller]);

  return (
    <div>
     <button onClick={connectCatridge}>Connect Cartridge</button> 
     
    </div>
  );
};

export default ConnectCatridge;
