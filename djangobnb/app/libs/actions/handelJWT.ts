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
        'NOOOOOOOOOOOOOOOOOOOOOOOOOOOOO'
       return 
    }
}
 
export async function getAccessCookie() {
    const accessObject = cookies().get("session_access_token");
    const access = accessObject?.value
    console.log('--->>>>>>>>>>>>access from getAccessCookie', access,'\n')
    if (!access) {
        console.log('inside not access')
        const refresh = await getRefreshCookie()
        console.log(' >>>>>>>>>>>>       refresh 000000000',refresh,'\n')
        if (refresh) {
            const res = await fetch('http://127.0.0.1:8000/api/auth/jwt/refresh', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "refresh": refresh
                })
            })
            if (res.ok) {
                const response = await res.json()
                const newAccess = response?.access

                console.log('new access ------- ', newAccess ,'\n')
                cookies().set('session_access_token', newAccess, {
                    httpOnly: true,
                    secure: true,
                    maxAge: (60 * 5) - 10,
                    path: '/',
                    sameSite: "none",
                });
                return newAccess
            } else {
                console.log('OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO')
                return
            }
        } else {
            console.log('whyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy')
            return
        }
    } return access
}

export async function resetCookies() {
    cookies().delete('session_access_token')
    cookies().delete('session_refresh_token')
    
}