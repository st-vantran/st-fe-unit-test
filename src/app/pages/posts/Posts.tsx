import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getPosts } from './posts.actions';

const Posts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, products } = useSelector((state: any) => state.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  if (isLoading) return <h1>LOADING</h1>;

  return (
    <>
      <div>
        {products.map((item: any) => {
          return (
            <Link to={`/posts/${item.id}`}>
              <p key={item.id}>{item.name}</p>
            </Link>
          );
        })}
      </div>
      <button onClick={() => navigate('/')}>HOME</button>
    </>
  );
};

export default Posts;
