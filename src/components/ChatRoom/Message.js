import { Avatar, Typography } from "antd";
import styled from "styled-components";
import { formatRelative } from "date-fns";

const WrapperStyled = styled.div`
    margin-bottom: 10px;
    .author {
        margin-left: 4px;
        font-weight: bold;
    }
    .date {
        margin-left: 10px;
        font-size: 12px;
        color: #a7a7a7;
    }
    .content {
        margin-left: 30px;
    }
`
const formatDate = (seconds) => {
    let formatedDate
    if(seconds) {
        formatedDate = formatRelative(new Date(seconds * 1000), new Date())
        formatedDate = formatedDate.charAt(0).toUpperCase() + formatedDate.slice(1)
    }
    return formatedDate
}

const Message = ({ text, displayName, createdAt, photoURL }) => {
    return (
        <WrapperStyled>
            <div>
                <Avatar size='small' src={photoURL} />
                <Typography.Text className="author">{displayName}</Typography.Text>
                <Typography.Text className="date">{formatDate(createdAt?.seconds)}</Typography.Text>
            </div>
            <div>
                <Typography.Text className="content">{text}</Typography.Text>
            </div>
        </WrapperStyled>
    );
}

export default Message;
