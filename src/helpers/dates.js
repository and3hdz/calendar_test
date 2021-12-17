import moment from "moment";
import calendarRules from "../data/rules";

export const isActiveDay = (d) => {
  // d = date
  if (d.isoWeekday() <= 5) {
    return true;
  }

  if (d.isoWeekday() === 6 && d.date() % 2 === 0) {
    return true;
  }

  return false;
};

export const createWeek = (numWeek = 1) => {
  const week = [];

  const initialAddDays = numWeek === 1 ? 1 : (numWeek - 1) * 7;

  // inital day === tomorrow
  let initialDay = moment().add(initialAddDays, "days");

  if (initialDay.isoWeekday() === 7) {
    initialDay.add(1, "days");
  }

  for (let x = 0; x <= 6; x++) {
    const newDay = moment(initialDay).add(x, "days");

    week.push({
      date: newDay,
      active: isActiveDay(newDay),
      even: newDay.date() % 2 === 0,
    });
  }

  return week;
};

export const isActiveHour = (day, h) => {
  if (!day.active) {
    return false;
  }
  const { evenDay, oddDay } = calendarRules;

  // even day
  if (day.date.date() % 2 === 0) {
    // after start hour and before end hour
    if (h.hour >= evenDay.start.hour && isBeforeClose(h, true)) {
      return true;
    }
  }

  // odd day
  if (day.date.date() % 2 !== 0) {
    // after start hour and before end hour
    if (h.hour >= oddDay.start.hour && h.hour <= oddDay.end.hour) {
      return true;
    }
  }

  return false;
};

const isBeforeClose = (h, even) => {
  if (even) {
    if (h.hour < calendarRules.evenDay.end.hour) {
      return true;
    }
    return false;
  }

  if (h.hour < calendarRules.oddDay.end.hour) {
    return true;
  }

  return false;
};

export const isBetweenLunch = (day, h) => {
  const type = day.even ? "evenDay" : "oddDay";

  if (
    h.hour === calendarRules[type].break.start.hour &&
    h.minutes === calendarRules[type].break.start.minutes
  ) {
    return true;
  }

  if (
    h.hour === calendarRules[type].break.end.hour &&
    h.minutes === calendarRules[type].break.end.minutes
  ) {
    return false;
  }

  return false;
};

export const isSelected = (day, hours, userAppointments) => {
  const tryDate = day.date.set({
    hours: hours.hour,
    minutes: hours.minutes,
    seconds: 0,
  });

  if (userAppointments.length > 0) {
    const evaluate = userAppointments.some((item) => {
      return moment(item).isSame(tryDate, "minutes");
    });

    return evaluate;
  }

  return false;
};

export const isBusy = (day, hours, appointments) => {
  const tryDate = day.date.set({
    hours: hours.hour,
    minutes: hours.minutes,
    seconds: 0,
  });

  if (appointments.length > 0) {
    const evaluate = appointments.some((item) => {
      return moment(item).isSame(tryDate, "minutes");
    });

    return evaluate;
  }

  return false;
};

export const createInitialAppointments = () => {
  const week = createWeek().filter((item) => item.active);

  let appointments = [];
  let loops = 0;
  let prevDate = "";

  // while (loops < 50) {
  while (appointments.length <= 14 && loops < 50) {
    const randomSelected = week[getRandom(0, week.length)];
    const randomDate = randomSelected.date;

    if (prevDate !== randomDate.format("DD-MM-YYYY")) {
      const startHour =
        randomDate.date() % 2 === 0
          ? calendarRules.evenDay.start.hour
          : calendarRules.oddDay.start.hour;

      const endHour =
        randomDate.date() % 2 === 0
          ? calendarRules.evenDay.end.hour
          : calendarRules.oddDay.end.hour;

      const randomHour = getRandom(startHour, endHour);

      const randomMinutes = minutesOpt[getRandom(0, 2)];

      const hours = {
        hour: randomHour,
        minutes: randomMinutes,
      };

      if (
        !isBusy(randomSelected, hours, appointments) &&
        !isBetweenLunch(randomSelected, hours)
      ) {
        const newDate = moment(randomDate.format("YYYY-MM-DD")).set({
          ...hours,
          seconds: 0,
        });

        appointments = [...appointments, newDate.toDate()];
      }
    }

    loops++;
    prevDate = randomDate.format("DD-MM-YYYY");
  }

  return appointments;
};

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const minutesOpt = [30, 0];
