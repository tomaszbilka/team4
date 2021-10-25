import React, { useState } from 'react';

/* eslint-disable */

import { useGetEntries } from '../../queries';

const getTimeStamp = () => {
  const timeStamp = new Date();

  timeStamp.setHours(0,0,0,0);

  console.log(timeStamp.toISOString())

}

const Calendar = () => {
  const [today, setToday] = useState(getTimeStamp());
  const { data } = useGetEntries();

  console.log(today);

  console.log(data);

  return (
    <div>
      <button>Prev</button>
      <h1>{today}</h1>
      <button>Next</button>
    </div>
  );
};

export default Calendar;
