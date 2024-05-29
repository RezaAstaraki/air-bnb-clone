'use server'

import { cookies } from "next/headers";

export async function handelCookies(accessToken: string, refreshToken: string) {
    cookies().set('session_access_token', accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: (60 * 5)-10 ,
        path: '/',
        sameSite:"none",
    });
    cookies().set('session_refresh_token', refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: (60 * 60 * 24 * 1)-10,
        path: '/',
        sameSite:"none",
    });  
}

export async function getRefreshCookie() {
    const refreshObject = cookies().get('session_refresh_token')
    console.log('refreshObject ----->', refreshObject)
    if (refreshObject?.value) {
        
        const refresh = refreshObject?.value
        return refresh
    } else {
        throw(new Error('no refresh token'))
    }
}
 
export async function getAccessCookie() {
    const accessObject = cookies().get("session_access_token");
    const access = accessObject?.value
    console.log('access from getAccessCookie', access)
    if (!access) {
        const refresh = await getRefreshCookie()
        // console.log('refresh 000000000',refresh)
        const res = await fetch('http://127.0.0.1:8000/api/auth/jwt/refresh', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "refresh": refresh
            })
        })
        // console.log('****************************')
        // console.log(res)
        // console.log('****************************')
        if (res.ok) {
            const response = await res.json()
            const newAccess = response?.access

            console.log('new access ------- ' ,newAccess)
            cookies().set('session_access_token', newAccess, {
                httpOnly: true,
                secure: true,
                maxAge: (60 * 5)-10 ,
                path: '/',
                sameSite:"none",
            });
            return newAccess
        }
    }
    return access 
}

export async function resetCookies() {
    cookies().delete('session_access_token')
    cookies().delete('session_refresh_token')
    
}