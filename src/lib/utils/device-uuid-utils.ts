import { validate, v4 as uuidV4 } from 'uuid';

export const DEVICE_UUID_NAMESPACE = 'deviceUuid';
export const DeviceUuidUtils = {
  getDeviceUuid() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(DEVICE_UUID_NAMESPACE) || '';
    }
    return '';
  },
  setDeviceUuid(newDeviceUuid: string) {
    if (!validate(newDeviceUuid) || typeof window === 'undefined') {
      return;
    }
    localStorage.setItem(DEVICE_UUID_NAMESPACE, newDeviceUuid);
  },
  handleCheckDeviceUuid() {
    const deviceUuid = this.getDeviceUuid();

    if (validate(deviceUuid)) {
      return;
    }
    const newDeviceUuid = uuidV4();
    this.setDeviceUuid(newDeviceUuid);
  },
};
