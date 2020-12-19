import React, { useContext, useState, useEffect } from 'react';
import { NotificationContext } from '../shared/Notifications';
import { GlobalStoreContext } from '../shared/Globals';
import { UserContext } from '../Authentication/UserProvider';
import Axios from 'axios';
import Header from '../shared/Header';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

const Posts = () => {
	const { setNotification } = useContext(NotificationContext);
	const { globalStore } = useContext(GlobalStoreContext);
  const { user } = useContext(UserContext);

  const [posts, setPosts] = useState([]);
  const [refresh, setRefresh] = useState(false);

	useEffect(() => {
		Axios.get(`${globalStore.REACT_APP_ENDPOINT}/posts`)
			.then(({ data }) => {
				console.log(data);
				setPosts(data);
			})
			.catch((error) => {
				setNotification({
					type: 'danger',
					message: `There was an error retrieving the posts: ${error.message}`,
				});
			});
  }, [globalStore, setNotification]);
  
  const handleDelete = event => {
    event.preventDefault();

    const id = event.target.dataset.id;

    Axios.post(`${globalStore.REACT_APP_ENDPOINT}/posts/destroy`, {
      _id: id,
      secret_token: (user && user.token)
    })
    .then(({ data }) => {
      if (data) {
        setNotification({
          type: "success",
          message: "Post was deleted successfully"
        });
      }
      setRefresh(true);
    })
    .catch((error) => {
      setNotification({
        type: "danger",
        message: `There was an error deleting the post: ${error.message}`
      });
    });
    
   }

   if (refresh) return <Redirect to="/posts"/>;
  
	return (
		<>
			<Header title="Posts" />

			<Container>
				{posts && posts.length > 0
					? posts.map((post, i) => (
								<div key={i} className="card my-3">
									<div className="card-header clearfix">
										<div className="float-left">
											<h4 className="card-title">{post.title}</h4>
											{<small className="float-left">By: {post.author}</small>}
										</div>

										<div className="float-right">
											<h5>
												{user && user.token ? (
                          <Link to={`/posts/edit/${post._id}`}>Edit</Link>
												) : null}
                        {user && user.token ? (
                          <Button variant="dark" type="button" data-id={post._id} onClick={(event) => {if (window.confirm('Are you sure you wish to delete this item?')) handleDelete(event) }}>Delete</Button>
                        ) : null}
											</h5>
											<small>{post.updatedAt}</small>
										</div>
									</div>

									<div className="card-body">
										<p className="card-text">{post.content}</p>
									</div>
								</div>
					  ))
					: null}
			</Container>
		</>
	);
};

export default Posts;
