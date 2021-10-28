import { gql, useMutation } from '@apollo/client';

import { GET_PROFILE_BUNDLE_TAGS } from '../queries/useGetProfileBundles';

const ASSIGN_BUNDLE = gql`
  mutation AssignBundle($id: ID) {
    assignBundleId(bundleId: $id) {
      updatedAt
      createdAt
    }
  }
`;

const useAssignBundle = () => {
  const [assignBundleId] = useMutation(ASSIGN_BUNDLE, {
    refetchQueries: [GET_PROFILE_BUNDLE_TAGS, 'GetMyBundleTags'],
  });

  return assignBundleId;
};

export default useAssignBundle;
