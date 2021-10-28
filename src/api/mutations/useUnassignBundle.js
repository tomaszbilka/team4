import { gql, useMutation } from '@apollo/client';

import { GET_PROFILE_BUNDLE_TAGS } from '../queries/useGetProfileBundles';

const REMOVE_MUTATION = gql`
  mutation UnassignBundle($id: ID) {
    unassignBundleId(bundleId: $id) {
      updatedAt
      createdAt
    }
  }
`;

const useUnassignBundle = () => {
  const [removeBundleId] = useMutation(REMOVE_MUTATION, {
    refetchQueries: [GET_PROFILE_BUNDLE_TAGS, 'GetProfileBundleTags'],
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first',
  });
  return removeBundleId;
};

export default useUnassignBundle;
