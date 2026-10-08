import mongoose from 'mongoose';
import Activity from '../models/activity.js';
import Leaderboard from '../models/leaderboard.js';
import Team from '../models/team.js';
import User from '../models/user.js';
import Workout from '../models/workout.js';

/**
 * Seed the octofit_db database with test data, updating existing demo records.
 */
async function seedDatabase() {
  const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    const users = [
      {
        id: '670000000000000000000001',
        username: 'alex.runner',
        email: 'alex.runner@example.com',
        displayName: 'Alex Runner',
        teamId: '670000000000000000000010',
        totalPoints: 340,
      },
      {
        id: '670000000000000000000002',
        username: 'sam.cyclist',
        email: 'sam.cyclist@example.com',
        displayName: 'Sam Cyclist',
        teamId: '670000000000000000000010',
        totalPoints: 275,
      },
      {
        id: '670000000000000000000003',
        username: 'jordan.yoga',
        email: 'jordan.yoga@example.com',
        displayName: 'Jordan Yoga',
        teamId: '670000000000000000000011',
        totalPoints: 310,
      },
      {
        id: '670000000000000000000004',
        username: 'taylor.hiker',
        email: 'taylor.hiker@example.com',
        displayName: 'Taylor Hiker',
        teamId: '670000000000000000000011',
        totalPoints: 220,
      },
    ];

    const teams = [
      {
        id: '670000000000000000000010',
        name: 'Trail Blazers',
        description: 'A team for runners and outdoor adventurers.',
        members: users
          .filter((user) => user.teamId === '670000000000000000000010')
          .map((user) => new mongoose.Types.ObjectId(user.id)),
        totalPoints: 615,
      },
      {
        id: '670000000000000000000011',
        name: 'Zenith Movers',
        description: 'A team focused on balance, strength, and consistency.',
        members: users
          .filter((user) => user.teamId === '670000000000000000000011')
          .map((user) => new mongoose.Types.ObjectId(user.id)),
        totalPoints: 530,
      },
    ];

    for (const team of teams) {
      const data = {
        name: team.name,
        description: team.description,
        members: team.members,
        totalPoints: team.totalPoints,
      };
      if (await Team.exists({ _id: team.id })) {
        await Team.updateOne({ _id: team.id }, { $set: data }, { runValidators: true });
      } else {
        await Team.create({ _id: team.id, ...data });
      }
    }

    for (const user of users) {
      const data = {
        username: user.username,
        email: user.email,
        displayName: user.displayName,
        teamId: new mongoose.Types.ObjectId(user.teamId),
        totalPoints: user.totalPoints,
      };
      if (await User.exists({ _id: user.id })) {
        await User.updateOne({ _id: user.id }, { $set: data }, { runValidators: true });
      } else {
        await User.create({ _id: user.id, ...data });
      }
    }

    const activities = [
      {
        id: '670000000000000000000020',
        userId: '670000000000000000000001',
        activityType: 'Running',
        durationMinutes: 35,
        caloriesBurned: 320,
        date: new Date('2026-10-01T08:00:00.000Z'),
        notes: 'Steady morning park run.',
      },
      {
        id: '670000000000000000000021',
        userId: '670000000000000000000002',
        activityType: 'Cycling',
        durationMinutes: 50,
        caloriesBurned: 410,
        date: new Date('2026-10-02T07:30:00.000Z'),
        notes: 'Outdoor endurance ride.',
      },
      {
        id: '670000000000000000000022',
        userId: '670000000000000000000003',
        activityType: 'Yoga',
        durationMinutes: 40,
        caloriesBurned: 180,
        date: new Date('2026-10-02T17:00:00.000Z'),
        notes: 'Mobility and recovery session.',
      },
      {
        id: '670000000000000000000023',
        userId: '670000000000000000000004',
        activityType: 'Hiking',
        durationMinutes: 75,
        caloriesBurned: 520,
        date: new Date('2026-10-03T09:00:00.000Z'),
        notes: 'Weekend hill trail.',
      },
    ];

    for (const activity of activities) {
      const data = {
        userId: new mongoose.Types.ObjectId(activity.userId),
        activityType: activity.activityType,
        durationMinutes: activity.durationMinutes,
        caloriesBurned: activity.caloriesBurned,
        date: activity.date,
        notes: activity.notes,
      };
      if (await Activity.exists({ _id: activity.id })) {
        await Activity.updateOne({ _id: activity.id }, { $set: data }, { runValidators: true });
      } else {
        await Activity.create({ _id: activity.id, ...data });
      }
    }

    const leaderboardEntries = [
      { id: '670000000000000000000030', userId: '670000000000000000000001', score: 340 },
      { id: '670000000000000000000031', userId: '670000000000000000000003', score: 310 },
      { id: '670000000000000000000032', userId: '670000000000000000000002', score: 275 },
      { id: '670000000000000000000033', userId: '670000000000000000000004', score: 220 },
      { id: '670000000000000000000034', teamId: '670000000000000000000010', score: 615 },
      { id: '670000000000000000000035', teamId: '670000000000000000000011', score: 530 },
    ];

    for (const entry of leaderboardEntries) {
      const data = {
        ...(entry.userId && { userId: new mongoose.Types.ObjectId(entry.userId) }),
        ...(entry.teamId && { teamId: new mongoose.Types.ObjectId(entry.teamId) }),
        score: entry.score,
      };
      if (await Leaderboard.exists({ _id: entry.id })) {
        await Leaderboard.updateOne({ _id: entry.id }, { $set: data }, { runValidators: true });
      } else {
        await Leaderboard.create({ _id: entry.id, ...data });
      }
    }

    const workouts = [
      {
        id: '670000000000000000000040',
        name: 'Beginner Full-Body Circuit',
        description: 'A simple strength circuit for building a consistent routine.',
        difficulty: 'Beginner',
        durationMinutes: 25,
        exercises: ['Bodyweight squats', 'Incline push-ups', 'Glute bridges', 'Plank'],
      },
      {
        id: '670000000000000000000041',
        name: 'Tempo Run',
        description: 'A paced running workout to improve cardiovascular endurance.',
        difficulty: 'Intermediate',
        durationMinutes: 35,
        exercises: ['Warm-up jog', 'Tempo intervals', 'Cool-down walk'],
      },
      {
        id: '670000000000000000000042',
        name: 'Cycling Endurance Ride',
        description: 'A steady ride focused on aerobic endurance.',
        difficulty: 'Intermediate',
        durationMinutes: 50,
        exercises: ['Easy spin', 'Steady cadence ride', 'Recovery spin'],
      },
      {
        id: '670000000000000000000043',
        name: 'Mobility and Recovery',
        description: 'A gentle sequence for flexibility and recovery.',
        difficulty: 'Beginner',
        durationMinutes: 20,
        exercises: ['Cat-cow stretch', 'Low lunge', 'Seated twist', 'Child’s pose'],
      },
    ];

    for (const workout of workouts) {
      const data = {
        name: workout.name,
        description: workout.description,
        difficulty: workout.difficulty,
        durationMinutes: workout.durationMinutes,
        exercises: workout.exercises,
      };
      if (await Workout.exists({ _id: workout.id })) {
        await Workout.updateOne({ _id: workout.id }, { $set: data }, { runValidators: true });
      } else {
        await Workout.create({ _id: workout.id, ...data });
      }
    }

    console.log(
      `Database seeding complete: ${users.length} users, ${teams.length} teams, ` +
        `${activities.length} activities, ${leaderboardEntries.length} leaderboard entries, ` +
        `${workouts.length} workouts added or updated`,
    );
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

void seedDatabase();
