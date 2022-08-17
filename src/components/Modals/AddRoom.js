import { Form, Input, Modal } from "antd";
import { useContext } from "react";
import { AppContext } from "../../Context/AppProvider";
import { AuthContext } from "../../Context/AuthProvider";
import { addDocument } from '../../firebase/service'

const AddRoom = () => {
    const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext)
    const { uid } = useContext(AuthContext)
    const [form] = Form.useForm()
    const handelOk = () => {
        const formData = form.getFieldValue()
        if(formData.name && formData.desc)
            addDocument('rooms', {...form.getFieldValue(), members: [uid]})
        form.resetFields()
        setIsAddRoomVisible(false)
    }
    const handelCancel = () => {
        form.resetFields()
        setIsAddRoomVisible(false)
    }
    return (
        <div>
            <Modal
                title='Tạo phòng'
                visible={isAddRoomVisible}
                onOk={handelOk}
                onCancel={handelCancel}
            >
                <Form form={form} layout='vertical'>
                    <Form.Item label="Tên Phòng" name='name'>
                        <Input placeholder="Nhập tên phòng..." />
                    </Form.Item>
                    <Form.Item label="Mô tả" name='desc'>
                        <Input placeholder="Nhập mô tả..." />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default AddRoom;