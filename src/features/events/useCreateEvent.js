import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createEditEvent } from '../../services/apiEvents';

export function useCreateEvent() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createEvent } = useMutation({
    mutationFn: createEditEvent,
    onSuccess: () => {
      toast.success('New event successfully created!');

      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createEvent };
}
