import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { UserContext } from '../Authentication/UserProvider';

import Index from './index';
import New from './New';
import Edit from './Edit';

const Routes = () => {
	const { user } = useContext(UserContext);

	return (
		<Switch>
			<Route exact path="/posts" component={Index} />

			{user && user.token ? (
				<>
					<Route exact path="/posts/new" component={New} />
					<Route exact path="/posts/edit/:id" component={Edit} />
				</>
			) : null}
		</Switch>
	);
};

export default Routes;
