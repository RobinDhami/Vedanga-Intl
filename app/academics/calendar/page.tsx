'use client';
import academicCalendar from "@/data/calender";
import { getEnglishDate } from "@/utils/datemapping";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import nepaliDate from "nepali-date-converter";
import { useState } from "react";


type Event = {
  date: string;
  event: string;
  category: string;
};

type Holiday = {
  date: string;
  event: string;
};

type CalendarItem = Event | Holiday;

const categoryColors = {
  general: "bg-gray-400 text-gray-800 border-l-4 border-gray-500",
  celebration: "bg-green-200 text-green-800 border-l-4 border-green-500",
  activity: "bg-blue-200 text-blue-800 border-l-4 border-blue-500",
  competition: "bg-yellow-200 text-yellow-800 border-l-4 border-yellow-500",
  awareness: "bg-purple-200 text-purple-800 border-l-4 border-purple-500",
  exam: "bg-orange-300 text-orange-800 border-l-4 border-orange-500",
  pti: "bg-pink-200 text-pink-800 border-l-4 border-pink-500",
  internal: "bg-cyan-200 text-cyan-800 border-l-4 border-cyan-500",
  holiday: "bg-red-200 text-red-800 border-l-4 border-red-500",
} as const;

const nepaliToEnglishMonthMap = [
  "April/May",    // Baisakh (index 0)
  "May/June",     // Jestha (index 1)
  "June/July",    // Asar (index 2)
  "July/August",  // Shrawan (index 3)
  "August/September", // Bhadra (index 4)
  "September/October", // Ashwin (index 5)
  "October/November", // Kartik (index 6)
  "November/December", // Mangsir (index 7)
  "December/January", // Poush (index 8)
  "January/February", // Magh (index 9)
  "February/March",   // Falgun (index 10)
  "March/April"       // Chaitra (index 11)
];

interface SelectedDate {
  date: number;
  month: number;
}

