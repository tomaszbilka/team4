import { gql, useMutation } from '@apollo/client';

import { GET_TAG_BUNDLES } from '../queries/useGetTagBundles';

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

const useCreateNewBundle = () => {
  const [createNewBundle] = useMutation(CREATE_NEW_BUNDLE, {
    refetchQueries: [GET_TAG_BUNDLES, 'GetTagBundles'],
  });

  return { createNewBundle };
};

export default useCreateNewBundle;
