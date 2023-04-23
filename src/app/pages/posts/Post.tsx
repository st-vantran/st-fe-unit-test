import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Product } from '../../shared/types/product';
import { getPost } from './posts.actions';

const Post = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { isLoading, product } = useSelector(
    (state: {
      posts: { products: Product[]; product: Product; isLoading: boolean };
    }) => state.posts
  );

  useEffect(() => {
    dispatch(getPost(id || ''));
  }, []);

  if (isLoading) return <h1>LOADING</h1>;

  return (
    <>
      <div>
        <p>Email: {product.email}</p>
        <p>Id: {product.id}</p>
        <p>Name: {product.name}</p>
        <p>Phone: {product.phone}</p>
        <p>UserName: {product.username}</p>
        <p>Website: {product.website}</p>
      </div>
      <button onClick={() => navigate('/')}>HOME</button>
    </>
  );
};

export default Post;
