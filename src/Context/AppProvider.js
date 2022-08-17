import { useContext, createContext, useMemo, useState } from "react"

import useFireStore from '../hooks/useFireStore'
import { AuthContext } from './AuthProvider'

const AppContext = createContext()

const AppProvider = ({ children }) => {
    const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false)
    const [isAddRoomVisible, setIsAddRoomVisible] = useState(false)
    const [selectedRoomId, setSelectedRoomId] = useState('')
    const user = useContext(AuthContext)

    const roomsCondition = useMemo(() => ({
        fieldName: 'members',
        operator: 'array-contains',
        compareValue: user.uid
    }), [user.uid])
    const rooms = useFireStore('rooms', roomsCondition)

    const selectedRoom = useMemo(
        () => rooms.find((room) => room.id === selectedRoomId) || {}
        , [rooms, selectedRoomId]);

    const usersCondition = useMemo(() => ({
        fieldName: 'uid',
        operator: 'in',
        compareValue: selectedRoom.members,
    }), [selectedRoom.members]);

    const newMembers = useFireStore('users', usersCondition);
    let members = []
    const isNewMember = newMembers.some(member => member.uid !== user.uid)
    if(isNewMember) {
        members = [...newMembers, user]
    }
    members = [...newMembers]

    const messageCondition = useMemo(() => ({
        fieldName: 'roomId',
        operator: '==',
        compareValue: selectedRoom.id,
    }), [selectedRoom]);
    const messages = useFireStore('messages', messageCondition)
    messages.sort((a, b) => a.createdAt.seconds - b.createdAt.seconds)
    return (
        <AppContext.Provider value={{
            rooms,
            isAddRoomVisible,
            setIsAddRoomVisible,
            setSelectedRoomId,
            selectedRoom,
            members,
            isInviteMemberVisible,
            setIsInviteMemberVisible,
            selectedRoomId, 
            messages,
        }}>
            {children}
        </AppContext.Provider>
    );
}

export { AppContext }
export default AppProvider;