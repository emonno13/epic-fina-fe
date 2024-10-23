import { atom } from 'recoil';

const openWayToReplyDrawer = atom<boolean>({
  key: 'openWayToReplyDrawer',
  default: false,
});

const openOthersSearchDrawer = atom<boolean>({
  key: 'openOthersSearchDrawer',
  default: false,
});

const openCompanySignUpModal = atom<boolean>({
  key: 'openCompanySignUpModal',
  default: false,
});

const openPartnerSignUpModal = atom<boolean>({
  key: 'openPartnerSignUpModal',
  default: false,
});

export default {
  openWayToReplyDrawer,
  openOthersSearchDrawer,
  openCompanySignUpModal,
  openPartnerSignUpModal,
};
