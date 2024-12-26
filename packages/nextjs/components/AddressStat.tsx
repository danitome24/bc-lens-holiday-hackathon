import React from "react";
import { WalletSVG } from ".";

type AddressStatProps = {
  walletAddress: string;
};

export const AddressStat = ({ walletAddress }: AddressStatProps) => {
  const formattedAddress =
    walletAddress != ""
      ? `${walletAddress.slice(0, 5)}...${walletAddress.slice(-5)}`
      : "-";

  return (
    <div className="stat">
      <div className="stat-figure text-secondary">
        <WalletSVG />
      </div>
      <div className="stat-title">Account</div>
      <div className="stat-value text-secondary">{formattedAddress}</div>
      <div className="stat-desc">Jan 1st - Feb 1st</div>
    </div>
  );
};
