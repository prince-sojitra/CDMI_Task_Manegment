import React, { useState } from 'react';
import { Container, SearchContainer, SearchBar, ChipContainer } from './styled';
import Button from '../../ReUsableComponents/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserFromEmail } from '../../../../../Services/userService';
import { openAlert } from '../../../../../Redux/Slices/alertSlice';
import { boardMemberAdd, boardMemberRemove } from '../../../../../Services/boardService';

const root = {
	maxWidth: '8rem',
	opacity: '70%',
}

const ChipComponent = (props) => {
	const { name, surname, callback } = props;
	return (
		<Tooltip TransitionComponent={Zoom} title={`${name} ${surname}`} size='small' placement='top' arrow>
			<Chip
				className={root}
				onDelete={callback}
				avatar={<Avatar>{name.toString()[0]}</Avatar>}
				label={`${name} ${surname}`}
				size='small'
				color='secondary'
			/>
		</Tooltip>
	);
};

const InviteMembers = () => {
	const boards = useSelector((state) => state.boards);
	const board = useSelector((state) => state.board);
	const currentMembers = [...board.members].map((el) => el.email)
	const [memberMail, setMemberMail] = useState('');
	const [members, setMembers] = useState([]);
	const dispatch = useDispatch();
	const boardId = useSelector(state => state.board.id);

	const handleDelete = async (id) => {
		await boardMemberRemove(boardId, id, dispatch);
	};

	const handleInviteClick = async () => {
		const membersData = []
		if (members && members.length) {
			Promise.all(members.map(async (el) => {
				const result = await getUserFromEmail(el.email, dispatch);
				if (!result) return;
				membersData.push(result)
			})).then(async () => {
				if (membersData && membersData.length) {
					await boardMemberAdd(boardId, membersData, dispatch);
				}
			}).then(() => {
				setMembers([])
			})
			
		}

	}

	return (
		<Container>
			<SearchContainer>
				{/* <SearchBar
					type='email'
					placeholder="Member's Email"
					value={memberMail}
					onChange={(e) => {
						setMemberMail(e.target.value);
					}}
				/> */}
				<Autocomplete
					multiple
					disablePortal
					value={members}
					disableCloseOnSelect
					options={boards.members.filter((el) => !currentMembers.includes(el.email) && !members.find((li) => li.email == el.email)).map((el) => ({ ...el, label: `${el.name} ${el.surname}` }))}
					sx={{ width: 300 }}
					renderInput={(params) => <TextField {...params} label="Select Members" />}
					onChange={(e, value) => setMembers(value)}
				/>
				<Button title='Invite' style={{ flex: '1' }} clickCallback={handleInviteClick} />
			</SearchContainer>
			<ChipContainer>
				{board.members.map((member) => {
					return <ChipComponent key={member.email} callback={() => handleDelete(member._id)} {...member} />;
				})}
			</ChipContainer>
			{members.length > 0 && <Button clickCallback={handleInviteClick} title='Invite' />}
		</Container>
	);
};

export default InviteMembers;
