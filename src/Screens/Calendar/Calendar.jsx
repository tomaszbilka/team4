import React, { useEffect, useState } from 'react';

import { Form } from '../../components';
import { Container, Box } from '@mui/material';

import { useGetEntries } from '../../queries';
import { useRemoveEntry, useNewEntry, useUpdateEntry } from '../../mutations';

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
  const [entries, setEntries] = useState([]);
  const { removeEntryById } = useRemoveEntry();
  const { createNewEntry } = useNewEntry();
  const { updateEntryById } = useUpdateEntry();

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

  const handleAddNewEntryButtonClick = (currentOrder) => () => {
    const orderOfNewEntry = currentOrder + 1;
    const indexOfCurrentEntry = entries.findIndex(
      ({ order }) => order === currentOrder
    );
    const entriesToBeUpdated = entries.slice(indexOfCurrentEntry + 1);

    entriesToBeUpdated.map(({ _id, order: orderToBeUpdated, tag }) => {
      updateEntryById({
        variables: {
          id: _id,
          record: {
            order: orderToBeUpdated + 1,
            tagName: tag?.name,
            tagBundleName: tag?.tagBundle?.name,
          },
        },
      });
    });

    createNewEntry({
      variables: {
        record: {
          order: orderOfNewEntry,
          date: today,
        },
      },
    });
  };

  useEffect(() => {
    const entriesList = data?.entryMany && [...data?.entryMany];

    entriesList &&
      entriesList.sort(
        ({ order: orderA }, { order: orderB }) => orderA - orderB
      ) &&
      setEntries(entriesList);
  }, [data]);

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
        {entries.map(({ _id, tag, order, startTime, endTime }) => (
          <Box key={_id} m={2}>
            <Form
              date={today.toISOString()}
              tagName={getValidInitialValue(tag?.name)}
              tagBundleName={getValidInitialValue(tag?.tagBundle?.name)}
              startTime={getValidInitialValue(startTime)}
              endTime={getValidInitialValue(endTime)}
              id={_id}
            />
            <button onClick={handleAddNewEntryButtonClick(order)}>
              Add new
            </button>
            <button onClick={handleEntryRemove(_id)}>Remove</button>
          </Box>
        ))}
      </Container>
    </div>
  );
};

export default Calendar;
