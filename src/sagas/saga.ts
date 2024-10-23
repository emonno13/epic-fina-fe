import { all, spawn } from 'redux-saga/effects';

import FundCertificateSaga from '@components/features/client/fund-certificate/store/sagas';
import { StringeeSagas } from '@components/shared/stringee/sagas';
import { CommonSagas } from 'store/sagas';
import { DealSagas } from '../components/features/fina/deals/sagas';
import { StatusSagas } from '../components/features/status/sagas';
import { nodeTemplateDocumentUploaderSaga } from '../components/shared/documents/document-template-files/sagas';
import {
  PositionSystemSagas,
  RolesSystemSagas,
} from '../dynamic-configuration/sagas';
import { nodeDocumentSaga } from '../schema-form/common/sagas';
import { DragAndDrop } from '../schema-form/drag-n-drop/sagas';
import { connectSocket } from '../schema-form/ws/sagas';
import { SystemSagas } from '../system/sagas';

function* rootSaga() {
  yield all([
    spawn(connectSocket),
    spawn(StringeeSagas),
    spawn(nodeDocumentSaga),
    spawn(StatusSagas),
    spawn(DealSagas),
    spawn(SystemSagas),
    spawn(nodeTemplateDocumentUploaderSaga),
    spawn(CommonSagas),
    spawn(DragAndDrop),
    spawn(PositionSystemSagas),
    spawn(RolesSystemSagas),
    spawn(FundCertificateSaga),
  ]);
}

export default rootSaga;
