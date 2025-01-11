import { useAppDispatch } from "./store";
import { addNewUser, deleteUserById, User, UserId } from '../store/users/slide'; //1_Importamos la acción deleteUserById

export const useUserActions = () => {
	const dispatch = useAppDispatch(); //2_Importamos el hook useDispatch

	// 3_Definimos la función handleDeleteUser
	const removeUser = (id: UserId) => {
		dispatch(deleteUserById(id));
	};

	// Añadimos la función addUser
	const addUser = ({ name, email, github }: User) => {
		dispatch(addNewUser({ name, email, github }))
	}

	return { removeUser, addUser }
};
