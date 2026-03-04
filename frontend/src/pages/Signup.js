import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async () => {
    setError('')
    setLoading(true)
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', form)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('name', res.data.name)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed')
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
        <h2>Create account</h2>
        <p className="auth-subtitle">Start organizing your tasks today</p>

        {error && <div className="error">{error}</div>}

        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            placeholder="John Doe"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
        </div>
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
          {loading ? 'Creating account...' : 'Get Started →'}
        </button>

        <p className="link">Already have an account? <Link to="/login">Sign in</Link></p>
      </div>
    </div>
  )
}