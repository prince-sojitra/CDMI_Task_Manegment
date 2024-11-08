import React, { useEffect, useRef, useState } from 'react';
import { Container, RightContainer, Title, DescriptionInput, DescriptionText } from './styled';
import DescriptionIcon from '@mui/icons-material/TextSnippetOutlined';
import BottomButtonGroup from '../../../Pages/BoardPage/BoardComponents/BottomButtonGroup/BottomButtonGroup.js';
import { useDispatch, useSelector } from 'react-redux';
import { descriptionUpdate } from '../../../../Services/cardService';
const Description = () => {
	const card = useSelector((state) => state.card);
	const userInfo = useSelector((state) => state.user.userInfo);
	const dispatch = useDispatch();
	const [inputFocus, setInputFocus] = useState(false);
	const [description, setDescription] = useState(card.description);
	const ref = useRef();
	const ref2 = useRef();

	const handleSaveClick = async () => {
		setInputFocus(false);
		await descriptionUpdate(card.cardId, card.listId, card.boardId, description, dispatch);
	};

	useEffect(() => {
		setDescription(card.description);
	}, [card.description]);

	useEffect(() => {
		if (inputFocus) {
			ref.current.focus();
		}
	}, [inputFocus]);

	const handleClickOutside = (event) => {
		if (ref2.current && !ref2.current.contains(event.target)) {
			setInputFocus(false);
			setDescription(card.description);
		} else {
			setInputFocus(true);
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true);
		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	});

	const inputChangehandler = (value) => {
		if (userInfo.type === "ADMIN" || card.createdBy._id === userInfo._id) {
			setDescription(value)
		}
	}

	return (
		<Container ref={ref2}>
			<DescriptionIcon fontSize='small' />
			<RightContainer>
				<Title>Description</Title>
				{description && !inputFocus ? (
					<DescriptionText onClick={() => setInputFocus(true)}>{description}</DescriptionText>
				) : (
					<DescriptionInput
						ref={ref}
						minHeight={inputFocus ? '5.5rem' : '2.5rem'}
						placeholder='Add a more detailed description...'
						value={description}
						onChange={(e) => inputChangehandler(e.target.value)}
						disabled={!(userInfo.type === "ADMIN" || card.createdBy._id === userInfo._id)}
					/>
				)}
				<div style={{ display: inputFocus ? 'block' : 'none' }}>
					<BottomButtonGroup
						closeCallback={() => {
							setInputFocus(false);
							setDescription(card.description);
						}}
						clickCallback={handleSaveClick}
						title='Save'
					/>
				</div>
			</RightContainer>
		</Container>
	);
};

export default Description;
