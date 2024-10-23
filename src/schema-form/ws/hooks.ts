import { PresetStatusColorType } from 'antd/lib/_util/colors';
import { useEffect, useMemo } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { Socket } from 'socket.io-client';
import { CALL_STATUS } from '@components/shared/stringee/constant';
import { useStringee } from '@components/shared/stringee/utils/hooks';
import { useAuth } from '@lib/providers/auth';

export const useMeliSocket = (): Socket | null => {
  return useSelector((state: RootStateOrAny) => state.common?.socket);
};

export const useMeliSocketCallStatus = (): {
  status: PresetStatusColorType;
  label: string;
} => {
  const { currentUser = {} } = useAuth();
  const socket = useMeliSocket();
  const {
    account: { readyReceiveCall },
  } = currentUser?.settings || { account: { readyReceiveCall: false } };
  const isAgent = currentUser?.isAgent;
  const { isConnected, agentCallStatus } = useStringee();

  useEffect(() => {
    if (socket?.id && currentUser?.id) {
      socket?.emit('checkCallStatus', { userId: currentUser?.id });
    }
  }, [currentUser, socket?.id]);
  return useMemo(() => {
    if (!readyReceiveCall || !isAgent) {
      return {
        status: 'default',
        label: 'Không có quyền nhận cuộc gọi!',
      };
    }
    if (isConnected && agentCallStatus === CALL_STATUS.AVAILABLE) {
      return {
        status: 'success',
        label: 'Sẵn sàng nhận cuộc gọi!',
      };
    }
    if (isConnected && agentCallStatus === CALL_STATUS.BUSY) {
      return {
        status: 'warning',
        label: 'Đang nhận cuộc gọi!',
      };
    }
    return {
      status: 'error',
      label: 'Không thể nhận cuộc gọi!',
    };
  }, [isConnected, agentCallStatus, readyReceiveCall, isAgent]);
};
