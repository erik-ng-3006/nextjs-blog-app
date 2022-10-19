import React from 'react';
import MainNavigation from './main-navigation';
import Notification from '../ui/notification';
function Layout(props) {
	return (
		<>
			<MainNavigation />
			<main>{props.children}</main>
		</>
	);
}

export default Layout;
