import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isAuth: false,
    firstLoad: true,    
}

const  authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        setAuth: (state) => {
            state.isAuth=true

        },
        finishFirstLoad: (state) => {
            state.firstLoad=false
        }
    }

})

export default authSlice.reducer
export const {setAuth,finishFirstLoad} = authSlice.actions