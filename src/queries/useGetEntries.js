import { gql, useQuery } from '@apollo/client';

const ENTRY_QUERY = gql`
  query getEntries {
    entryMany {
      startTime
      endTime
      date
      tagId
      updatedAt
      createdAt
      tag {
        name
        updatedAt
        createdAt
      }
    }
  }
`;

const useGetEntries = () => {
  const { data, loading } = useQuery(ENTRY_QUERY);

  return { data, loading };
};

export default useGetEntries;
