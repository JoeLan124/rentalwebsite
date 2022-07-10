import config from "lib/config";

// export const getBookedDates = () => {
//   const bookedDates = [];

//   if (config.booked) {
//     for (const [year_key, year_value] of Object.entries(config.booked)) {
//       for (const [month_key, month_value] of Object.entries(year_value)) {
//         for (const day of month_value) {
//           bookedDates.push(new Date(year_key, month_key - 1, day));
//         }
//       }
//     }
//   }

//   return bookedDates;
// };

// Prisma VERSION
import { getDatesBetweenDates } from "lib/dates";

export const getBookedDates = async (prisma) => {
  const bookedDates = [];

  const bookings = await prisma.booking.findMany();

  for (const booking of bookings) {
    const dates = getDatesBetweenDates(booking.from, booking.to);

    bookedDates.push(booking.from);

    for (const bookedDay of dates) {
      bookedDates.push(bookedDay);
    }
  }

  return bookedDates;
};
