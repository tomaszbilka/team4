import React, { useState, useEffect } from 'react';
import { Container, Box } from '@mui/material';
/* eslint-disable */

import { CalendarForm } from '../../components';

import { useGetEntries } from '../../queries';
import {
  useRemoveEntryById,
  useCreateNewEntry,
  useUpdateEntry,
} from '../../mutations';

const getTimeStamp = () => {
  const timeStamp = new Date();

  timeStamp.setHours(2, 0, 0, 0, 0);

  return timeStamp;
};

const getValidInitialValue = (value) => value || '';

const Calendar = () => {
  const [entries, setEntries] = useState([]);
  const [today, setToday] = useState(getTimeStamp());
  const { removeEntryById } = useRemoveEntryById();
  const { createNewEntry } = useCreateNewEntry();
  const { updateEntryById } = useUpdateEntry();
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

  const handleAddNewEntryButtonClick = (currentOrder) => () => {
    const orderOfNewEntry = currentOrder + 1;
    const indexOfCurrentEntry = data?.entryMany?.findIndex(
      ({ order }) => order === currentOrder
    );
    const entriesToBeUpdated = data?.entryMany?.slice(indexOfCurrentEntry + 1);

    entriesToBeUpdated.map(async ({ _id, order: orderToBeUpdated, tag }) => {
      await updateEntryById({
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
        {entries.map(({ _id, order, tag, startTime, endTime }) => (
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
