import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getPosts } from './posts.actions';
import { Product } from '../../shared/types/product';

export const deleteProduct = (id: string, products: Product[]) => {
  return products.filter((product: Product) => product.id !== id);
};

const Posts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [productsList, setProducts] = useState<Product[]>([]);

  const { isLoading, products, error } = useSelector(
    (state: {
      posts: {
        products: Product[];
        product: Product;
        isLoading: boolean;
        error: any;
      };
    }) => state.posts
  );

  const deleteProductFn = (id: string) => {
    const newProducts = deleteProduct(id, productsList);
    setProducts(newProducts);
  };

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  useEffect(() => {
    setProducts(products);
  }, [products]);

  if (isLoading) return <h1 data-testid="loading">LOADING</h1>;
  if (error) return <h1>ERROR</h1>;

  return (
    <>
      <ul data-testid="user-list">
        {productsList.map((item: Product, index: number) => {
          return (
            <li key={index}>
              <Link to={`/posts/${item.id}`}>
                <p key={item.id}>{item.name}</p>
              </Link>
              <button onClick={() => deleteProductFn(item.id)}>
                Delete user {item.id}
              </button>
            </li>
          );
        })}
      </ul>
      <button onClick={() => navigate('/')}>HOME</button>
    </>
  );
};

export default Posts;
