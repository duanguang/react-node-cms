import { Modal } from 'antd';
const confirm = Modal.confirm;
export function showDeleteModal(onConfirmCb) {
    confirm({
        title: `您确定要执行删除操作吗?`,
        content: `一旦删除将无法恢复`,
        onOk: onConfirmCb
    });
}
