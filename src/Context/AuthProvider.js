import { useNavigate } from "react-router-dom"
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, createContext, useState } from "react"
import { Spin } from 'antd'
import { auth } from '../firebase/config'
import styled from "styled-components"

const AuthContext = createContext()

const CenterStyled = styled.div`
    display: flex;
    height: 100vh;
`
const SpinStyled = styled(Spin)`
    margin: auto;
`

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const history = useNavigate()

    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, user => {
            if (user) {
                const { displayName, email, uid, photoURL } = user
                setUser({ displayName, email, uid, photoURL })
                setIsLoading(false)
                history('/')
                return
            }
            setIsLoading(false)
            history('/login')
        })
        return () => {
            unsubscribed()
        }
    }, [history])
    return (
        <AuthContext.Provider value={user}>
            {isLoading ? <CenterStyled><SpinStyled tip="Loading..."></SpinStyled></CenterStyled> : children}
        </AuthContext.Provider>
    );
}

export { AuthContext }
export default AuthProvider;