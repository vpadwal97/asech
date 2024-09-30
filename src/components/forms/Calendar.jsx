import { useState } from "react";
import {
  format,
  subMonths,
  addMonths,
  startOfWeek,
  addDays,
  isSameDay,
  lastDayOfWeek,
  getWeek,
  addWeeks,
  subWeeks,
} from "date-fns";

const Calendar = ({ showDetailsHandle }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));
  const [selectedDates, setSelectedDates] = useState([]);

  const changeMonthHandle = (btnType) => {
    if (btnType === "prev") {
      setCurrentMonth(subMonths(currentMonth, 1));
    }
    if (btnType === "next") {
      setCurrentMonth(addMonths(currentMonth, 1));
    }
  };

  const changeWeekHandle = (btnType) => {
    if (btnType === "prev") {
      setCurrentMonth(subWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(subWeeks(currentMonth, 1)));
    }
    if (btnType === "next") {
      setCurrentMonth(addWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(addWeeks(currentMonth, 1)));
    }
  };

  const onDateClickHandle = (day, dayStr) => {
    // setSelectedDates((prevSelected) => {
    //   // Toggle the date in the selectedDates array
    //   if (prevSelected.some((selected) => isSameDay(selected, day))) {
    //     return prevSelected.filter((selected) => !isSameDay(selected, day));
    //   } else {
    //     return [...prevSelected, day];
    //   }
    // });

    let newselectedDates = selectedDates;

    // Toggle the date in the selectedDates array
    if (newselectedDates.some((selected) => isSameDay(selected, day))) {
      newselectedDates = newselectedDates.filter(
        (selected) => !isSameDay(selected, day)
      );
    } else {
      newselectedDates = [...newselectedDates, day];
    }

    setSelectedDates(newselectedDates);
    showDetailsHandle(dayStr);
  };

  const renderHeader = () => {
    const dateFormat = "MMM yyyy";
    return (
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <button
            className="btn btn-link btn-smbtn-primary"
            onClick={() => changeMonthHandle("prev")}
          >
            prev
          </button>
        </div>
        <div colSpan={5}>
          <>{format(currentMonth, dateFormat)}</>
        </div>
        <div>
          <button
            className="btn btn-link btn-smbtn-primary"
            onClick={() => changeMonthHandle("next")}
          >
            next
          </button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const dateFormat = "EEE";
    const days = [];
    let startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    for (let i = 0; i < 7; i++) {
      days.push(<th key={i}>{format(addDays(startDate, i), dateFormat)}</th>);
    }
    return <tr>{days}</tr>;
  };

  const renderCells = () => {
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 1 });
    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <td
            className={`dateCon cursor-pointer py-2 fs-4 ${
              isSameDay(day, new Date())
                ? "today"
                : selectedDates.some((selected) => isSameDay(selected, day))
                ? "selected"
                : ""
            }`}
            key={day}
            onClick={() => {
              const dayStr = format(cloneDay, "ccc dd MMM yy");
              onDateClickHandle(cloneDay, dayStr);
            }}
          >
            {formattedDate}
            {/* <span className="bgnumber fs-1 position-absoluteend-0top-50translate-middle-y">
              {formattedDate}
            </span> */}
          </td>
        );
        day = addDays(day, 1);
      }

      rows.push(<tr key={day}>{days}</tr>);
      days = [];
    }
    return <>{rows}</>;
  };

  const renderFooter = () => {
    return (
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <button
            className="btn btn-link btn-smbtn-primary"
            onClick={() => changeWeekHandle("prev")}
          >
            prev
          </button>
        </div>
        <div colSpan={5}>{currentWeek}</div>
        <div onClick={() => changeWeekHandle("next")}>
          <button className="btn btn-link btn-smbtn-primary">next</button>
        </div>
      </div>
    );
  };

  return (
    <div className="table-responsive p-3">
          {renderHeader()}
      <table className="container calendarCun text-center table vertical-align-middle table-bordered">
        <tbody className="calendar border">
          {renderDays()}
          {renderCells()}
        </tbody>
      </table>
          {renderFooter()}
    </div>
  );
};

export default Calendar;
