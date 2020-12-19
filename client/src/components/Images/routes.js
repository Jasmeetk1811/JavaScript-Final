import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { UserContext } from '../Authentication/UserProvider';

import Index from './index';
import New from './New';

const Routes = () => {
  const { user } = useContext(UserContext);

	return (
		<Switch>
			<Route exact path="/images" component={Index} />
      {user && user.token ? (
				<>
					<Route path="/images/new" component={New} />
					{/* <Route exact path="/posts/edit/:id" component={Edit} /> */}
				</>
			) : null}
		</Switch>
	);
};

export default Routes;
