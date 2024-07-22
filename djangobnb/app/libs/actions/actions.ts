"use server";

import { revalidatePath } from "next/cache";
import { getAccessCookie, handelCookies } from "./handelJWT";
import { cookies } from "next/headers";

export async function createUser(formData: FormData) {
  const res = await fetch("http://127.0.0.1:8000/api/auth/users/", {
    method: "POST",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      re_password: formData.get("re_password") as string,
    }),
  });
  const response = await res.json();
  if (!res.ok) {
    const err = response;
    return {
      resOK: res.ok,
      message: response,
    };
  } else {
    return {
      resOK: res.ok,
      message: null,
    };
  }
}

export async function activateUser(formData: FormData) {
  // console.log(FormData)
  const res = await fetch("http://localhost:8000/api/auth/users/activation/", {
    method: "POST",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify({
      token: formData.get("token") as string,
      uid: formData.get("uid") as string,
    }),
  });
  if (!res.ok) {
    const response = await res.json();
    const err = response;
    return {
      resOK: res.ok,
      message: response,
    };
  } else {
    return {
      resOK: res.ok,
      message: null,
    };
  }
}

export async function serverLogin(formData: FormData) {
  const res = await fetch("http://127.0.0.1:8000/api/auth/jwt/create/", {
    method: "POST",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    }),
  });
  const response = await res.json();
  if (!res.ok) {
    const err = response;
    return {
      resOK: res.ok,
      message: response,
    };
  } else {
    handelCookies(response.access, response.refresh);
    revalidatePath("/");
    return {
      resOK: res.ok,
      message: null,
    };
  }
}

export async function getCurrentUser() {
  const access = await getAccessCookie();
  try {
    const res = await fetch("http://127.0.0.1:8000/api/auth/users/me/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access}`,
      },
      cache: "force-cache",
    });
    const response = await res.json();
    return response;
  } catch (error) {
    // console.log(error);
  }
}

export async function getLandlordDetails(landlordID: string) {
  // const access = await getAccessCookie()
  try {
    const res = await fetch(
      `http://127.0.0.1:8000/api/landlords/${landlordID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // 'Authorization': `Bearer ${access}`,
        },
        cache: "no-cache",
      }
    );
    const response = await res.json();
    return response;
  } catch (error) {
    // console.log(error);
  }
}

export interface Landlord {
  id: string;
  name: string;
  avatar: string;
}

export interface PropertyDetail {
  id: string;
  landlord: any;
  title: string;
  descriptions: string;
  price_per_night: number;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  country: string;
  country_code: string;
  category: string;
  image: string;
}

export async function getPropertyDetail(propertyId: string) {
  try {
    const res = await fetch(
      `http://127.0.0.1:8000/api/properties/${propertyId}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": `application/json`,
        },
        cache: "no-cache",
      }
    );

    // console.log(res)
    if (res.ok) {
      const response = await res.json();
      return response;
    }
  } catch (error) {
    // console.log(error);
    throw error;
  }
}

export async function submitPropertyData(formData: FormData) {
  // const accessObject = await getAccessCookie();
  const access = await getAccessCookie();

  // console.log('Authorization Header:', `Bearer ${access}`);

  const res = await fetch(`http://127.0.0.1:8000/api/properties/create/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access}`,
      // 'Content-Type': 'application/json', // Not needed when using FormData
    },
    body: formData,
  });

  // console.log(res);

  // Check the response status
  if (res.ok) {
    const data = await res.json();
    revalidatePath("/");
  } else {
    const errorData = await res.json();
    console.error("Error:", errorData);
  }
}

export async function postBooking(formData: FormData, propertyId: string) {
  const access = await getAccessCookie();
  const res = await fetch(
    `http://127.0.0.1:8000/api/properties/${propertyId}/book/`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access}`,
      },
      body: formData,
    }
  );
  revalidatePath(`/properties/${propertyId}/`);
}

export async function getPropertyReservationList(propertyId: string) {
  const res = await fetch(
    `http://127.0.0.1:8000/api/properties/${propertyId}/reservations/`,

    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    }
  );
  if (res.ok) {
    revalidatePath('/myreservations')
    const response = await res.json();
    return response;
  }
}

export async function getMyReservations() {
  const access = await getAccessCookie();
  const res = await fetch(
    `http://127.0.0.1:8000/api/myreservations/`,

    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
      cache: "no-cache",
    }
  );
  if (res.ok) {
    const response = await res.json();
    return response;
  } else {
    throw new Error("can not get reservations");
  }
}

export async function toggleFavorite(propertyId: string) {
  // const accessObject = await getAccessCookie();
  const access = await getAccessCookie();

  // console.log('Authorization Header:', `Bearer ${access}`);

  const res = await fetch(
    `http://127.0.0.1:8000/api/properties/${propertyId}/toggle_favorite/`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access}`,
        // 'Content-Type': 'application/json', // Not needed when using FormData
      },
    }
  );
  if (res.ok) {
    revalidatePath("/");
    return await res.json();
  } else {
    const response = await res.json();
    return response.code;
  }
}
export async function getProperties(query: string) {
  const access = cookies().get("session_access_token");
  const cookie = `${access?.name}=${access?.value}`;
  const res = await fetch(`http://127.0.0.1:8000/api/properties/?${query}`, {
    credentials: "include",

    headers: {
      "Content-Type": "application/json",
      Cookie: cookie,
    },
    cache: "no-store",
  });
  // revalidatePath('/')
  return await res.json();
}

export async function getConversations() {
  const access = await getAccessCookie();
  const res = await fetch(
    `http://localhost:8000/api/chat/`,

    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
      cache: "no-cache",
    }
  );
  if (res.ok) {
    const response = await res.json();
    return response;
  } else {
    throw new Error("can not get reservations");
  }
}
