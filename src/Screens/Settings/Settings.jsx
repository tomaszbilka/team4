// @ts-nocheck
import React from 'react';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import {
  useAllBundles,
  useMyBundle,
  useSetBundle,
  useRemoveBundle,
} from './settingQuerys';

const Settings = () => {
  const { data: dataAll } = useAllBundles();
  const { data: myData } = useMyBundle();
  const assignBundleId = useSetBundle();
  const removeBundleId = useRemoveBundle();

  const idFromMyData = myData?.map((item) => {
    return item._id;
  });

  let answerData = dataAll?.map((item) => {
    if (idFromMyData?.includes(item._id)) {
      return { ...item, isChecked: true };
    }
    return item;
  });
  // eslint-disable-next-line no-unused-vars

  const toggleItem = (sBundle) => () => {
    console.log(sBundle);

    if (sBundle.isChecked) {
      removeBundleId({
        variables: {
          id: sBundle._id,
        },
      });
    } else {
      assignBundleId({
        variables: {
          id: sBundle._id,
        },
      });
    }
    // const arr = [...bundle];
    // console.log(arr);
    // eslint-disable-next-line no-unused-vars
    // const index = arr.find((item) => {
    //   return item.id == sBundle.id;
    // });
    // console.log(index);
    // if (index > -1) {
    //   console.log(arr[index]);
    //   arr[index] = { ...arr[index], isChecked: !arr[index].isChecked };
    //   console.log(arr);
    //   setBundle(arr);
    // }
    // console.log(setBundle());

    console.log(sBundle);
  };

  return (
    // <div>
    //   <ul>
    //     {answerData?.map((item) => {
    //       return (
    //         <li key={item._id}>
    //           {item.id}
    //           <input
    //             type="checkbox"
    //             name=""
    //             id=""
    //             checked={item.isChecked}
    //             onChange={toggleItem(item)}
    //           />
    //           <label htmlFor="">{item.name}</label>
    //         </li>
    //       );
    //     })}
    //   </ul>
    // </div>
    <Box
      sx={{
        bgcolor: 'background.paper',
        boxShadow: 1,
        borderRadius: 1,
        p: 2,
        minWidth: 300,
      }}
    >
      <Box sx={{ color: 'text.secondary' }}>Nazwa Użytkownika</Box>
      <Box sx={{ color: 'text.primary', fontSize: 24, fontWeight: 'medium' }}>
        USER NAME TEST
      </Box>
      <Box sx={{ color: 'text.secondary' }}>Użytkowane Bundle</Box>

      <Box sx={{ color: 'success.dark', fontSize: 16, verticalAlign: 'sub' }} />
      <Box
        sx={{
          color: 'text.primary',
          display: 'inline',
          fontWeight: 'medium',
          mx: 0.5,
        }}
      >
        {answerData?.map((item) => {
          return (
            <FormGroup key={item._id}>
              <FormControlLabel
                control={
                  <Checkbox value={item.name} checked={item.isChecked} />
                }
                label={item.name}
                onChange={toggleItem(item)}
              />
            </FormGroup>
          );
        })}
      </Box>
      <Box sx={{ color: 'text.secondary', display: 'inline', fontSize: 12 }}>
        vs. last week
      </Box>
    </Box>
  );
};

export default Settings;
