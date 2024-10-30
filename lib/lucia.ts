import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import prisma from "./prisma";
import { Lucia } from "lucia";

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        name: "next-lucia-cookie",
        expires: true,
        attributes: {
            secure: process.env.NODE_ENV === "production"
        }
    }
})