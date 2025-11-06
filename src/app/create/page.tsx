"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { Transaction } from "@mysten/sui/transactions";
import { useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";

import { useNetworkVariable } from "@/app/networkConfig";

type FormState = {
  name: string;
  target: string;
  desc: string;
  token: string;
  imageRef: string;
};

const initialFormState: FormState = {
  name: "",
  target: "",
  desc: "",
  token: "SUI",
  imageRef: "",
};

const COIN_TYPE_MAP: Record<string, string> = {
  SUI: "0x2::sui::SUI",
};

const MIST_PER_SUI = BigInt(1_000_000_000);
const MAX_TARGET_SUI = BigInt(100);
const MAX_TARGET_MIST = MIST_PER_SUI * MAX_TARGET_SUI;

function parseSuiAmount(value: string): {
  amount: bigint | null;
  error?: string;
} {
  const trimmed = value.trim();
  if (!trimmed) {
    return { amount: null, error: "Target fund is required." };
  }

  if (!/^\d+(?:\.\d+)?$/.test(trimmed)) {
    return {
      amount: null,
      error: "Target fund must be a valid number in SUI.",
    };
  }

  const [wholePart, fractionPartRaw = ""] = trimmed.split(".");

  if (fractionPartRaw.length > 9) {
    return {
      amount: null,
      error: "Target fund supports up to 9 decimal places (1 SUI = 10^9 MIST).",
    };
  }

  const whole = BigInt(wholePart);
  const fraction =
    fractionPartRaw.length > 0
      ? BigInt(fractionPartRaw.padEnd(9, "0"))
      : BigInt(0);

  const amount = whole * MIST_PER_SUI + fraction;

  return { amount };
}

export default function CreateEvent() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialFormState);
  const [message, setMessage] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);

  const crowdfundingPackageId = useNetworkVariable("crowdfundingPackageId");
  const suiClient = useSuiClient();
  const { mutateAsync: signAndExecute, isPending } =
    useSignAndExecuteTransaction();

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm(initialFormState);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setIsError(false);

    if (!form.name.trim() || !form.target.trim() || !form.desc.trim()) {
      setMessage("⚠️ Please fill in all required fields.");
      setIsError(true);
      return;
    }

    if (!crowdfundingPackageId) {
      setMessage(
        "⚠️ Crowdfunding package ID is not configured for this network.",
      );
      setIsError(true);
      return;
    }

    const coinType = COIN_TYPE_MAP[form.token];
    if (!coinType) {
      setMessage("⚠️ Selected token is not supported yet.");
      setIsError(true);
      return;
    }

    const { amount: targetAmount, error: amountError } = parseSuiAmount(
      form.target,
    );

    if (targetAmount === null) {
      setMessage(`⚠️ ${amountError ?? "Invalid target fund amount."}`);
      setIsError(true);
      return;
    }

    if (targetAmount <= BigInt(0)) {
      setMessage("⚠️ Target fund must be greater than zero.");
      setIsError(true);
      return;
    }

    if (targetAmount > MAX_TARGET_MIST) {
      setMessage(
        `⚠️ Target fund cannot exceed ${MAX_TARGET_SUI.toString()} SUI.`,
      );
      setIsError(true);
      return;
    }

    const tx = new Transaction();
    tx.moveCall({
      target: `${crowdfundingPackageId}::crowdfunding::create`,
      typeArguments: [coinType],
      arguments: [
        tx.pure.string(form.name.trim()),
        tx.pure.string(form.desc.trim()),
        tx.pure.string(form.imageRef.trim()),
        tx.pure.u64(targetAmount),
      ],
    });

    try {
      const executionResult = await signAndExecute({ transaction: tx });
      const { digest } = executionResult;

      await suiClient.waitForTransaction({
        digest,
        options: {
          showEffects: true,
        },
      });

      setMessage(`✅ Event "${form.name}" created successfully!`);
      setIsError(false);
      router.push("/explore");
      resetForm();
    } catch (error) {
      console.error("Failed to create event", error);
      setMessage("⚠️ Failed to create event. Please try again.");
      setIsError(true);
    }
  };

  const submitLabel = useMemo(() => {
    if (isPending) {
      return "Submitting...";
    }
    return "Submit Event";
  }, [isPending]);

  return (
    <section className="min-h-screen bg-black text-white px-6 md:px-20 py-10 relative overflow-hidden">
      <button
        onClick={() => router.back()}
        className="text-gray-400 hover:text-white mb-6 flex items-center space-x-2"
        type="button"
      >
        <span className="text-xl">←</span>
        <span>Back</span>
      </button>

      <div className="flex flex-col lg:flex-row items-start justify-between gap-10 relative">
        <div className="w-full lg:w-2/3 space-y-5">
          <h1 className="text-5xl font-bold mb-4">Create Event</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-1">Name Event :</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter event name..."
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Target Fund :</label>
              <input
                type="number"
                name="target"
                value={form.target}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter target fund amount (in SUI, max 100)..."
                min="0"
                max="100"
                step="0.000000001"
                inputMode="decimal"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1">
                Deskripsi Event :
              </label>
              <textarea
                name="desc"
                rows={3}
                value={form.desc}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write a short event description..."
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1">
                Event Image Reference (URL or CID):
              </label>
              <input
                type="text"
                name="imageRef"
                value={form.imageRef}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1">
                Select Token to use :
              </label>
              <select
                name="token"
                value={form.token}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="SUI">SUI</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-md text-white font-medium transition-all shadow-md shadow-indigo-500/40 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitLabel}
            </button>

            {message && (
              <p
                className={`text-sm pt-2 ${
                  isError ? "text-yellow-400" : "text-green-400"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
