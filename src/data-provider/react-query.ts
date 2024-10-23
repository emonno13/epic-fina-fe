'use client';

import { conversationService } from '@api/conversation.service';
import { messageService } from '@api/message.service';
import {
  QueryObserverOptions,
  QueryObserverResult,
  UseMutationResult,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { QueryKeys } from './keys';

export const useGetMessagesByConvoId = <TData = TMessage[]>(
  id: string,
  config?: Pick<QueryObserverOptions<TMessage[], unknown, TData>, 'enabled' | 'select'>,
): QueryObserverResult<TData, unknown> => {
  return useQuery({
    queryKey: [QueryKeys.messages, id],
    queryFn: async () => {
      return messageService.getByConversation(id);
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    ...config,
  });
};

export const useGetConvoIdQuery = <TData = any[]>(
  id: string,
  config?: Pick<QueryObserverOptions<TMessage[], unknown, TData>, 'enabled'>,
): QueryObserverResult<TConversation, unknown> => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: [QueryKeys.conversation, id],
    queryFn: async () => {
      const defaultQuery = () => conversationService.getDetail(id);
      // const convosQuery = queryClient.getQueryData<any>([QueryKeys.allConversations]);

      // if (!convosQuery) {
      //   return defaultQuery();
      // }

      // const { pageIndex, index } = findPageForConversation(convosQuery, { conversationId: id });

      // if (pageIndex > -1 && index > -1) {
      //   return convosQuery.pages[pageIndex].conversations[index];
      // }

      return defaultQuery();
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    ...config,
  });
};

export const useGenTitleMutation = (): UseMutationResult => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: any) => conversationService.getDetail(payload),
    onSuccess: (response: any, vars: any) => {
      queryClient.setQueryData([QueryKeys.conversation, vars.conversationId], (convo: any) => {
        if (!convo) {
          return convo;
        }
        return { ...convo, title: response.title };
      });
      document.title = response.title;
    },
  });
};

export const useConversationsInfiniteQuery = <TData = TMessage[]>(
  params: any,
  config?: Pick<QueryObserverOptions<TMessage[], unknown, TData>, 'enabled' | 'select'>,
): QueryObserverResult<TData, unknown> => {
  return useQuery({
    queryKey: [QueryKeys.allConversations],
    queryFn: async () => {
      return conversationService.getAllConv();
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    ...config,
  });
};

export const useUpdateMessageMutation = (id: string): UseMutationResult<unknown, unknown, any, unknown> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QueryKeys.updateMessage],
    mutationFn: async (payload: any) => {
      return messageService.updateMessage(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.messages],
      });
    },
  });
};
