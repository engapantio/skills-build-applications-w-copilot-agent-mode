import { useEffect, useState } from 'react'
import { API_BASE_URL, normalizeCollection } from '../api.js'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function fetchWorkouts() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/workouts/`, {
          signal: controller.signal,
        })
        if (!response.ok) {
          throw new Error(`Unable to load workouts (${response.status}).`)
        }
        setWorkouts(normalizeCollection(await response.json()))
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError instanceof Error ? requestError.message : 'Unable to load workouts.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    void fetchWorkouts()
    return () => controller.abort()
  }, [])

  return (
    <section>
      <div className="page-heading">
        <p className="eyebrow">Find your next challenge</p>
        <h1>Workouts</h1>
        <p className="text-secondary">Choose a workout that fits your day and your goals.</p>
      </div>
      {loading && <p role="status">Loading workouts…</p>}
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      {!loading && !error && workouts.length === 0 && (
        <p className="empty-state">No workouts are available yet.</p>
      )}
      <div className="row g-3">
        {workouts.map((workout) => (
          <div className="col-md-6 col-xl-4" key={workout._id}>
            <article className="card h-100 resource-card">
              <div className="card-body">
                <span className="badge text-bg-success mb-2">{workout.difficulty || 'All levels'}</span>
                <h2 className="card-title">{workout.name || 'Workout'}</h2>
                {workout.description && <p className="card-text text-secondary">{workout.description}</p>}
                <p className="small mb-2">{workout.durationMinutes ?? '—'} minutes</p>
                {Array.isArray(workout.exercises) && (
                  <ul className="small mb-0">
                    {workout.exercises.map((exercise) => <li key={exercise}>{exercise}</li>)}
                  </ul>
                )}
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Workouts
