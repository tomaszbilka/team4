import { gql, useMutation } from '@apollo/client';

const CREATE_ENTRY = gql`
  mutation CreateEntry($record: EntryCreateTypeInput) {
    createEntry(record: $record) {
      _id
      startTime
      endTime
      tag {
        name
      }
    }
  }
`;

const useNewEntry = (filter = {}) => {
  const { data, loading } = useMutation(CREATE_ENTRY, {
    refetchQueries: [GET_ALL_EN]
  });

  return { data, loading };
};

export default useNewEntry;
