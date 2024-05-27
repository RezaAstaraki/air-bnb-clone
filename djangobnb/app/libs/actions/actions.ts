'use server'
import { cookies } from "next/headers"


export async function createUser(formData: FormData) {
    const res = await fetch('http://127.0.0.1:8000/api/auth/users/',
        {
            method: 'POST',
            headers:{'content-Type':'application/json',},
            body: JSON.stringify({
                name: formData.get('name') as string,
                email: formData.get('email') as string,
                'password':formData.get('password') as string,
                're_password':formData.get('re_password') as string,
            })
        }
    )
    const response = await res.json()
    if (!res.ok) {
        const err = response
        return {
            resOK: res.ok,
            message: response
        }   
    } else {
        return {
            resOK: res.ok,
            message: null
        }
    }    
}


export async function activateUser(formData: FormData) {
    console.log(FormData)
    const res = await fetch('http://localhost:8000/api/auth/users/activation/',
        {
            method: 'POST',
            headers:{'content-Type':'application/json',},
            body: JSON.stringify({
                token : formData.get('token') as string,
                uid : formData.get('uid') as string,
            })
        }
    )
    if (!res.ok) {
        const response = await res.json()
        const err = response
        return {
            resOK: res.ok,
            message: response
        }   
    } else {
        return {
            resOK: res.ok,
            message: null
        }
    }
}





export async function serverLogin(formData:FormData) {
    const res = await fetch('http://127.0.0.1:8000/api/auth/jwt/create/',
        {
            method: 'POST',
            headers:{'content-Type':'application/json',},
            body: JSON.stringify({
                email: formData.get('email') as string,
                'password':formData.get('password') as string,
            })
        }
    )
    const response = await res.json()
    if (!res.ok) {
        const err = response
        return {
            resOK: res.ok,
            message: response
        }   
    } else {
        handelCookies(response.access, response.refresh)
        return {
            resOK: res.ok,
            message: null
        }
    }
    
}

export async function handelCookies(accessToken: string, refreshToken: string) {
    cookies().set('session_access_token', accessToken, {
        httpOnly: true,
        secure: true,
        maxAge:60*60,
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
    const access =  cookies().get("session_access_token");

    return access
    
}

export async function getCurrentUser() {
    const access = await getAccessCookie()
    try {

        const res = await fetch('http://127.0.0.1:8000/api/auth/users/me/',
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${access?.value}`,            
                },
                cache:'force-cache'
            }
        )
        const response = await res.json()
        return response
        
    } catch (error) { 
        console.log(error);
        
     }
}

export async function resetCookies() {
    cookies().delete('session_access_token')
    cookies().delete('session_refresh_token')
    
}

