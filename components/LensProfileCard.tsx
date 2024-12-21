"use client";

import { useOwnedHandles, useProfile } from "@lens-protocol/react-web";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export const LensProfileCard = () => {
  const [myHandle, setMyHandle] = useState<string>("Loading...");
  const account = useAccount();
  const { data, loading, error } = useOwnedHandles({
    for: account?.address || "",
  });

  const {
    data: profile
  } = useProfile({
    forHandle: data && data.length > 0 ? data[0].fullHandle : "",
  });

  useEffect(() => {
    if (loading) {
      setMyHandle("Loading...");
    } else if (error) {
      setMyHandle("No handle found");
    } else if (data && data.length > 0) {
      setMyHandle(`@${data[0].localName}`);
    } else {
      setMyHandle("No handle found");
    }
  }, [loading, error, data]);

  //@ts-expect-error Ignore error for now
  const profileImageSrc = profile?.metadata?.picture?.optimized?.uri ||
    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
  //@ts-expect-error Ignore error for now
  const profileImage = profile?.metadata?.picture?.optimized?.uri ? (
    <Image
      className="rounded-full w-16 sm:w-20 md:w-24 lg:w-32"
      src={profileImageSrc}
      alt="Lens Profile Image"
      width={128}
      height={128}
    />
  ) : (
    <div className="avatar placeholder">
      <div className="bg-neutral text-neutral-content w-24 rounded-full">
        <span className="text-3xl"></span>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-auto py-8 justify-center">
      <h3 className="card-title text-left text-base-content">Lens profile</h3>
      <div className="flex flex-col py-4 justify-center items-center">
        {profileImage}
        <p className="text-white font-bold">{myHandle}</p>
      </div>
    </div>
  );
};
