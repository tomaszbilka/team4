import { gql, useQuery } from '@apollo/client';

const PROFILE_QUERY = gql`
  query GetCurrentUser {
    getProfile {
      oauthId
    }
  }
`;

const useGetUser = () => {
  const { data, loading } = useQuery(PROFILE_QUERY);

  const username =
    data?.getProfile?.oauthId !== 'open-user' && data?.getProfile?.oauthId;

  return { username, loading };
};

export default useGetUser;
