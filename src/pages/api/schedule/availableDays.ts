import { NextApiRequest, NextApiResponse } from 'next'
import moment from 'moment'

export default (request: NextApiRequest, response: NextApiResponse) => {
  const availableHoursPerDay = [
    {
      id: 0,
    },
    {
      id: 1,
      start: '8:00',
      end: '12:00',
      start2: '13:00',
      end2: '18:00',
    },
    {
      id: 2,
      start: '8:00',
      end: '12:00',
      start2: '13:00',
      end2: '18:00',
    },
    {
      id: 3,
      start: '8:00',
      end: '12:00',
      start2: '13:00',
      end2: '18:00',
    },
    {
      id: 4,
      start: '8:00',
      end: '12:00',
      start2: '13:00',
      end2: '18:00',
    },
    {
      id: 5,
      start: '8:00',
      end: '12:00',
      start2: '13:00',
      end2: '18:00',
    },
    {
      id: 6,
      start: '8:00',
      end: '12:00',
    },
  ]

  const { selectedDate } = request.query

  const selectedWeekDay = moment(selectedDate).day()
  const currentDayHours = availableHoursPerDay.filter(
    (item) => item.id === selectedWeekDay
  )
  const rangesMorning: string[] = []
  const rangesAfternoon: string[] = []
  const now = moment()

  let start = moment(currentDayHours[0]?.start, 'HH:mm')
  if (
    moment(selectedDate).date() === moment().date() &&
    moment().hour() >= start.hour()
  ) {
    start = moment(`${now.hour()}:00`, 'HH:mm')
  }
  const end = moment(currentDayHours[0]?.end, 'HH:mm')
  while (start < end) {
    rangesMorning.push(start.format('HH:mm'))
    start.add(30, 'minutes')
  }

  let start2 = moment(currentDayHours[0]?.start2, 'HH:mm')
  if (
    moment(selectedDate).date() === moment().date() &&
    moment().hour() >= start2.hour()
  ) {
    start2 = moment(`${now.hour()}:00`, 'HH:mm')
  }
  const end2 = moment(currentDayHours[0]?.end2, 'HH:mm')
  while (start2 < end2) {
    rangesAfternoon.push(start2.format('HH:mm'))
    start2 = start2.add(30, 'minutes')
  }

  return response.json({ rangesMorning, rangesAfternoon })
}
