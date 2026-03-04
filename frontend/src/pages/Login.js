import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async () => {
    setError('')
    setLoading(true)
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('name', res.data.name)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="container">
        <div className="auth-logo">
          <div className="logo-icon">✓</div>
        </div>
        <h2>Welcome back</h2>
        <p className="auth-subtitle">Sign in to your TaskFlow account</p>

        {error && <div className="error">{error}</div>}

        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          />
        </div>

        <button onClick={handleSubmit} disabled={loading} style={{ marginTop: '0.5rem' }}>
          {loading ? 'Signing in...' : 'Sign In →'}
        </button>

        <p className="link">Don't have an account? <Link to="/signup">Create one</Link></p>
      </div>
    </div>
  )
}