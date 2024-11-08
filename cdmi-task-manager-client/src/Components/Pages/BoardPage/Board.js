import Navbar from '../../Navbar';
import React, { useEffect, useState } from 'react';
import TopBar from './BoardComponents/TopBar/TopBar';
import * as style from './Styled';
import AddList from './BoardComponents/AddList/AddList';
import List from './BoardComponents/List/List';
import { useDispatch, useSelector } from 'react-redux';
import { getBoard } from '../../../Services/boardsService';
import { getLists } from '../../../Services/boardService';
import { updateCardOrder, updateListOrder } from '../../../Services/dragAndDropService';
import LoadingScreen from '../../LoadingScreen';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';


const Board = (props) => {
	/* props.match.params.id */
	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.user.userInfo);
	const { backgroundImageLink, isImage, loading, title } = useSelector((state) => state.board);
	const { allLists, loadingListService } = useSelector((state) => state.list);
	const [searchString, setSearchString] = useState('');
	const boardId = props.match.params.id;
	useEffect(() => {
		getBoard(props.match.params.id, dispatch);
		getLists(boardId, dispatch, userInfo);
	}, [props.match.params.id, dispatch, boardId]);

	useEffect(() => {
		document.title = ' CDMI |' + title;
	}, [title]);

	const onDragEnd = async (result) => {
		const { draggableId, source, destination } = result;
		if (!destination) return;
		if (result.type === 'column') {
			if (source.index === destination.index) return;
			await updateListOrder(
				{
					sourceIndex: source.index,
					destinationIndex: destination.index,
					listId: draggableId,
					boardId: boardId,
					allLists: allLists,
					userInfo: userInfo
				},
				dispatch
			);
			return;
		}
		if (source.droppableId === destination.droppableId && source.index === destination.index) return;
		await updateCardOrder(
			{
				sourceId: source.droppableId,
				destinationId: destination.droppableId,
				sourceIndex: source.index,
				destinationIndex: destination.index,
				cardId: draggableId,
				boardId: boardId,
				allLists: allLists,
			},
			dispatch
		);
	};

	return (
		<>
			<Navbar searchString={searchString} setSearchString={setSearchString} />
			<style.Container
				isImage={isImage}
				bgImage={isImage ? backgroundImageLink.split('?')[0] : backgroundImageLink}
			>
				<TopBar />
				{(loading || loadingListService) && <LoadingScreen />}
				<DragDropContext onDragEnd={onDragEnd}>
					<Droppable droppableId='all-columns' direction='horizontal' type='column'>
						{(provided, snapshot) => {
							return (
								<style.ListContainer {...provided.droppableProps} ref={provided.innerRef}>
									{!loading &&
										allLists.map((list, index) => {
											if(list.title.trim() === `${userInfo.name} ${userInfo.surname}`){
												return (
													<List
														searchString={searchString}
														key={list._id}
														index={index}
														info={list}
														boardId={boardId}
														isEditable={userInfo._id === list._id || userInfo.type === "ADMIN"}
														isDrag={false}
													/>
												);
											} else {
												return (
													<List
														searchString={searchString}
														key={list._id}
														index={index}
														info={list}
														boardId={boardId}
														isEditable={userInfo._id === list._id || userInfo.type === "ADMIN"}
														isDrag={true}
													/>
												);
											}
											
										})}
									{provided.placeholder}
									<AddList boardId={boardId} />
								</style.ListContainer>
							);
						}}
					</Droppable>
				</DragDropContext>
			</style.Container>
		</>
	);
};

export default Board;
