import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteEvent as deleteEventApi } from '../../services/apiEvents';

export function useDeleteEvent() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteEvent } = useMutation({
    mutationFn: deleteEventApi,
    onSuccess: () => {
      toast.success('Event has been deleted succesfully!');

      queryClient.invalidateQueries({
        queryKey: ['events'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteEvent };
}
