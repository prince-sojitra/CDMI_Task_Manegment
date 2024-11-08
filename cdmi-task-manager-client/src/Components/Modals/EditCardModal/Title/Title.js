import React, { useEffect, useState } from 'react';
import { Container, IconWrapper, RightContainer, TitleInput, Description, Link } from './styled';
import TitleIcon from '@mui/icons-material/ChromeReaderMode';
import { titleUpdate } from '../../../../Services/cardService';
import { useDispatch, useSelector } from 'react-redux';

const Title = (props) => {
	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.user.userInfo);
	const card = useSelector((state) => state.card);
	const [title, setTitle] = useState('');
	useEffect(() => {
		setTitle(card.title);
	}, [card.title]);

	const handleTitleAccept = async () => {
		await titleUpdate(card.cardId, card.listId, card.boardId, title, dispatch);
	};

	const titleChangeHandler = (value) => {
		if(userInfo.type === "ADMIN" || card.createdBy._id === userInfo._id){
			setTitle(value)
		}
	}

	return (
		<Container>
			<IconWrapper>
				<TitleIcon fontSize='small' />
			</IconWrapper>
			<RightContainer>
				<TitleInput
					value={title}
					onChange={(e) => titleChangeHandler(e.target.value)}
					onBlur={handleTitleAccept}
					disabled={!(userInfo.type === "ADMIN" || card.createdBy._id === userInfo._id)}
				></TitleInput>
				<Description>
					in list <Link>{card.listTitle}</Link>
				</Description>
			</RightContainer>
		</Container>
	);
};

export default Title;
