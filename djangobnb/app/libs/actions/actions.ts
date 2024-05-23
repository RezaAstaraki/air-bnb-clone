'use server'
import { cookies } from "next/headers"


export async function serverLogin(preState:any,formData:FormData) {
    const res = await fetch('http://127.0.0.1:8000/api/auth/jwt/create/',
        {
            headers:{'content-Type':'application/json',},
            method: 'POST',
            body: JSON.stringify({
                email: formData.get('email') as string,
                'password':formData.get('password') as string,
            })
        }
    )
    const response = await res.json()
    

    handelLogin(response.access, response.refresh)


    return response
    
}

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

export async function getAccessCookie() {
    'use server'
    const access = await cookies().get("session_access_token");

    return access
    
}

