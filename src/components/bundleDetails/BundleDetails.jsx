import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

import Pagination from '../Pagination';

import { getValidInitialValue } from '../../utils/shared';

import { useGetBundleById, useUpdateBundleById, useGetUser } from '../../api';

import {
  wrapperStyles,
  descriptionStyles,
  containerStyles,
  backBtnStyles,
} from './styles';

const BundleDetails = () => {
  const [updatedBundle, setUpdatedBundle] = useState('');
  const { id } = useParams();
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const { data, loading } = useGetBundleById(id);
  const { data: userData, loading: userLoading } = useGetUser({});
  const { updateBundleById } = useUpdateBundleById();

  //when loading set name and description on empty string
  const name = getValidInitialValue(data?.tagBundleById?.name);
  const description = getValidInitialValue(data?.tagBundleById?.description);
  const creatorId = getValidInitialValue(data?.tagBundleById?.creatorId);
  const userId = getValidInitialValue(userData?.getProfile?._id);

  const isMatchBundleToUser = creatorId === userId;

  const changeDescriptionHandler = () => {
    if (isMatchBundleToUser) {
      setIsDescriptionOpen(true);
    }
  };

  const updateBundleHandler = (event) => {
    event.preventDefault();
    updateBundleById({
      variables: {
        record: {
          description: updatedBundle,
        },
        id: id,
      },
    });
    setIsDescriptionOpen(false);
  };

  const closeBundleHandler = () => {
    setIsDescriptionOpen(false);
  };

  const descriptionChangeHandler = (event) => {
    setUpdatedBundle(event.target.value);
  };

  useEffect(() => {
    setUpdatedBundle(description);
  }, [data]);

  if (loading) return <div>loading...</div>;
  if (userLoading) return <div>loading...</div>;

  return (
    <>
      <div style={containerStyles}>
        <div style={wrapperStyles}>
          <h4>DETAILS</h4>
          <div>
            <h4>name:</h4>
            <p>{name}</p>
          </div>
          <div>
            <h4>description:</h4>
            {!isDescriptionOpen && (
              <p style={descriptionStyles} onClick={changeDescriptionHandler}>
                {description}
              </p>
            )}
            {isDescriptionOpen && isMatchBundleToUser && (
              <div style={descriptionStyles}>
                <TextField
                  id="new-description"
                  label="new-description"
                  placeholder="bundle description"
                  type="text"
                  value={updatedBundle}
                  onChange={descriptionChangeHandler}
                  multiline
                />
                <div>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={updateBundleHandler}
                  >
                    update
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={closeBundleHandler}
                  >
                    close
                  </Button>
                </div>
              </div>
            )}
            {isMatchBundleToUser ? (
              <p>
                this is{' '}
                <span
                  style={{
                    color: isMatchBundleToUser ? 'green' : '',
                  }}
                >
                  YOUR
                </span>{' '}
                bundle!
              </p>
            ) : (
              <p>
                this is{' '}
                <span
                  style={{
                    color: !isMatchBundleToUser ? 'red' : '',
                  }}
                >
                  NOT
                </span>{' '}
                your bundle!
              </p>
            )}
          </div>

          <Button variant="contained">
            <Link to="/bundle" style={backBtnStyles}>
              BACK
            </Link>
          </Button>
        </div>
        <Pagination />
      </div>
    </>
  );
};

export default BundleDetails;
