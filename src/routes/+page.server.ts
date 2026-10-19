import type { PageServerLoad } from "./$types";
import prayers from '#lib/server/test-db/prayers.json'
import { DateTime } from 'luxon'

const formatDate = (date: string) => {
  return DateTime.fromISO(date).toFormat("LLL yy")
}
export const load: PageServerLoad = () => {
  return {
    prayers: prayers.map(prayer => ({
      ...prayer,
      createdAt: formatDate(prayer.createdAt),
      updatedAt: formatDate(prayer.updatedAt),
      assignedWarriors: prayer.assignedWarriors.map(warrior => ({
        ...warrior,
        joinedAt: formatDate(warrior.joinedAt),
        lastPrayedAt: formatDate(warrior.lastPrayedAt)
      })),
      updates: prayer.updates.map(update => ({
        ...update,
        postedAt: formatDate(update.postedAt)
      }))
    }))
  }
}
