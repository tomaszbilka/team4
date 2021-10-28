import { gql, useQuery } from '@apollo/client';

export const GET_BUNDLE_BY_ID = gql`
  query GetBundleById($id: MongoID!) {
    tagBundleById(_id: $id) {
      name
      description
      creatorId
      tags {
        name
      }
    }
  }
`;

const useGetBundleById = (id) => {
  const { data, loading } = useQuery(GET_BUNDLE_BY_ID, {
    fetchPolicy: 'network-only',
    variables: {
      id,
    },
  });

  return { data, loading };
};

export default useGetBundleById;
