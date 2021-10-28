import React, { useState } from 'react';
import { Container, Box } from '@mui/material';

import { useGetEntries } from '../../queries';
import { CalendarForm } from '../../components';

const getTimeStamp = () => {
  const timeStamp = new Date();

  timeStamp.setHours(2, 0, 0, 0, 0);

  return timeStamp;
};

const getValidInitialValue = (value) => value || '';

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
        {data?.entryMany?.map(({ _id, tag, startTime, endTime }) => (
          <Box key={_id} m={2}>
            <CalendarForm
              date={today.toISOString()}
              tagName={getValidInitialValue(tag?.name)}
              tagBundleName={getValidInitialValue(tag?.tagBundle?.name)}
              startTime={getValidInitialValue(startTime)}
              endTime={getValidInitialValue(endTime)}
              tagBundleId={getValidInitialValue(tag?.tagBundle?._id)}
              id={_id}
            />
            <button>Add new</button>
            <button>Remove</button>
          </Box>
        ))}
      </Container>
    </div>
  );
};

export default Calendar;
