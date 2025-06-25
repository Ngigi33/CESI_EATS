import React, { useEffect, useState } from 'react'
import axios from 'axios'

const UserProfile = () => {
  const [user, setUser] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [form, setForm] = useState({})
  
  const token = localStorage.getItem("token")

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get('http://localhost:5000/api/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      setUser(res.data)
      setForm(res.data)
    }
    fetchUser()
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleUpdate = async () => {
    await axios.put(`http://localhost:8080/api/users/${user.id}`, form, {
      headers: { Authorization: `Bearer ${token}` },
    })
    setEditMode(false)
  }

  return user ? (
    <div>
      <h2>Profile</h2>
      <div>
        <label>Username:</label>
        <input name="username" value={form.username} disabled={!editMode} onChange={handleChange} />
      </div>
      <div>
        <label>Email:</label>
        <input name="email" value={form.email} disabled />
      </div>
      <div>
        <label>Phone:</label>
        <input name="phone" value={form.phone || ''} disabled={!editMode} onChange={handleChange} />
      </div>
      <div>
        <label>Address:</label>
        <input name="address" value={form.address || ''} disabled={!editMode} onChange={handleChange} />
      </div>

      {editMode ? (
        <button onClick={handleUpdate}>Save</button>
      ) : (
        <button onClick={() => setEditMode(true)}>Edit Profile</button>
      )}
    </div>
  ) : (
    <p>Loading profile...</p>
  )
}

export default UserProfile