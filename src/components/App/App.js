import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Activity, Exercise, Home, Login, Nutrition, Register } from "components"
import { AuthContextProvider, useAuthContext } from "contexts/auth"
import apiClient from "services/apiClient";
import './App.css';

export default function AppContainer() {
  return (
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  )
}

function App() {
  const {user, setUser} = useAuthContext()
  const [isFetching, setIsFetching] = useState(false)
  const [activityFeed, setActivityFeed] = useState({})
  const [exerciseFeed, setExerciseFeed] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchActivityFeed = async () => {
      setIsFetching(true)

      const { data, error } = await apiClient.activityFeed()
      if (error) {
        setError((e) => ({ ...e, db: error}))
        setActivityFeed({})
      }
      if (data?.stats) {
        setError(null)
        setActivityFeed(data.stats)
      } 

      setIsFetching(false)
    }

    fetchActivityFeed()
  }, [user, exerciseFeed])

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await apiClient.fetchUserFromToken()
      if (data) {
        setUser(data.user)
      }
      if (error) {
        setError(error)
      }
    }

    const token = localStorage.getItem("life_tracker_token")
    if (token) {
      console.log("Inside if for UseEffect")
      apiClient.setToken(token)
      fetchUser()
    }
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activity" element={<Activity activityFeed={activityFeed} />} />
          <Route path="/exercises" element={<Exercise exerciseFeed={exerciseFeed} setExerciseFeed={setExerciseFeed} />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// export default App;
