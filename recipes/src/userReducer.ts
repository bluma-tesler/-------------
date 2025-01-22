import { createContext, Dispatch } from "react";
export type UserType = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    address: string;
    phone: string;
}
type Action =
    { type: 'login', data: UserType } |
    { type: 'signUp', data: Pick<UserType, 'id' | 'email' | 'password'> } |
    { type: 'logOut' } |
    { type: 'update', data: Partial<UserType> }

export const initialState: UserType = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    phone: ''
}

export const userReducer = (state: UserType, action: Action): UserType => {
    switch (action.type) {
        case 'login':
            return { ...state, ...action.data }
        case 'signUp':
            return { ...state, ...action.data }
        case 'logOut':
            return initialState
        case 'update':
            return { ...state, ...action.data }
        default:
            return state
    }
}

export const UserContext = createContext<{
    state: UserType;
    dispatch: Dispatch<Action>;
}>({
    state: initialState,
    dispatch: () => null,
})
