import { gql, useQuery } from '@apollo/client';

export const GET_PROFILE_BUNDLE_TAGS = gql`
  query GetMyBundleTags {
    getProfile {
      tagBundles {
        name
        _id
      }
      _id
    }
  }
`;

const useGetProfileBundles = () => {
  const { loading, data, error } = useQuery(GET_PROFILE_BUNDLE_TAGS, {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first',
  });
  const MYBUNDLE = data?.getProfile?.tagBundles || [];

  return { data: MYBUNDLE, loading, error };
};

export default useGetProfileBundles;
