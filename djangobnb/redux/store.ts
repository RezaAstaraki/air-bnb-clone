import { configureStore } from '@reduxjs/toolkit'
import loginModal from './features/modal/loginSlice'
import signup from './features/modal/signupSlice'
import { propertyApi } from './features/servicess/property/propertyApi'
import { authApi } from './features/servicess/auth/authAPI'


export const store = configureStore({
  reducer: {
    loginModal: loginModal,
    signup: signup,
    
    [propertyApi.reducerPath]:propertyApi.reducer,
    [authApi.reducerPath]:authApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(propertyApi.middleware,authApi.middleware),

})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch