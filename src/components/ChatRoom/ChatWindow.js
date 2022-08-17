import { UserAddOutlined } from "@ant-design/icons";
import { Alert, Avatar, Button, Form, Input, Tooltip } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useContext, useState } from "react";
import styled from "styled-components";
import Message from "./Message";

import { AppContext } from '../../Context/AppProvider'
import { addDocument } from '../../firebase/service'
import { AuthContext } from "../../Context/AuthProvider";

const HeaderStyled = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 57px;
    padding: 0 16px;
    border-bottom: 1px solid rgb(230, 230, 230);
    .header {
        &__info {
            display: flex;
            flex-flow: column;
            justify-content: center;
        }
        &__title {
            margin: 0;
            font-weight: bold;
        }
        &__description {
            font-size: 12px;
        }
    }
`

const WrapperStyled = styled.div`
    height: 100vh;
`
const ButtonGroupStyled = styled.div`
    display: flex;
    align-items: center;
`
const ContentStyled = styled.div`
    height: calc(100% - 57px);
    display: flex;
    flex-flow: column;
    padding: 12px;
    justify-content: flex-end;
`
const FormStyled = styled(Form)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px 2px 2px 0;
    border: 1px solid rgb(230, 230, 230);
    border-radius: 2px;
    .ant-form-item {
        flex: 1;
        margin-bottom: 0;
    }
`
const MessageListStyled = styled.div`
    max-height: 100%;
    overflow-y: auto;
`
const ChatWindow = () => {
    const { selectedRoom, members, setIsInviteMemberVisible, messages } = useContext(AppContext)
    const { uid, displayName, photoURL } = useContext(AuthContext)
    const [inputValue, setInputValue] = useState('')
    const [form] = Form.useForm()

    const handelInputChange = e => {
        setInputValue(e.target.value)
    }
    const handelSubmit = () => {
        addDocument('messages', {
            text: inputValue,
            uid,
            photoURL,
            displayName,
            roomId: selectedRoom.id,
        })
        form.resetFields(['message'])
    }

    return (
        <WrapperStyled >
            {selectedRoom.id ? (
                <>
                    <HeaderStyled>
                        <div className="header__info">
                            <p className="header__title">{selectedRoom.name}</p>
                            <span className="header__description">{selectedRoom.desc}</span>
                        </div>
                        <ButtonGroupStyled>
                            <Button icon={<UserAddOutlined />} type='text' onClick={() => setIsInviteMemberVisible(true)}>Mời</Button>
                            <Avatar.Group size='small' maxCount={2}>
                                {members.map(member => (
                                    <Tooltip title={member.displayName} key={member.uid}>
                                        <Avatar src={member.photoURL} />
                                    </Tooltip>
                                ))}
                            </Avatar.Group>
                        </ButtonGroupStyled >
                    </HeaderStyled>
                    <ContentStyled>
                        <MessageListStyled>
                            {messages.map(message => (<Message
                                key={message.id}
                                text={message.text}
                                displayName={message.displayName}
                                createdAt={message.createdAt}
                                photoURL={message.photoURL}
                            />))}
                        </MessageListStyled>
                        <FormStyled form={form}>
                            <FormItem name='message'>
                                <Input
                                    onChange={handelInputChange}
                                    onPressEnter={handelSubmit}
                                    placeholder="Nhập tin nhắn..."
                                    bordered={false}
                                    autoComplete='off'
                                />
                            </FormItem>
                            <Button onClick={handelSubmit}>Gửi</Button>
                        </FormStyled>
                    </ContentStyled>
                </>
            ) : <Alert message='Hãy chọn phòng...' type="info" showIcon style={{ margin: 4 }} closable />}
        </WrapperStyled>
    );
}

export default ChatWindow;