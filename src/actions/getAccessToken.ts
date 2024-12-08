"use server";

import { Role } from "@huddle01/server-sdk/auth";

export const getAccessToken = async ({
  roomId,
  role,
}: {
  roomId: string;
  role: Role;
}) => {
  const response = await fetch(
    `https://bazd-freelnance.vercel.app/api/token?roomId=${roomId}&role=${role}`
  );

  const token = await response.text();

  return token;
};
