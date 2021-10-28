import { gql, useQuery } from '@apollo/client';

export const ENTRY_QUERY = gql`
  query GetEntries($filter: FilterFindManyEntryInput) {
    entryMany(filter: $filter) {
      _id
      startTime
      endTime
      date
      tagId
      order
      tag {
        name
        tagBundle {
          _id
          name
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
