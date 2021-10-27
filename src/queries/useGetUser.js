import { gql, useQuery } from '@apollo/client';

const PROFILE_QUERY = gql`
  query GetCurrentUser {
    getProfile {
      tagBundles {
        name
      }
      oauthId
      _id
    }
  }
`;

const useGetUser = () => {
  const { data, loading } = useQuery(PROFILE_QUERY);

  if (data?.getProfile?.oauthId === 'open-user') return { user: null, loading };

  return { user: data?.getProfile, loading };
};

export default useGetUser;
