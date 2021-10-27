import { gql, useMutation } from '@apollo/client';

import { ENTRY_QUERY } from '../queries/useGetEntries';

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

const useNewEntry = () => {
  const [createNewEntry] = useMutation(CREATE_ENTRY, {
    refetchQueries: [ENTRY_QUERY, 'GetEntries'],
  });

  return { createNewEntry };
};

export default useNewEntry;
