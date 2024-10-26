import { configureStore } from '@reduxjs/toolkit'
import postsReducer from '../features/posts/postsSlice'
import usersReducer from '../features/users/userSlice.js'
import notificationsReducer from '../features/notifications/notificationsSlice.js'

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    notifications: notificationsReducer,
  },
})
