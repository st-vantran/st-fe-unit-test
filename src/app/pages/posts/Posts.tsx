import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getPosts } from './posts.actions';
import { Product } from '../../shared/types/product';

const Posts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, products } = useSelector(
    (state: {
      posts: { products: Product[]; product: Product; isLoading: boolean };
    }) => state.posts
  );

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  if (isLoading) return <h1>LOADING</h1>;

  return (
    <>
      <div>
        {products.map((item: Product) => {
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
