import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts, getCategories } from './posts.actions';
import { useNavigate } from 'react-router-dom';

const Posts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, products } = useSelector((state: any) => state.posts);

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getCategories());
  }, []);

  if (isLoading) return <h1>LOADING</h1>;

  return (
    <>
      <div>
        {products.map((item: any) => {
          return <p key={item.id}>{item.name}</p>;
        })}
      </div>
      <button onClick={() => navigate('/')}>HOME</button>
    </>
  );
};

export default Posts;
