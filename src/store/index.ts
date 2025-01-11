import { configureStore, type Middleware } from '@reduxjs/toolkit';
import usersReducer, { rollbackUser } from './users/slide';
import { toast } from 'sonner';

// ============== MIDDLEWARE ==============
// recupera la store que devuelve una funcion con el metodo next que a su vez devuelve una funcion con el metodo action
// queremos leer la store pero tambien llamar al reducer para que actualice el estado
// se pasa asi porque cada uno de los metodos se esta ejecutnado en un tiempo distinto en una parte distinta de forma interna
const persistanceLocalStorageMiddleware: Middleware = (store: any) => (next: any) => (action: any) => {
    // fase 1
    // console.log(store.getState());
    // console.log(action);
    next(action); // --> haz lo siguiente que tengas que hacer
    // fase 2
    //console.log(store.getState());
    localStorage.setItem('__redux__state__', JSON.stringify(store.getState().users)); // guardamos en el localStorage el estado de los usuarios
}


// ================ NUEVO ================
const syncWithDatabaseMiddleware: Middleware = store => next => (action) => {
    const { type, payload } = action // para saber en que acción estamos, da error pero es indiferente
    const previousState = store.getState() as RootState
    //fase 1
    next(action)

    //fase 2
    if (type === 'users/deleteUserById') { // <- vamos a ver si el tipo de accion es eliminr a un usuario
        const userIdToRemove = payload // <- el id del usuario a eliminar
        const userToRemove = previousState.users.find(user => user.id === userIdToRemove) // <- buscamos el usuario a eliminar

        // Lo suyo seria separarlo en otro fichero
        // es una api de usuario: https://jsonplaceholder.typicode.com/users/
        fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, { // borramos el usuario de la base de datos
            method: 'DELETE'
        })
            .then(res => {
                if (res.ok) {
                    toast.success(`Usuario ${payload} eliminado correctamente`)
                }
                // throw new Error('Error al eliminar el usuario')
            })
            .catch(err => {
                toast.error(`Error deleting user ${userIdToRemove}`)
                if (userToRemove) store.dispatch(rollbackUser(userToRemove)) // si va mal (el usuario no existe) lo que queremos es hacer un rollback, ya que no se puede eliminar algo que no existe
                console.log(err)
                console.log('error')
            })
    }
}
// ===================================

export const store = configureStore({
    reducer: {
        users: usersReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(persistanceLocalStorageMiddleware, syncWithDatabaseMiddleware), // Usamos getDefaultMiddleware y añadimos el custom middleware
});

// para poder tipar el estado de la aplicación
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
