"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ConnectButton,
  useCurrentAccount,
  useSuiClient,
} from "@mysten/dapp-kit";

const MIST_PER_SUI = BigInt(1_000_000_000);

function formatSuiBalance(totalBalance: string | null): string {
  if (!totalBalance) {
    return "0";
  }

  try {
    const balanceBigInt = BigInt(totalBalance);
    const whole = balanceBigInt / MIST_PER_SUI;
    const remainder = balanceBigInt % MIST_PER_SUI;

    if (remainder === BigInt(0)) {
      return whole.toString();
    }

    const remainderString = remainder.toString().padStart(9, "0");
    const trimmedFraction = remainderString.replace(/0+$/, "");

    return `${whole.toString()}.${trimmedFraction}`;
  } catch (error) {
    console.error("Failed to format balance", error);
    return "0";
  }
}

export default function Navbar() {
  const account = useCurrentAccount();
  const suiClient = useSuiClient();
  const [balance, setBalance] = useState<string | null>(null);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);

  useEffect(() => {
    if (!account) {
      setBalance(null);
      return;
    }

    let isCancelled = false;
    setIsLoadingBalance(true);

    suiClient
      .getBalance({ owner: account.address, coinType: "0x2::sui::SUI" })
      .then((result) => {
        if (isCancelled) {
          return;
        }
        setBalance(result.totalBalance ?? null);
      })
      .catch((error) => {
        console.error("Failed to fetch SUI balance", error);
        if (!isCancelled) {
          setBalance(null);
        }
      })
      .finally(() => {
        if (!isCancelled) {
          setIsLoadingBalance(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [account, suiClient]);

  const formattedBalance = useMemo(() => formatSuiBalance(balance), [balance]);

  return (
    <nav className="absolute top-0 left-0 w-full flex items-center justify-between px-8 md:px-20 py-6 bg-transparent z-20">
      <div className="flex flex-col">
        <span className="text-sm text-gray-400">Testnet SUI Balance</span>
        <span className="text-lg font-semibold text-white">
          {isLoadingBalance ? "Fetching..." : `${formattedBalance} SUI`}
        </span>
      </div>

      <ConnectButton className="px-4 py-2 bg-gradient-to-r from-sky-500 to-blue-700 hover:from-sky-400 hover:to-blue-600 rounded-md text-white font-medium transition" />
    </nav>
  );
}
