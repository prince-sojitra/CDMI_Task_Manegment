import axios from 'axios';
import { openAlert } from '../Redux/Slices/alertSlice';
import { setLoading, successCreatingCard,deleteCard } from '../Redux/Slices/listSlice';

const baseUrl = `${process.env.REACT_APP_APIURL}/card`;

export const createCard = async (title, listId, boardId, dispatch) => {
	dispatch(setLoading(true));
	try {
		const updatedList = await axios.post(baseUrl + '/create', { title: title, listId: listId, boardId: boardId });
		dispatch(successCreatingCard({ listId: listId, updatedList: updatedList.data }));
		dispatch(setLoading(false));
	} catch (error) {
		dispatch(setLoading(false));
		dispatch(
			openAlert({
				message: error?.response?.data?.message ? error.response.data.message : error.message,
				severity: 'error',
			})
		);
	}
};

export const cardDelete = async(listId,boardId,cardId,dispatch)=>{
	try {
		await dispatch(deleteCard({listId,cardId}));
		await axios.delete(baseUrl + "/"+boardId+"/"+listId + "/" + cardId+ "/delete-card");
	} catch (error) {
		dispatch(
			openAlert({
				message: error?.response?.data?.message ? error.response.data.message : error.message,
				severity: 'error',
			})
		);
	}
}
