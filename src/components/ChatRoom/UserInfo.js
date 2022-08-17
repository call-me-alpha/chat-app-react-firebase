import { Avatar, Button, Typography } from "antd";
import { LogoutOutlined } from '@ant-design/icons'
import { useContext } from "react";
import styled from "styled-components";

import { AuthContext } from '../../Context/AuthProvider'
import { auth } from "../../firebase/config";

const UserInfoStyled = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid #ccc;
    .username {
        color: #fff;
        margin-left: 8px;
    }
`

const UserInfo = () => {
    
    const { displayName, photoURL } = useContext(AuthContext)
    return (
        <UserInfoStyled>
            <div>
                <Avatar src={photoURL} />
                <Typography.Text className="username">{displayName}</Typography.Text>
            </div>
            <Button ghost onClick={() => auth.signOut()}> <LogoutOutlined />Đăng xuất</Button>
        </UserInfoStyled>
    );
}

export default UserInfo;