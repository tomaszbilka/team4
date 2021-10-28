import React, { useState } from 'react';
import {
  Container,
  Box,
  Button,
  TextField,
  Tooltip,
  ClickAwayListener,
  IconButton,
} from '@mui/material';
import {
  ContentCopy,
  StopCircle,
  AddCircleRounded,
  DeleteForeverRounded,
  KeyboardArrowLeftRounded,
  KeyboardArrowRightRounded,
} from '@mui/icons-material';

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
    const { endTime: currentEndTime, tag } = lastEntry;

    createNewEntry({
      variables: {
        record: {
          order: lastEntry?.order + 1,
          date: today,
          startTime: currentEndTime ? currentEndTime : newEndTime,
        },
      },
    });

    if (!currentEndTime) {
      updateEntryById({
        variables: {
          id: lastEntry?._id,
          record: {
            tagName: tag?.name,
            tagBundleName: tag?.tagBundle?.name,
            endTime: newEndTime,
          },
        },
      });
    }
  };

  console.log(clipboardSuccess);

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
      <Box sx={{ display: 'flex' }}>
        <IconButton onClick={() => handleDateButtonClick(-1)}>
          <KeyboardArrowLeftRounded color="info" />
        </IconButton>
        <h1>
          {today?.toLocaleDateString('pl-pl', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </h1>
        <IconButton onClick={() => handleDateButtonClick(1)}>
          <KeyboardArrowRightRounded color="info" />
        </IconButton>
      </Box>
      <Container direction="column">
        <IconButton
          onClick={handleAddNewEntryButtonClick(entries[0]?.order - 1)}
        >
          <AddCircleRounded color="success" />
        </IconButton>
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
        <TextField
          id="date"
          name="date"
          type="date"
          value={today.toISOString().split('T')[0]}
          onChange={(e) => setToday(new Date(e.target.value))}
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
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
            <IconButton onClick={handleAddNewEntryButtonClick(order)}>
              <AddCircleRounded color="success" />
            </IconButton>
            <IconButton onClick={handleEntryRemove(_id)}>
              <DeleteForeverRounded color="error" />
            </IconButton>
          </Box>
        ))}
        <Tooltip title="Add new entry with current time">
          <IconButton disabled={onlyFullForm} onClick={handlePauseButtonClick}>
            <StopCircle
              color={onlyFullForm ? 'disabled' : 'info'}
              style={{ fontSize: '50px' }}
              fontSize="inherit"
            />
          </IconButton>
        </Tooltip>
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
