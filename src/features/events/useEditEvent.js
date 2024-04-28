import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createEditEvent } from '../../services/apiEvents';

export function useEditEvent() {
  const queryClient = useQueryClient();

  const { isLoading: isEditing, mutate: editEvent } = useMutation({
    mutationFn: ({ newEventData, id }) => createEditEvent(newEventData, id),
    onSuccess: () => {
      toast.success('Event successfully edited!');

      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editEvent };
}
