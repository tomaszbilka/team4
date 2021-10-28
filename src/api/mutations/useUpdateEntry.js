import { gql, useMutation } from '@apollo/client';

import { ENTRY_QUERY } from '../queries/useGetEntries';

const UPDATE_ENTRY_BY_ID = gql`
  mutation UpdateEntryMutation($id: ID!, $record: EntryCreateTypeInput) {
    updateEntry(_id: $id, record: $record) {
      order
    }
  }
`;

const useUpdateEntry = () => {
  const [updateEntryById] = useMutation(UPDATE_ENTRY_BY_ID, {
    refetchQueries: [ENTRY_QUERY, 'GetEntries'],
  });

  return {
    updateEntryById,
  };
};

export default useUpdateEntry;
