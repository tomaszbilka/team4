import React, { useState } from 'react';
import {
  Container,
  Box,
  Tooltip,
  ClickAwayListener,
  IconButton,
} from '@mui/material';
import {
  ContentCopy,
  StopCircle,
  AddCircleRounded,
  DeleteForeverRounded,
} from '@mui/icons-material';

import {
  CalendarForm,
  DateController,
  EntryListController,
} from '../../components';

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
  const [clipboardSuccess, setClipboardSuccess] = useState(false);
  const [today, setToday] = useState(getTimeStamp());
  const { removeEntryById } = useRemoveEntryById();
  const { createNewEntry } = useCreateNewEntry();
  const { updateEntryById } = useUpdateEntry();
  const { entries } = useGetEntries({
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
    const indexOfCurrentEntry = entries?.findIndex(
      ({ order }) => order === currentOrder
    );
    const entriesToBeUpdated = entries?.slice(indexOfCurrentEntry + 1);

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

  const handlePauseButtonClick = async () => {
    const lastEntry = entries[entries.length - 1];
    const timeStamp = new Date().toTimeString().split(':');
    const newEndTime = `${timeStamp[0]}:${timeStamp[1]}`;

    if (!lastEntry?.endTime) {
      updateEntryById({
        variables: {
          id: lastEntry?._id,
          record: {
            tagName: lastEntry?.tag?.name,
            tagBundleName: lastEntry?.tag?.tagBundle?.name,
            endTime: newEndTime,
          },
        },
      });
    }

    createNewEntry({
      variables: {
        record: {
          order: lastEntry?.order + 1,
          date: today.toISOString(),
          startTime: lastEntry?.endTime ? lastEntry?.endTime : newEndTime,
        },
      },
    });
  };

  const handleCopyToClipboard = () => {
    const dataToClipboard = entries
      .map(({ startTime, endTime, tag }) => {
        if (!startTime || !endTime || !tag?.tagBundle?.name || !tag?.name) {
          return 'Entry is missing some fields';
        }
        return `${startTime} ${endTime} ${tag?.tagBundle?.name}-${tag?.name}`;
      })
      .join('\n');

    navigator.clipboard
      .writeText(dataToClipboard)
      .then(() => setClipboardSuccess(true))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <DateController
        setPreviousDay={() => handleDateButtonClick(-1)}
        setNextDay={() => handleDateButtonClick(1)}
        today={today}
        setToday={setToday}
      />

      <Container
        maxWidth="md"
        sx={{ display: 'flex', flexDirection: 'column' }}
      >
        <EntryListController
          handleOnlyFullFormButtonClick={handleOnlyFullFormButtonClick}
          onlyFullForm={onlyFullForm}
          addNewEntry={handleAddNewEntryButtonClick(entries[0]?.order - 1)}
        />

        {entries.map(({ _id, order, tag, startTime, endTime }) => (
          <Box sx={{ display: 'flex' }} key={_id} m={2}>
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
            <IconButton
              sx={{ fontSize: '30px' }}
              onClick={handleAddNewEntryButtonClick(order)}
            >
              <AddCircleRounded fontSize="inherit" color="success" />
            </IconButton>
            <IconButton
              sx={{ fontSize: '30px' }}
              onClick={handleEntryRemove(_id)}
            >
              <DeleteForeverRounded fontSize="inherit" color="error" />
            </IconButton>
          </Box>
        ))}

        <Box sx={{ alignSelf: 'flex-end' }}>
          <Tooltip title="Add new entry with current time">
            <IconButton
              disabled={onlyFullForm || !entries?.length}
              onClick={handlePauseButtonClick}
            >
              <StopCircle
                color={onlyFullForm || !entries?.length ? 'disabled' : 'info'}
                style={{ fontSize: '50px' }}
                fontSize="inherit"
              />
            </IconButton>
          </Tooltip>

          <ClickAwayListener onClickAway={() => setClipboardSuccess(false)}>
            <Tooltip
              PopperProps={{
                disablePortal: true,
              }}
              onClose={() => setClipboardSuccess(false)}
              open={clipboardSuccess}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              title="Skopiowano do schowka"
            >
              <IconButton onClick={handleCopyToClipboard}>
                <ContentCopy />
              </IconButton>
            </Tooltip>
          </ClickAwayListener>
        </Box>
      </Container>
    </div>
  );
};

export default Calendar;
