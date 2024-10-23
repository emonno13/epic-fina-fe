import { Modal } from 'antd';

export class ModalHelper {
  public static confirm(title: string, content: any): Promise<any> {
    return new Promise<boolean>((resolve, reject) => {
      Modal.confirm({
        title,
        content,
        centered: true,
        onCancel: () => reject(false),
        onOk: () => resolve(true),
      });
    });
  }
}
