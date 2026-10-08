import { useEffect, useState } from 'react'
import { API_BASE_URL, normalizeCollection } from '../api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function fetchActivities() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/activities/`, {
          signal: controller.signal,
        })
        if (!response.ok) {
          throw new Error(`Unable to load activities (${response.status}).`)
        }
        setActivities(normalizeCollection(await response.json()))
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError instanceof Error ? requestError.message : 'Unable to load activities.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    void fetchActivities()
    return () => controller.abort()
  }, [])

  return (
    <section>
      <div className="page-heading">
        <p className="eyebrow">Move more, feel better</p>
        <h1>Activities</h1>
        <p className="text-secondary">Recent activity logged by the Octofit community.</p>
      </div>
      {loading && <p role="status">Loading activities…</p>}
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      {!loading && !error && activities.length === 0 && (
        <p className="empty-state">No activities have been logged yet.</p>
      )}
      <div className="row g-3">
        {activities.map((activity) => (
          <div className="col-md-6 col-xl-4" key={activity._id}>
            <article className="card h-100 resource-card">
              <div className="card-body">
                <h2 className="card-title">{activity.activityType || 'Activity'}</h2>
                <p className="card-text text-secondary">
                  {activity.durationMinutes ?? '—'} min
                  {activity.caloriesBurned != null && ` · ${activity.caloriesBurned} calories`}
                </p>
                {activity.date && (
                  <p className="small text-secondary mb-0">
                    {new Date(activity.date).toLocaleDateString()}
                  </p>
                )}
                {activity.notes && <p className="mt-3 mb-0">{activity.notes}</p>}
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Activities
