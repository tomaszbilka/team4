import React, { useState } from 'react';
import { Container } from '@mui/material';

import { useGetEntries } from '../../queries';

const getTimeStamp = () => {
  const timeStamp = new Date();

  timeStamp.setHours(2, 0, 0, 0, 0);

  return timeStamp;
};

const Calendar = () => {
  const [today, setToday] = useState(getTimeStamp());
  const { data } = useGetEntries({
    date: today,
  });

  const handleDateButtonClick = (direction) => {
    setToday((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + direction);

      return newDate;
    });
  };

  return (
    <div>
      <button onClick={() => handleDateButtonClick(-1)}>Prev</button>
      <h1>
        {today?.toLocaleDateString('pl-pl', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </h1>
      <button onClick={() => handleDateButtonClick(1)}>Next</button>
      <Container direction="column">
        {data?.entryMany?.map(({ _id, tag, order, startTime, endTime }) => (
          <li key={_id}>
            <p>Tag Name: {tag?.name}</p>
            <p>Tag Bundle Name: {tag?.tagBundle?.name}</p>
            <p>Order{order}</p>
            <p>{startTime}</p>
            <p>{endTime}</p>
          </li>
        ))}
      </Container>
    </div>
  );
};

export default Calendar;
