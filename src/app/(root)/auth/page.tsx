"use client";

import { Button } from "@/components/ui/button";
import { LogInWithAnonAadhaar } from "@anon-aadhaar/react";
import { Avatar, Name } from "@coinbase/onchainkit/identity";
import { ConnectWallet, Wallet } from "@coinbase/onchainkit/wallet";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const Page = () => {
  const { isConnected, address } = useAccount();
  const [step, setStep] = useState<number>(0);
  const [basename, setBasename] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const getBaseName = () => {
    try {
      setLoading(true);
      setBasename("");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const generateBasename = () => {
    try {
      setLoading(true);
      setBasename("mango.base.eth");
      router.push("/app");
    } catch (err) {
      console.log("err", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (step == 2) {
      getBaseName();
    }
  }, [step]);

  return (
    <div className="w-full relative flex flex-col items-center space-y-10">
      {step == 0 &&
        (isConnected && address ? (
          <>
            <div>
              <h3 className="text-xl font-semibold">Generate proof</h3>
              <p className="text-sm text-slate-500 mt-4">
                Prove your Identity anonymously using your Aadhaar card
              </p>
            </div>
            <LogInWithAnonAadhaar nullifierSeed={1234} />
            <Button className="w-full" onClick={() => setStep(1)}>
              Skip
            </Button>
          </>
        ) : (
          <>
            <div>
              <h3 className="text-xl font-semibold">Connect Wallet</h3>
              <p className="text-sm text-slate-500 mt-4">
                Connect your wallet to generate an annon aadhar proof to
                continue accessing our platform
              </p>
            </div>
            <div className="w-full flex items-center justify-center">
              <Wallet>
                <ConnectWallet>
                  <Avatar className="h-6 w-6" />
                  <Name />
                </ConnectWallet>
              </Wallet>
            </div>
          </>
        ))}

      {step == 1 && isConnected && address && (
        <>
          <p className="text-xl font-semibold">Create Proof</p>
          <p className="text-sm text-slate-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
            quo magnam obcaecati ratione, ab vero blanditiis temporibus!
          </p>
          <Button className="w-full" onClick={() => setStep(2)}>
            Continue
          </Button>
        </>
      )}

      {step == 2 && isConnected && address && (
        <>
          <p className="text-xl font-semibold">Generate Basename</p>
          <p className="text-sm text-slate-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
            quo magnam obcaecati ratione, ab vero blanditiis temporibus!
          </p>
          {loading ? (
            <Button className="w-full" disabled>
              {" "}
              <Loader2 className="animate-spin" />
            </Button>
          ) : (
            <Button className="w-full" onClick={generateBasename}>
              Generate Basename
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default Page;
