import React, { useContext, useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { NotificationContext } from '../../shared/Notifications';
import { UserContext } from '../../Authentication/UserProvider';
import { GlobalStoreContext } from '../../shared/Globals';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

const PostForm = ({ endpoint, preload }) => {
	const [inputs, setInputs] = useState({});
	const [redirect, setRedirect] = useState(false);
	const { setNotification } = useContext(NotificationContext);
	const { user } = useContext(UserContext);
	const { globalStore } = useContext(GlobalStoreContext);

	useEffect(() => {
		setInputs({ ...preload });
	}, [preload]);

	const handleChange = (event) => {
		event.persist();
		setInputs({
			...inputs,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(inputs);

		Axios.post(`${globalStore.REACT_APP_ENDPOINT}/${endpoint}`, {
			...inputs,
			secret_token: user && user.token,
		})
			.then(({ data }) => {
				if (data) {
					setNotification({
						type: 'success',
						message: 'Post was updated successfully',
					});
				}

				setRedirect(true);
			})
			.catch((error) => {
				setNotification({
					type: 'danger',
					message: `There was an error updating the post: ${error.message}`,
				});
			});
	};

	if (redirect) return <Redirect to="/posts" />;
	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group>
				<Form.Label>Title:</Form.Label>
				<Form.Control
					name="title"
					placeholder="Title"
					onChange={handleChange}
					defaultValue={inputs.title}
				/>
			</Form.Group>
      <Form.Group>
        <Form.Label>Body:</Form.Label>
        <Form.Control style={{ height: 300 }}
				name="content"
				as="textarea"
				placeholder="Body..."
				onChange={handleChange}
        defaultValue={inputs.content}
        />
      </Form.Group>
			<Button variant="dark" type="submit">Submit</Button>
		</Form>
	);
};

export default PostForm;
