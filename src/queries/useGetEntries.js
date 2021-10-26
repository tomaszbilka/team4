import { gql, useQuery } from '@apollo/client';

export const ENTRY_QUERY = gql`
  query GetEntries($filter: FilterFindManyEntryInput) {
    entryMany(filter: $filter) {
      _id
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
        tagBundle {
          name
          updatedAt
          createdAt
        }
      }
    }
  }
`;

const useGetEntries = (filter = {}) => {
  const { data, loading } = useQuery(ENTRY_QUERY, { variables: { filter } });

  return { data, loading };
};

export default useGetEntries;
