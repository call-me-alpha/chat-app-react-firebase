import { Button, Col, Row, Typography } from "antd";
import { signInWithPopup, FacebookAuthProvider, getAdditionalUserInfo, GoogleAuthProvider } from "firebase/auth";

import { auth } from '../../firebase/config'
import { addDocument, generateKeywords } from '../../firebase/service'

const { Title } = Typography

function Login() {
    const providerFb = new FacebookAuthProvider()
    const providerGg = new GoogleAuthProvider()

    const handelLoginFb = async () => {
        const data = await signInWithPopup(auth, providerFb)
        const { isNewUser } = getAdditionalUserInfo(data)
        const { user } = data
        if (isNewUser) {
            addDocument('users', {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                providerId: user.providerData[0].providerId,
                keywords: generateKeywords(user.displayName)
            })
        }

    }
    const handelLoginGg = async () => {
        const data = await signInWithPopup(auth, providerGg)
        const { isNewUser } = getAdditionalUserInfo(data)
        const { user } = data
        if (isNewUser) {
            addDocument('users', {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                providerId: user.providerData[0].providerId,
                keywords: generateKeywords(user.displayName)
            })
        }

    }

    return (
        <div>
            <Row justify="center" style={{ height: 800 }}>
                <Col span={8}>
                    <Title style={{ textAlign: 'center' }} level={3}>App Chat </Title>
                    <Button style={{ width: '100%', marginBottom: 4 }} onClick={handelLoginGg}>Đăng nhập bằng Google</Button>
                    <Button style={{ width: '100%' }} onClick={handelLoginFb}>Đăng nhập bằng Facebook</Button>
                </Col>
            </Row>
        </div>
    );
}

export default Login;