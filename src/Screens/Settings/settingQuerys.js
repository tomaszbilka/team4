import { gql, useMutation, useQuery } from '@apollo/client';
const GET_ALL_BUNDLES_TAGS = gql`
  query getAllBundleTags {
    tagBundleMany {
      _id
      name
    }
  }
`;
const GET_MY_BUNDLES_TAGS = gql`
  query getMyBundleTags {
    getProfile {
      tagBundles {
        name
        _id
      }
      _id
    }
  }
`;

const ADD_MUTATION = gql`
  mutation dodajMnieDoBundla($id: ID) {
    assignBundleId(bundleId: $id) {
      updatedAt
      createdAt
    }
  }
`;
const REMOVE_MUTATION = gql`
  mutation zabierzMnieZBundla($id: ID) {
    unassignBundleId(bundleId: $id) {
      updatedAt
      createdAt
    }
  }
`;

export const useAllBundles = () => {
  const { loading, data, error } = useQuery(GET_ALL_BUNDLES_TAGS);
  const ALLDATA = data?.tagBundleMany || [];

  return { data: ALLDATA, loading, error };
};
export const useMyBundle = () => {
  const { loading, data, error } = useQuery(GET_MY_BUNDLES_TAGS);
  const MYBUNDLE = data?.getProfile?.tagBundles || [];

  return { data: MYBUNDLE, loading, error };
};

export const useSetBundle = () => {
  const [assignBundleId] = useMutation(ADD_MUTATION, {
    refetchQueries: [GET_MY_BUNDLES_TAGS, 'getMyBundleTags'],
  });
  return assignBundleId;
};

export const useRemoveBundle = () => {
  const [removeBundleId] = useMutation(REMOVE_MUTATION, {
    refetchQueries: [GET_MY_BUNDLES_TAGS, 'getMyBundleTags'],
  });
  return removeBundleId;
};
