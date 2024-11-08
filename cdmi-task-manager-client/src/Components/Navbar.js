import React from 'react';
import styled from 'styled-components';
import DropdownMenu from './DropdownMenu';
import SearchBar from './SearchBar';
import { xs } from '../BreakPoints';
import ProfileBox from './ProfileBox';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';

const Container = styled.div`
	height: 3rem;
	width: 100%;
	background-color: rgba(0, 0, 0, 0.3);
	backdrop-filter: blur(24px);
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 0.5rem 1rem;
	gap: 0.5rem;
	${xs({
	padding: '0.5rem, 0rem',
})}
`;

const LeftSide = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	gap: 1rem;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	${xs({
	gap: '0.1rem',
	width: 'fit-content',
})}
`;

const RightSide = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-end;
`;

const LogoContainer = styled.div`
	display: flex;
	align-items: center;
`;

const CDMILogo = styled.img`
	width: 120px;
	cursor: pointer;
	filter: brightness(0) invert(1);
`;

const DropdownContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	${xs({
	display: 'none',
})}
`;

const Navbar = (props) => {
	const history = useHistory();
	const userInfo = useSelector((state) => state.user.userInfo);
	return (
		<Container>
			<LeftSide>
				<LogoContainer>
					<CDMILogo
						onClick={() => {
							history.push('/boards');
						}}
						src='/creative-logo-blue.svg'
					/>
				</LogoContainer>
				<DropdownContainer>
					<DropdownMenu title='Your Boards' />
				</DropdownContainer>
				{
					userInfo && userInfo.type === "ADMIN" ? 
				<LogoContainer>
					<Button  variant="contained"  color="success" onClick={() => {
						history.push('/register');
					}}>
						Add New User
					</Button>
				</LogoContainer> : ""
				}
			</LeftSide>
			<RightSide>
				<SearchBar searchString={props.searchString} setSearchString={props.setSearchString} />
				<ProfileBox />
			</RightSide>
		</Container>
	);
};

export default Navbar;
