import styled from 'styled-components';
import Link from 'gatsby-link';

const Button = styled(Link)`
  border: 1px solid #f98dc9;
  border-radius: 25px;
  color: #27fdf5;
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  margin: 0 10px;
  padding: 5px 15px;
  text-decoration: none;
  text-transform: uppercase;

  &:hover {
    border-color: #f765b8;
  }
`;

export default Button;