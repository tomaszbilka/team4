import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

import { AddBundle } from '../../components';

import { useGetTagBundles, useCreateNewBundle } from '../../api';

import classes from './bundle.module.css';

const btnStyle = {
  marginLeft: '65px',
};

const Bundle = () => {
  const [isAddBundleVisible, setIsAddBundleVisible] = useState(false);
  const { data, loading } = useGetTagBundles();
  const { createNewBundle } = useCreateNewBundle();

  const addBtnHandler = () => {
    setIsAddBundleVisible(true);
  };

  const closeAddBundle = () => {
    setIsAddBundleVisible(false);
  };

  const addNewBundleItem = (addNewBundle) => {
    createNewBundle({
      variables: {
        record: {
          name: addNewBundle,
        },
      },
    });
  };

  if (loading) return <div>loading...</div>;

  const noRepetitionBundle = data.tagBundleMany.filter(
    (bundle, index, self) =>
      index === self.findIndex((pos) => pos.name === bundle.name)
  );

  return (
    <>
      <div>
        <div className={classes.headerStyle}>
          <h2>Bundles:</h2>
          <Button variant="contained" onClick={addBtnHandler} style={btnStyle}>
            ADD
          </Button>
        </div>
        {noRepetitionBundle.map((singleBundle) => (
          <Link
            key={singleBundle._id}
            className={classes.bundleStyle}
            to={`/bundle/${singleBundle._id}`}
          >
            {singleBundle.name}
          </Link>
        ))}

        {isAddBundleVisible && (
          <AddBundle
            closeAddBundle={closeAddBundle}
            addNewBundleItem={addNewBundleItem}
          />
        )}
      </div>
    </>
  );
};

export default Bundle;
