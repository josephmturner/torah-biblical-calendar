import { calculateNewMoons } from './calculateNewMoons'

export const allNewMoons = calculateNewMoons()

export const yearBeginsDate = new Date(allNewMoons[0].getTime())
