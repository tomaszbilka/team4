import { gql, useMutation } from '@apollo/client';

import { GET_BUNDLE_BY_ID } from '../queries/useGetBundleById';

const USE_UPDATE_BUNDLE_BY_ID = gql`
  mutation UpdateBundleById($id: MongoID!, $record: UpdateByIdTagBundleInput!) {
    tagBundleUpdateById(_id: $id, record: $record) {
      record {
        description
      }
    }
  }
`;

const useUpdateBundleById = () => {
  const [updateBundleById] = useMutation(USE_UPDATE_BUNDLE_BY_ID, {
    refetchQueries: [GET_BUNDLE_BY_ID, 'GetBundleById'],
    fetchPolicy: 'network-only',
  });

  return { updateBundleById };
};

export default useUpdateBundleById;
