import React from 'react';
import { Link, useParams } from 'react-router-dom';

interface RouteProps {
  name: string;
}

export default function () {
  const { name } = useParams<RouteProps>();

  return (
    <>
      <h1>{name}</h1>
      <Link to="/">go to: home</Link>
    </>
  );
}