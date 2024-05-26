import { configureStore } from '@reduxjs/toolkit'
import loginModal from './features/modal/loginSlice'
import signup from './features/modal/signupSlice'
import  authReducer  from './features/auth/authSlice'
import addPropertyReducer from './features/modal/addPropertySlice'



export const store = configureStore({
  reducer: {
    loginModal: loginModal,
    signup: signup,
    auth: authReducer,
    addProperty :addPropertyReducer,
    
  },



})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch