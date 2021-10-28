import React, { useState, useEffect } from 'react';
import { Container, Box, Button } from '@mui/material';

import { CalendarForm } from '../../components';

import {
  useGetEntries,
  useRemoveEntryById,
  useCreateNewEntry,
  useUpdateEntry,
} from '../../api';

import {
  getFromLocalStorage,
  setToLocalStorage,
} from '../../utils/localStorage';
import { getTimeStamp, getValidInitialValue } from '../../utils/shared';

const onlyFullFormToken = 'wos.only.full.form';

const Calendar = () => {
  const [onlyFullForm, setOnlyFullForm] = useState(
    getFromLocalStorage(onlyFullFormToken)
  );
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

  const handleOnlyFullFormButtonClick = () =>
    setOnlyFullForm((prevState) => {
      setToLocalStorage(onlyFullFormToken, !prevState);

      return !prevState;
    });

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
              allowOnlyFullForm={onlyFullForm}
              date={today.toISOString()}
              endTime={getValidInitialValue(endTime)}
              id={_id}
              tagBundleName={getValidInitialValue(tag?.tagBundle?.name)}
              tagBundleId={getValidInitialValue(tag?.tagBundle?._id)}
              tagName={getValidInitialValue(tag?.name)}
              startTime={getValidInitialValue(startTime)}
            />
            <button onClick={handleAddNewEntryButtonClick(order)}>
              Add new
            </button>
            <button onClick={handleEntryRemove(_id)}>Remove</button>
          </Box>
        ))}
      </Container>
      <div>
        <Button
          variant="contained"
          disabled={onlyFullForm}
          onClick={handleOnlyFullFormButtonClick}
        >
          Accept only full form
        </Button>
        <Button
          variant="contained"
          disabled={!onlyFullForm}
          onClick={handleOnlyFullFormButtonClick}
        >
          Accept partially filled form
        </Button>
      </div>
    </div>
  );
};

export default Calendar;
