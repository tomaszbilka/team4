import React from 'react';
import { Container } from '@mui/material';

import { useGetEntries } from '../../queries';

const Calendar = () => {
  const { data } = useGetEntries({
    date: '2021-10-28T00:00:00.000Z',
  });

  console.log(data);

  return (
    <div>
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
