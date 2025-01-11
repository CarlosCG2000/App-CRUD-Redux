
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
    name: string
    email: string
    github: string
}

export type UserId = string // 1_definimos el tipo UserId

export interface UserWithId extends User { // extiende del usuario
    id: UserId //1_1_añadimos el tipo id al usuario
}

// ========== LOS DATOS INICIALMENTE ==============
const DEFAULT_STATE: UserWithId[] = [
    {
        id: '1',
        name: 'Peter Parker',
        email: 'peter@gmail.com',
        github: 'peterparker'
    },
    {
        id: '2',
        name: 'Kent Brockman',
        email: 'kent@gmail.com',
        github: 'kentbrockman'
    },
    {
        id: '3',
        name: 'Carlos Caño',
        email: 'carloscg00@gmail.com',
        github: 'carloscg2000'
    }
]

const initialState: UserWithId[] = (() => { // array de usuarios, al principio añadimos 3 usuarios para probar
    const persistedState = localStorage.getItem('__redux__state__');

    return persistedState ? JSON.parse(persistedState) : DEFAULT_STATE;
})()
// ============================

export const usersSlice = createSlice({
    name: "users",
    initialState, // no tiene porque ser un  objeto, puesde ser un array, un string, un number, etc
    reducers: {
        // 2_definimos la acción deleteUserById
        deleteUserById: (state, action: PayloadAction<UserId>/*{ type: string, payload: string }*/) => {
            const id = action.payload;
            return state.filter((user) => user.id !== id); // filtramos el usuario que no tenga el id que le pasamos
        },
        //3_Definimos la acción addNewUser
        addNewUser: (state, action: PayloadAction<User>) => {
            const id = crypto.randomUUID()
            state.push({ id, ...action.payload }) // solo se puede por Redux Toolkit ya que usa Immer
            // return [...state, { id, ...action.payload }] // seria la forma normal si no tuvieramos Redux Toolkit
        },
        // 4_Definimos la acción rollbackUser
        rollbackUser: (state, action: PayloadAction<UserWithId>) => {
            const isUserAlreadyDefined = state.some(user => user.id === action.payload.id) // si el usario ya esta en el estado que no se meta
            if (!isUserAlreadyDefined) {
                state.push(action.payload)
            }
        }
    },
});

// lo que nos intersera es el reducer
export default usersSlice.reducer; // exportamos el reducer
// 3_exportamos la acción
export const { deleteUserById, addNewUser, rollbackUser } = usersSlice.actions;
