import React, { useState } from 'react';
import AddBundle from '../../components/addBoundle/addBundle';
import { Link } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';
import classes from './bundle.module.css';
import { Button } from '@mui/material';

const btnStyle = {
  marginLeft: '65px',
};

const GET_ALL_BUNDLES = gql`
  query getProfile {
    tagBundleMany {
      name
      description
      _id
    }
  }
`;

const CREATE_NEW_BUNDLE = gql`
  mutation CreatBundle($record: CreateOneTagBundleInput!) {
    tagBundleCreateOne(record: $record) {
      record {
        name
        description
      }
    }
  }
`;

const Bundle = () => {
  const [isAddBundleVisible, setIsAddBundleVisible] = useState(false);
  const { data, loading, error } = useQuery(GET_ALL_BUNDLES);
  const [newBundle] = useMutation(CREATE_NEW_BUNDLE, {
    refetchQueries: [GET_ALL_BUNDLES, 'tagBundleMany'],
  });

  const addBtnHandler = () => {
    setIsAddBundleVisible(true);
  };

  const closeAddBundle = () => {
    setIsAddBundleVisible(false);
  };

  const addNewBundleItem = (addNewBundle) => {
    // console.log(addNewBundle);
    newBundle({
      variables: {
        record: {
          name: addNewBundle,
        },
      },
    });
  };

  if (loading) return <div>loading...</div>;
  if (error) return <div>Error :(</div>;

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
        {noRepetitionBundle.map((singleBundle) => {
          return (
            <Link
              key={singleBundle._id}
              className={classes.bundleStyle}
              to={`/bundle/${singleBundle._id}`}
            >
              {singleBundle.name}
            </Link>
          );
        })}

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
