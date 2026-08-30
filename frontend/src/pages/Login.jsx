import { useState } from "react"

function Login({ onLogin }) {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("student")

  const handleSubmit = (e) => {

    e.preventDefault()

    onLogin({
      email: email,
      password: password,
      role: role
    })

  }

  return (

    <div className="login-page">

      <div className="login-card">

        <h1>🛰️ MUJ SmartCampus</h1>

        <p>Login to your campus account</p>


        <form onSubmit={handleSubmit}>

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your MUJ email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />


          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />


          <label>Role</label>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >

            <option value="student">
              Student
            </option>

            <option value="driver">
              Driver
            </option>

            <option value="security">
              Security
            </option>

            <option value="admin">
              Admin
            </option>

          </select>


          <button type="submit">
            Login
          </button>

        </form>

      </div>

    </div>

  )
}

export default Login