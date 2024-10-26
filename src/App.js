import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

import { Navbar } from './app/Navbar'
import PostList from './features/posts/PostList'
import AddPostForm from './features/posts/AddPostForm'
import SinglePostPage from './features/posts/SinglePostPage'
import EditPostForm from './features/posts/EditPostForm'
import UserList from './features/users/UserList'
import UserPage from './features/users/UserPage'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <AddPostForm />
                <PostList />
              </>
            }
          />
          <Route path="/posts/:postId" element={<SinglePostPage />} />
          <Route path="/editPost/:postId" element={<EditPostForm />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:userId" element={<UserPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
