import { useEffect, useState } from 'react'
import { API_BASE_URL, normalizeCollection } from '../api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function fetchTeams() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/teams/`, {
          signal: controller.signal,
        })
        if (!response.ok) {
          throw new Error(`Unable to load teams (${response.status}).`)
        }
        setTeams(normalizeCollection(await response.json()))
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError instanceof Error ? requestError.message : 'Unable to load teams.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    void fetchTeams()
    return () => controller.abort()
  }, [])

  return (
    <section>
      <div className="page-heading">
        <p className="eyebrow">Better together</p>
        <h1>Teams</h1>
        <p className="text-secondary">Find your team and build healthy habits together.</p>
      </div>
      {loading && <p role="status">Loading teams…</p>}
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      {!loading && !error && teams.length === 0 && (
        <p className="empty-state">No teams have been created yet.</p>
      )}
      <div className="row g-3">
        {teams.map((team) => (
          <div className="col-md-6 col-xl-4" key={team._id}>
            <article className="card h-100 resource-card">
              <div className="card-body">
                <h2 className="card-title">{team.name || 'Team'}</h2>
                <p className="card-text text-secondary">
                  {team.description || 'A community of Octofit members.'}
                </p>
                <div className="d-flex justify-content-between small">
                  <span>{team.members?.length ?? 0} members</span>
                  <span className="fw-semibold">{team.totalPoints ?? 0} points</span>
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Teams
