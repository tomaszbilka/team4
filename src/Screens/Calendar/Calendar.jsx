/* eslint-disable */
import React, { useState } from 'react';

import { Form } from '../../components'
import { Container, Box } from '@mui/material';
// import { useFormik } from 'formik';
// import { gql, useMutation } from '@apollo/client';
// import * as yup from 'yup';

import { useGetEntries } from '../../queries';
import { useRemoveEntry } from '../../mutations';

// const CREATE_ENTRY = gql`
//   mutation CreateEntry($record: EntryCreateTypeInput) {
//     createEntry(record: $record) {
//       _id
//       startTime
//       endTime
//       tag {
//         name
//       }
//     }
//   }
// `;

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
  const { removeEntryById } = useRemoveEntry();
  console.log(removeEntryById)

  const handleButtonClick = (direction) => {
    setToday((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + direction);

      return newDate;
    });
  };

  const handleEntryRemove = () => {
    
  };

  return (
    <div>
      <button onClick={() => handleButtonClick(-1)}>Prev</button>
      <h1>
        {today?.toLocaleDateString('pl-pl', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </h1>
      <button onClick={() => handleButtonClick(1)}>Next</button>
      <Container container direction="column">
        {data?.entryMany?.map(
          ({
            _id,
            data: today,
            tag,
            ...initialValues
          }) =>
          <Box m={2}>
           <Form key={_id} data={data} tagName={tag?.name} tagBundleName={tag?.tagBundle?.name} {...initialValues} />
           <button>Add new</button>
           <button>Remove</button>
          </Box>
        )}
      </Container>
    </div>
  );
};

export default Calendar;
