'use server'
import { cookies } from "next/headers"

export async function handelLogin(accessToken: string, refreshToken: string) {
    cookies().set('session_access_token', accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60,
        path: '/',
        sameSite:"none",
    });
    cookies().set('session_refresh_token', refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60*24*7,
        path: '/',
        sameSite:"none",
    });
    
}