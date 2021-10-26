import React, { useReducer, useState } from 'react';

import { useGetEntries } from '../../queries';

const getTimeStamp = () => {
  const timeStamp = new Date();

  timeStamp.setHours(0, 0, 0, 0);

  return timeStamp;
};

const initFormState = {
  startTime: '',
  endTime: '',
  date: '',
  tagName: '',
  tagBundleName: '',
};

const formReducer = (state, { type, payload }) => {
  switch (type) {
    case 'SET_START_TIME':
      return { ...state, startTime: payload };
    case 'SET_END_TIME':
      return { ...state, endTime: payload };
    case 'SET_DATE':
      return { ...state, date: payload };
    case 'SET_TAG':
      return { ...state, tagName: payload };
    case 'SET_TAG_BUNDLE':
      return { ...state, tagBundleName: payload };
    default:
      return state;
  }
};

const Calendar = () => {
  const [today, setToday] = useState(getTimeStamp());
  const [formValues, dispatchFormValues] = useReducer(formReducer, {
    ...initFormState,
    date: today?.toISOString(),
  });
  const { data } = useGetEntries({
    date: today,
  });

  const handleButtonClick = (direction) => {
    setToday((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + direction);

      return newDate;
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  };

  console.log(data);
  console.log(formValues);
  console.log(today.toISOString());

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
      <div>
        {data?.entryMany?.map(
          ({
            _id,
            startTime,
            endTime,
            date,
            tag: {
              name: tagName,
              tagBundle: { name: bundleName },
            },
          }) => (
            <li key={_id}>
              <p>Start Time: {startTime}</p>
              <p>End Time: {endTime}</p>
              <p>Date: {date}</p>
              <p>Tag: {tagName}</p>
              <p>TagBundle: {bundleName}</p>
            </li>
          )
        )}
      </div>
      <form onSubmit={handleFormSubmit}>
        Start Time:{' '}
        <input
          onChange={(e) =>
            dispatchFormValues({
              type: 'SET_START_TIME',
              payload: e.target.value,
            })
          }
          type="time"
        />
        End Time:{' '}
        <input
          onChange={(e) =>
            dispatchFormValues({
              type: 'SET_END_TIME',
              payload: e.target.value,
            })
          }
          type="time"
        />
        Tag Bundle
        <input
          onChange={(e) =>
            dispatchFormValues({
              type: 'SET_TAG_BUNDLE',
              payload: e.target.value,
            })
          }
          list="tagBundles"
          name="tagBundle"
          id="tagBundle"
        />
        <datalist id="tagBundles">
          <option value="selleo" />
        </datalist>
        Tag
        <input
          onChange={(e) =>
            dispatchFormValues({
              type: 'SET_TAG',
              payload: e.target.value,
            })
          }
          list="tags"
          name="tag"
          id="tag"
        />
        <datalist id="tags">
          <option value="warsztaty" />
        </datalist>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Calendar;
