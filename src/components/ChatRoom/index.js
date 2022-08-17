import { Col, Row } from 'antd';
import ChatWindow from './ChatWindow';
import SideBar from './SideBar';

function ChatRoom() {
    return (
        <div>
            <Row>
                <Col span={6}><SideBar /></Col>
                <Col span={18}><ChatWindow /></Col>
            </Row>
        </div>
    );
}

export default ChatRoom; 