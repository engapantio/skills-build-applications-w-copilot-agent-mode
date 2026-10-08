import { useEffect, useState } from 'react'
import { API_BASE_URL, normalizeCollection } from '../api.js'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function fetchLeaderboard() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/leaderboard/`, {
          signal: controller.signal,
        })
        if (!response.ok) {
          throw new Error(`Unable to load the leaderboard (${response.status}).`)
        }
        setEntries(normalizeCollection(await response.json()))
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError instanceof Error ? requestError.message : 'Unable to load the leaderboard.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    void fetchLeaderboard()
    return () => controller.abort()
  }, [])

  const rankedEntries = [...entries].sort((left, right) => (right.score ?? 0) - (left.score ?? 0))

  return (
    <section>
      <div className="page-heading">
        <p className="eyebrow">Celebrate every milestone</p>
        <h1>Leaderboard</h1>
        <p className="text-secondary">See how the community is progressing.</p>
      </div>
      {loading && <p role="status">Loading leaderboard…</p>}
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      {!loading && !error && rankedEntries.length === 0 && (
        <p className="empty-state">Leaderboard entries will appear here.</p>
      )}
      {!loading && !error && rankedEntries.length > 0 && (
        <div className="table-responsive resource-card">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">Participant</th>
                <th scope="col" className="text-end">Points</th>
              </tr>
            </thead>
            <tbody>
              {rankedEntries.map((entry, index) => (
                <tr key={entry._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{entry.userId ? 'Member' : entry.teamId ? 'Team' : 'Participant'}</td>
                  <td className="text-end fw-semibold">{entry.score ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Leaderboard
