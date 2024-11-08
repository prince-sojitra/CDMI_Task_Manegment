import React, { useEffect, useState } from 'react';
import * as style from './styled';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import * as common from '../../CommonStyled';
import { useDispatch, useSelector } from 'react-redux';
import { boardTitleUpdate, getMembers } from '../../../../../Services/boardsService';
import RightDrawer from '../../../../Drawers/RightDrawer/RightDrawer';
import BaseModel from '../../../../Modals/EditCardModal/ReUsableComponents/BaseModel';
import InviteMembers from '../../../../Modals/EditCardModal/Popovers/InviteMembers/InviteMembers';


const TopBar = () => {
	const board = useSelector((state) => state.board);
	const [currentTitle, setCurrentTitle] = useState(board.title);
	const [showDrawer,setShowDrawer] = useState(false);
	const [invitePopover, setInvitePopover] = React.useState(null);
	const dispatch = useDispatch();

	const getAllMembers = async () => {
		await getMembers(false, dispatch)
	}

	useEffect(()=>{
		if(!board.loading){
			setCurrentTitle(board.title);
			getAllMembers()
		}
	},[board.loading, board.title]);
	const handleTitleChange = () => {
		boardTitleUpdate(currentTitle,board.id,dispatch);
	};

	return (
		<style.TopBar>
			<style.LeftWrapper>
				<style.InviteButton onClick={(event) => setInvitePopover(event.currentTarget)}>
					<PersonAddAltIcon />
					<style.TextSpan>Add Member</style.TextSpan>
				</style.InviteButton>
				{invitePopover && (
				<BaseModel
					anchorElement={invitePopover}
					closeCallback={() => {
						setInvitePopover(null);
					}}
					title='Invite Members'
					contents={<InviteMembers closeCallback={() => {
						setInvitePopover(null);
					}}/>}
				/>
			)}

				<style.BoardNameInput
					placeholder='Board Name'
					value={currentTitle}
					onChange={(e) => setCurrentTitle(e.target.value)}
					onBlur={handleTitleChange}
				/>
			</style.LeftWrapper>

			<style.RightWrapper>
				<common.Button onClick={()=>{setShowDrawer(true)}}>
					<MoreHorizIcon />
					<style.TextSpan>Show menu</style.TextSpan>
				</common.Button>
			</style.RightWrapper>
			<RightDrawer show={showDrawer} closeCallback={()=>{setShowDrawer(false)}} />
		</style.TopBar>
	);
};

export default TopBar;
