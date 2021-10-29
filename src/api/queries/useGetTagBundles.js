import { gql, useQuery } from '@apollo/client';

export const GET_TAG_BUNDLES = gql`
  query GetTagBundles($limit: Int) {
    tagBundleMany(limit: $limit) {
      _id
      name
      tags {
        _id
        name
      }
    }
  }
`;

const useGetTagBundles = () => {
  const { data, loading } = useQuery(GET_TAG_BUNDLES, {
    variables: {
      limit: 200,
    },
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first',
  });

  return { data, loading };
};

export default useGetTagBundles;
