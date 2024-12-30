import { useEffect } from "react";
import toast from "react-hot-toast";

export const useTransactionNotification = (
  isLoading: boolean,
  hasFinished: boolean,
  hasError: boolean,
  errorMessage: undefined | string
) => {
  useEffect(() => {
    if (isLoading) {
      toast.loading("Waiting for TX...", {
        icon: "⏳",
        duration: 4000,
        style: {
          backgroundColor: "#F9BE00",
          color: "#010F0C",
          padding: "12px 16px",
          borderRadius: "8px",
          fontSize: "17px",
          fontWeight: "500",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.25)",
        },
      });
    } else if (hasFinished) {
      toast.dismiss();
      toast.success("TX Succeded!", {
        duration: 4000,
        style: {
          backgroundColor: "#32A96D",
          color: "#010F0C",
          padding: "12px 16px",
          borderRadius: "8px",
          fontSize: "17px",
          fontWeight: "500",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.25)",
        },
      });
    } else if (hasError) {
      toast.dismiss();
      toast.error("Tx error: " + errorMessage, {
        duration: 4000,
        style: {
          backgroundColor: "#F65861",
          color: "#010F0C",
          padding: "12px 16px",
          borderRadius: "8px",
          fontSize: "17px",
          fontWeight: "500",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.25)",
        },
      });
    }

    return;
  }, [isLoading, hasError, hasFinished]);
};
