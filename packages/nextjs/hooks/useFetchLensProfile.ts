import { useOwnedHandles, useProfile } from "@lens-protocol/react-web";
import { useEffect, useState } from "react";

export const useFetchLensProfile = (walletAddress: string) => {
  const [myHandle, setMyHandle] = useState<string>("");
  const [profileImage, setProfileImage] = useState(
    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
  );

  const { data, loading, error } = useOwnedHandles({
    for: walletAddress || "",
  });

  const { data: profile } = useProfile({
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
    //@ts-expect-error
    const profileImageSrc = profile?.metadata?.picture?.optimized?.uri;
    if (profileImageSrc) {
      setProfileImage(profileImageSrc);
    }
  }, [loading, error, data, profile]);

  return { handle: myHandle, image: profileImage };
};
