import { useEffect, useState } from 'react'
import { API_BASE_URL, normalizeCollection } from '../api.js'

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function fetchUsers() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/users/`, {
          signal: controller.signal,
        })
        if (!response.ok) {
          throw new Error(`Unable to load users (${response.status}).`)
        }
        setUsers(normalizeCollection(await response.json()))
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError instanceof Error ? requestError.message : 'Unable to load users.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    void fetchUsers()
    return () => controller.abort()
  }, [])

  return (
    <section>
      <div className="page-heading">
        <p className="eyebrow">Meet the community</p>
        <h1>Users</h1>
        <p className="text-secondary">Octofit members and their activity points.</p>
      </div>
      {loading && <p role="status">Loading users…</p>}
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      {!loading && !error && users.length === 0 && (
        <p className="empty-state">No users have joined yet.</p>
      )}
      <div className="row g-3">
        {users.map((user) => (
          <div className="col-md-6 col-xl-4" key={user._id}>
            <article className="card h-100 resource-card">
              <div className="card-body">
                <h2 className="card-title">{user.displayName || user.username || 'Member'}</h2>
                {user.email && <p className="card-text text-secondary">{user.email}</p>}
                <p className="mb-0 small fw-semibold">{user.totalPoints ?? 0} points</p>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Users
