import React, { useEffect, useState } from 'react';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';

import {
  useGetTagBundles,
  useGetProfileBundles,
  useAssignBundle,
  useUnassignBundle,
} from '../../api';

const Settings = () => {
  const [profileBundles, setProfileBundles] = useState([]);
  const { data: dataAll } = useGetTagBundles();
  const { data: myData } = useGetProfileBundles();
  const assignBundleId = useAssignBundle();
  const removeBundleId = useUnassignBundle();

  const user = localStorage.getItem('wos-user');

  const toggleItem = (sBundle) => () => {
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
  };

  useEffect(() => {
    const idFromMyData = myData?.map((item) => {
      return item._id;
    });

    const answerData = dataAll?.tagBundleMany?.map((item) => {
      if (idFromMyData?.includes(item._id)) {
        return { ...item, isChecked: true };
      }
      return item;
    });

    setProfileBundles(answerData);
  }, [dataAll, myData]);

  return (
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
        {JSON.parse(user)}
      </Box>
      <hr />
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
        {profileBundles?.map((item) => {
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
