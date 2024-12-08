"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useAccount } from "wagmi";

const ContactFreelancerBtn = ({
  id,
  freelancerAddress,
}: {
  id: string;
  freelancerAddress: string;
}) => {
  const account = useAccount();
  const router = useRouter();

  const handleClick = async () => {
    const { data } = await axios.post("/api/chatroom", {
      freelancerAddress,
      clientAddress: account.address,
    });

    if (data.success) {
      router.push(`/app/room/${data.chatRoomId}`);
    }
  };

  return <Button onClick={handleClick}>Contact Freelancer</Button>;
};

export default ContactFreelancerBtn;
