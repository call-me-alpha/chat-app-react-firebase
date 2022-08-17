import { useContext, useState, useMemo, useEffect } from 'react';
import { Form, Modal, Select, Spin, Avatar } from 'antd';
import { debounce } from 'lodash';
import { query, collection, where, getDocs, updateDoc, doc } from 'firebase/firestore'

import { AppContext } from '../../Context/AppProvider';
import { db } from '../../firebase/config';

function DebounceSelect({
    fetchOptions,
    debounceTimeout = 300,
    curMembers,
    ...props
}) {
    // Search: abcddassdfasdf

    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);

    const debounceFetcher = useMemo(() => {
        const loadOptions = (value) => {
            setOptions([]);
            setFetching(true);

            fetchOptions(value, curMembers).then((newOptions) => {
                setOptions(newOptions);
                setFetching(false);
            });
        };

        return debounce(loadOptions, debounceTimeout);
    }, [debounceTimeout, fetchOptions, curMembers]);

    useEffect(() => {
        return () => {
            // clear when unmount
            setOptions([]);
        };
    }, []);

    return (
        <Select
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size='small' /> : null}
            {...props}
        >
            {options.map((opt) => (
                <Select.Option key={opt.value} value={opt.value} title={opt.label}>
                    <Avatar size='small' src={opt.photoURL} />
                    {`${opt.label}`}
                </Select.Option>
            ))}
        </Select>
    );
}

const fetchUserList = async (search, curMembers) => {
    const querySnapshot = await getDocs(query(collection(db, 'users'), where('keywords', 'array-contains', search)))
    return querySnapshot.docs.map((doc) => ({
        label: doc.data().displayName,
        value: doc.data().uid,
        photoURL: doc.data().photoURL,
    })).filter((opt) => !curMembers.includes(opt.value))
}



const InviteMember = () => {
    const {
        isInviteMemberVisible,
        setIsInviteMemberVisible,
        selectedRoomId,
        selectedRoom,
    } = useContext(AppContext);
    const [value, setValue] = useState([]);
    const [form] = Form.useForm();

    const handleOk = async() => {
        // reset form value
        form.resetFields();

        setValue([]);
        
        // update members in current room
        const roomRef = doc(db, 'rooms', selectedRoomId)

        await updateDoc(roomRef, {
            members: [...selectedRoom.members, ...value.map((val) => val.value)],
        });

        setIsInviteMemberVisible(false);
    };

    const handleCancel = () => {
        // reset form value
        form.resetFields();
        setValue([]);

        setIsInviteMemberVisible(false);
    };

    return (
        <div>
            <Modal
                title='Mời thêm thành viên'
                visible={isInviteMemberVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                destroyOnClose={true}
            >
                <Form form={form} layout='vertical'>
                    <DebounceSelect
                        mode='multiple'
                        name='search-user'
                        label='Tên các thành viên'
                        value={value}
                        placeholder='Nhập tên thành viên'
                        fetchOptions={fetchUserList}
                        onChange={(newValue) => setValue(newValue)}
                        style={{ width: '100%' }}
                        curMembers={selectedRoom.members}
                    />
                </Form>
            </Modal>
        </div>
    );
}

export default InviteMember