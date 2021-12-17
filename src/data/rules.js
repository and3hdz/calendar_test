const oddDay = {
  // non-par days
  start: { fullHour: "13:00", hour: 13, minutes: 0 },
  end: { fullHour: "19:00", hour: 19, minutes: 0 },
  break: {
    start: { fullHour: "16:00", hour: 16, minutes: 0 },
    end: { fullHour: "16:30", hour: 16, minutes: 30 },
  },
};
const evenDay = {
  // par days
  start: { fullHour: "8:00", hour: 8, minutes: 0 },
  end: { fullHour: "14:00", hour: 14, minutes: 30 },
  break: {
    start: { fullHour: "11:00", hour: 11, minutes: 0 },
    end: { fullHour: "11:30", hour: 11, minutes: 30 },
  },
};

const calendarRules = {
  appointment: {
    maxWeek: 2,
    maxDay: 2,
    duration: 30, // minutes
  },
  evenDay,
  oddDay,
};

export default calendarRules;