const Calendar = () => {
  const [showEnglish, setShowEnglish] = useState(false);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(new nepaliDate(new Date()).getMonth());
  const [selectedDate, setSelectedDate] = useState<SelectedDate>({
    date: new nepaliDate(new Date()).getDate(),
    month: new nepaliDate(new Date()).getMonth()
  });

  const today = new nepaliDate(new Date());
  const todayMonth = today.getMonth();
  const todayDate = today.getDate();

  const currentMonthData = academicCalendar[currentMonthIndex];
  const monthName = currentMonthData.month;
  const daysInMonth = new nepaliDate(2082, currentMonthIndex + 1, 0).getDate();
  const firstDayOfMonth = new nepaliDate(2082, currentMonthIndex, 1).getDay();
  const gregorianYear = currentMonthIndex >= 8 ? 2026 : 2025;

  const formatDisplayDate = (day: number, month: number): string => {
    if (showEnglish) {
      const nepaliDateStr = `2082-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      console.log(nepaliDateStr);
      const englishDate = getEnglishDate(nepaliDateStr);
      console.log(englishDate);
      return dayjs(englishDate).format("D");
    }
    return day.toString();
  };

  const formatFullDate = (day: number, month: number): { nepali: string; english: string } => {
    const nepaliDateStr = `${day} ${academicCalendar[month]?.month}, 2082`;

    function convertNepaliDateToJSDate(nepaliDate: nepaliDate): Date {
      const adDate = nepaliDate.toJsDate(); // Assuming nepaliDate has a method toJSDate() to convert to JavaScript Date
      return adDate;
    }
    
    if (showEnglish) {
      const formattedDate = `2082-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const englishDate = getEnglishDate(formattedDate);
      return {
        nepali: nepaliDateStr,
        english: dayjs(englishDate).format("MMMM D, YYYY")
      };
    }

    return {
      nepali: nepaliDateStr,
      english: dayjs(convertNepaliDateToJSDate(new nepaliDate(2082, month, day))).format("MMMM D, YYYY")
    };
  };

  const handleDateClick = (day: number) => {
    setSelectedDate({
      date: day,
      month: currentMonthIndex
    });
  };

  const isPastDate = (day: number, month: number): boolean => {
    if (month < todayMonth) return true;
    if (month === todayMonth && day < todayDate) return true;
    return false;
  };

  const renderCalendarDays = () => {
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-20 md:h-32 border"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayOfWeek = new nepaliDate(2082, currentMonthIndex, day).getDay();
      const isSaturday = dayOfWeek === 6;
      const dayEvents = currentMonthData.events.filter(e => parseInt(e.date) === day);
      const dayHolidays = currentMonthData.holidays.filter(h => parseInt(h.date) === day);
      const allDayItems = [...dayEvents, ...dayHolidays];
      const isToday = day === todayDate && currentMonthIndex === todayMonth;
      const isSelected = day === selectedDate.date && currentMonthIndex === selectedDate.month;
      const isPast = isPastDate(day, currentMonthIndex);

      if (isPast) {
        days.push(
          <div key={`past-day-${day}`} className="h-20 md:h-32 border bg-gray-50 flex flex-col items-center">
            <span className="text-gray-400 text-xl font-medium my-auto ">
              {formatDisplayDate(day, currentMonthIndex)}
            </span>
          </div>
        );
      } else {
        days.push(
          <motion.div
            key={`day-${day}`}
            className={`h-20 md:h-32 border flex flex-col cursor-pointer ${isToday ? 'bg-blue-50' : ''} ${isSelected ? 'ring-2 ring-[#D41D33] bg-[#D41D33]/10' : ''}`}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            onClick={() => handleDateClick(day)}
          >
            <div className="flex-1 flex items-center justify-center">
              <span className={`md:text-2xl text-xl font-bold ${isSaturday ? 'text-red-500' : 'text-gray-800'} ${isToday ? 'bg-red-500 text-white rounded-full text-2xl md:text-3xl w-14 h-10 md:h-14 flex items-center justify-center' : ''}`}>
                {formatDisplayDate(day, currentMonthIndex)}
              </span>
            </div>
            <div className="hidden md:block w-full px-1 pb-1 space-y-1">
              {allDayItems.slice(0, 2).map((item, idx) => (
                <div
                  key={`event-${day}-${idx}`}
                  className={`text-xs -mt-6 p-1 rounded truncate w-full ${categoryColors[item.category as keyof typeof categoryColors]}`}
                  title={item.event}
                >
                  {item.event}
                </div>
              ))}
              {allDayItems.length > 2 && (
                <div className="text-xs text-gray-500 text-center">+{allDayItems.length - 2} more</div>
              )}
            </div>
          </motion.div>
        );
      }
    }

    return days;
  };

  const goToPreviousMonth = () => {
    setCurrentMonthIndex(prev => (prev === 0 ? academicCalendar.length - 1 : prev - 1));
  };

  const goToNextMonth = () => {
    setCurrentMonthIndex(prev => (prev === academicCalendar.length - 1 ? 0 : prev + 1));
  };

  const getSelectedDateEvents = (): CalendarItem[] => {
    const monthData = selectedDate.month !== currentMonthIndex
      ? academicCalendar[selectedDate.month]
      : currentMonthData;

    const events = monthData.events.filter(e => parseInt(e.date) === selectedDate.date);
    const holidays = monthData.holidays.filter(h => parseInt(h.date) === selectedDate.date);
    return [...events, ...holidays];
  };

  const selectedDateEvents = getSelectedDateEvents();
  const formattedSelectedDate = formatFullDate(selectedDate.date, selectedDate.month);

  const getUpcomingItems = <T extends CalendarItem>(
    items: T[],
    limit: number,
    filterFn?: (item: T, monthIndex: number) => boolean
  ) => {
    return academicCalendar.flatMap((month, monthIndex) => {
      const filtered = filterFn
        ? items.filter(item => filterFn(item, monthIndex))
        : items;

      return filtered.map(item => ({
        ...item,
        monthIndex,
        monthName: month.month
      }));
    })
      .filter(({ monthIndex, date }) => {
        const itemDate = parseInt(date);
        return (monthIndex > todayMonth) ||
          (monthIndex === todayMonth && itemDate > todayDate);
      })
      .slice(0, limit);
  };

  const upcomingEvents = getUpcomingItems(
    academicCalendar.flatMap(month => month.events),
    5
  );

  const upcomingExams = getUpcomingItems(
    academicCalendar.flatMap(month => month.events),
    5,
    (item) => item.category === "exam"
  );

  const upcomingHolidays = getUpcomingItems(
    academicCalendar.flatMap(month => month.holidays),
    5
  );

  const renderUpcomingItem = (item: CalendarItem & { monthIndex: number; monthName: string }) => {
    const englishDate = getEnglishDate(`2082-${String(item.monthIndex + 1).padStart(2, '0')}-${String(parseInt(item.date)).padStart(2, '0')}`);
    const category = 'category' in item ? item.category : 'holiday';

    return (
      <motion.li
        key={`${item.date}-${item.monthIndex}-${item.event}`}
        className="py-3 md:py-4 flex items-start"
        whileHover={{ x: 5 }}
      >
        <div className={`flex-shrink-0 w-3 h-3 mt-1.5 rounded-full ${categoryColors[category as keyof typeof categoryColors].split(' ')[0].replace('bg-', 'bg-')}`} />
        <div className="ml-3">
          <p className="font-medium text-sm md:text-base">{item.event}</p>
          <p className="text-xs md:text-sm text-gray-500">
            {item.date} {item.monthName} ({dayjs(englishDate).format("MMM D")}) • {category.charAt(0).toUpperCase() + category.slice(1)}
          </p>
        </div>
      </motion.li>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <motion.div
          className="rounded-3xl bg-white shadow-md border border-gray-100 px-6 py-16 md:px-12 md:py-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 text-sm font-semibold text-[#D41D33] bg-[#D41D33]/10 rounded-full mb-4 tracking-wider">
            ACADEMIC CALENDAR
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Coming <span className="text-[#D41D33]">soon...</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            The academic calendar will be published here once it has been finalized by the curriculum team.
          </p>
        </motion.div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 text-sm font-semibold text-[#D41D33] bg-[#D41D33]/10 rounded-full mb-4 tracking-wider">
            ACADEMIC SCHEDULE 2082 B.S.
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Academic <span className="text-[#D41D33]">Calendar</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Important dates, events, and schedules for the academic year 2082 B.S. (2025/26 A.D.)
          </p>

          <div className="mt-6 md:mt-8">
            <button
              className="inline-flex items-center px-5 py-2.5 md:px-6 md:py-3 border border-transparent text-sm md:text-base font-medium rounded-lg text-white bg-[#D41D33] hover:bg-[#A3162A] transition-all shadow-md hover:shadow-lg"
              onClick={() => setShowEnglish(!showEnglish)}
            >
              {showEnglish ? "View Nepali Calendar" : "View English Calendar"}
              <svg className="ml-2 -mr-1 w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </motion.div>

        <motion.div
          className="mb-8 md:mb-16 bg-white rounded-xl shadow-md overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-between items-center p-3 md:p-4 bg-gray-50 border-b">
            <button
              onClick={goToPreviousMonth}
              className="p-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-1 md:gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="hidden sm:inline text-sm md:text-base">Previous</span>
            </button>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
              {showEnglish ? `${nepaliToEnglishMonthMap[currentMonthIndex]} ${gregorianYear}` : `${monthName} 2082`}
            </h2>
            <button
              onClick={goToNextMonth}
              className="p-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-1 md:gap-2"
            >
              <span className="hidden sm:inline text-sm md:text-base">Next</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-7 bg-gray-50">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
              <div
                key={day}
                className={`p-2 md:p-3 text-center text-xs md:text-sm font-medium uppercase tracking-wider ${index === 6 ? 'text-red-500' : 'text-gray-500'}`}
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7">
            {renderCalendarDays()}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
          <motion.div
            className="bg-white rounded-xl shadow-md overflow-hidden lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-[#D41D33] p-3 md:p-4">
              <h2 className="text-lg md:text-xl font-semibold text-white">
                {selectedDate.date === todayDate && selectedDate.month === todayMonth ?
                  "Today's Schedule" : "Selected Date Events"}
              </h2>
            </div>
            <div className="p-4 md:p-6">
              {selectedDateEvents.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-center">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
                      {formattedSelectedDate.nepali}
                    </h3>
                    <p className="text-gray-500 text-sm md:text-base">
                      {formattedSelectedDate.english}
                    </p>
                  </div>
                  <p className="text-gray-500 italic mt-8 p-3 md:p-4 rounded-lg">No events scheduled for this date</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mt-8 mb-1">
                      {formattedSelectedDate.nepali}
                    </h3>
                    <p className="text-gray-500 text-sm md:text-base">
                      {formattedSelectedDate.english}
                    </p>
                  </div>
                  <div className="space-y-3">
                    {selectedDateEvents.map((e, i) => {
                      const category = 'category' in e ? e.category : 'holiday';
                      return (
                        <motion.div
                          key={`selected-event-${i}`}
                          className={`p-3 md:p-4 rounded-lg ${categoryColors[category as keyof typeof categoryColors]}`}
                          initial={{ scale: 0.98 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="flex items-start">
                            <div className={`flex-shrink-0 w-3 h-3 mt-1.5 rounded-full ${categoryColors[category as keyof typeof categoryColors].split(' ')[0].replace('bg-', 'bg-')}`} />
                            <div className="ml-3 flex-1">
                              <div className="font-semibold text-base md:text-lg">{e.event}</div>
                              <div className="text-xs md:text-sm text-gray-600 mt-1 capitalize">
                                {category}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl shadow-md overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="bg-[#D41D33] p-3 md:p-4">
              <h2 className="text-lg md:text-xl font-semibold text-white">Event Categories</h2>
            </div>
            <div className="p-4 md:p-6">
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(categoryColors).map(([category, colorClass]) => (
                  <div
                    key={category}
                    className="p-2 rounded-lg flex items-center"
                  >
                    <span className={`w-4 h-4 rounded-full ${colorClass.split(' ')[0].replace('bg-', 'bg-')}`}></span>
                    <span className="ml-3 font-medium text-sm capitalize">{category}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl shadow-md overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-[#D41D33] p-3 md:p-4">
              <h2 className="text-lg md:text-xl font-semibold text-white">Upcoming Events</h2>
              <p className="text-white/90 text-xs md:text-sm">Next 5 important events</p>
            </div>
            <div className="p-4 md:p-6">
              {upcomingEvents.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 italic">No upcoming events</p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {upcomingEvents.map(renderUpcomingItem)}
                </ul>
              )}
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl shadow-md overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="bg-[#D41D33] p-3 md:p-4">
              <h2 className="text-lg md:text-xl font-semibold text-white">Upcoming Holidays</h2>
              <p className="text-white/90 text-xs md:text-sm">Next 5 holidays</p>
            </div>
            <div className="p-4 md:p-6">
              {upcomingHolidays.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 italic">No upcoming holidays</p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {upcomingHolidays.map(renderUpcomingItem)}
                </ul>
              )}
            </div>
          </motion.div>

          {upcomingExams.length > 0 && (
            <motion.div
              className="bg-white rounded-xl shadow-md overflow-hidden lg:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="bg-[#D41D33] p-3 md:p-4">
                <h2 className="text-lg md:text-xl font-semibold text-white">Exam Schedule</h2>
                <p className="text-white/90 text-xs md:text-sm">Upcoming examination dates</p>
              </div>
              <div className="p-4 md:p-6">
                <ul className="divide-y divide-gray-200">
                  {upcomingExams.map(renderUpcomingItem)}
                </ul>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
