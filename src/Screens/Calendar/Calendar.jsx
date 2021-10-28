import React, { useState } from 'react';
import { Container, Box } from '@mui/material';

import { CalendarForm } from '../../components';

import { useGetEntries } from '../../queries';
import { useRemoveEntryById } from '../../mutations';

const getTimeStamp = () => {
  const timeStamp = new Date();

  timeStamp.setHours(2, 0, 0, 0, 0);

  return timeStamp;
};

const getValidInitialValue = (value) => value || '';

const Calendar = () => {
  const [today, setToday] = useState(getTimeStamp());
  const { removeEntryById } = useRemoveEntryById();
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

  const handleEntryRemove = (id) => () => {
    removeEntryById({
      variables: {
        id,
      },
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
            <button onClick={handleEntryRemove(_id)}>Remove</button>
          </Box>
        ))}
      </Container>
    </div>
  );
};

export default Calendar;
