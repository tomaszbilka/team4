import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';
import Pagination from '../pagination/Pagination';
import { Link } from 'react-router-dom';

const wrap = {
  border: '1px solid black',
  borderRadius: '8px',
  display: 'inline-block',
  padding: '2px 50px 2px 10px',
  position: 'relative',
  minHeight: '450px',
};

const descriptionStyle = {
  border: '1px solid black',
  borderRadius: '4px',
  padding: '10px',
};

const container = {
  display: 'flex',
};

const backBtn = {
  border: '1px solid black',
  borderRadius: '4px',
  color: '#000',
  padding: '5px 10px',
  textDecoration: 'none',
};

const GET_USER_ID = gql`
  query getUserId {
    getProfile {
      _id
    }
  }
`;

const BundleDetails = () => {
  const { id } = useParams();
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  const GET_ONE_BUNDLE = gql`
    query getBundleByID($id: MongoID!) {
      tagBundleById(_id: $id) {
        name
        description
        creatorId
      }
    }
  `;

  const UPDATE_USER_BUNDLE = gql`
    mutation updateBundleById(
      $id: MongoID!
      $record: UpdateByIdTagBundleInput!
    ) {
      tagBundleUpdateById(_id: $id, record: $record) {
        record {
          description
        }
      }
    }
  `;

  const { data, loading, error } = useQuery(GET_ONE_BUNDLE, {
    variables: { id: id },
  });

  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useQuery(GET_USER_ID);

  const [updatedUserBundle] = useMutation(UPDATE_USER_BUNDLE, {
    refetchQueries: [GET_ONE_BUNDLE, 'tagBundleById'],
  });

  //when loading set name and description on empty string
  const name = data?.tagBundleById?.name || '';
  const description = data?.tagBundleById?.description || '';
  const creatorId = data?.tagBundleById?.creatorId || '';
  const userId = userData?.getProfile?._id || '';

  const isMatchBundleToUser = creatorId === userId ? true : false;

  const [updatedBundle, setUpdatedBundle] = useState(description);

  const changeDescriptionHandler = () => {
    if (isMatchBundleToUser) {
      setIsDescriptionOpen(true);
    }
  };

  const updateBundleHandler = (event) => {
    event.preventDefault();
    // console.log(updatedBundle);
    updatedUserBundle({
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

  if (loading) return <div>loading...</div>;
  if (error) return <div>Upsss! Some error</div>;
  if (userLoading) return <div>loading...</div>;
  if (userError) return <div>Upsss! Some error</div>;

  return (
    <>
      <div style={container}>
        <div style={wrap}>
          <h4>DETAILS</h4>
          <div>
            <h4>name:</h4>
            <p>{name}</p>
          </div>
          <div>
            <h4>description:</h4>
            {!isDescriptionOpen && (
              <p style={descriptionStyle} onClick={changeDescriptionHandler}>
                {description}
              </p>
            )}
            {isMatchBundleToUser ? (
              <p>
                this is{' '}
                <span
                  style={{
                    backgroundColor: isMatchBundleToUser ? 'green' : '',
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
                    backgroundColor: !isMatchBundleToUser ? 'red' : '',
                  }}
                >
                  NOT
                </span>{' '}
                your bundle!
              </p>
            )}
            {isDescriptionOpen && isMatchBundleToUser && (
              <div style={descriptionStyle}>
                <textarea
                  type="text"
                  value={updatedBundle}
                  onChange={descriptionChangeHandler}
                />
                <button onClick={updateBundleHandler}>update</button>
                <button onClick={closeBundleHandler}>close</button>
              </div>
            )}
          </div>
          <Link to="/bundle" style={backBtn}>
            BACK
          </Link>
        </div>
        <Pagination />
      </div>
    </>
  );
};

export default BundleDetails;
