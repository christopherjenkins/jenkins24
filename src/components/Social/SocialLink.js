import styled from 'styled-components';

const SocialLink = styled.a`
  border: 1px solid #f765b8;
  border-radius: 15px;
  color: #27fdf5;
  display: inline-block;
  margin: 5px;
  padding: 5px 10px;
  text-decoration: none;

  svg {
    display: inline-block;
    height: 20px;
    margin-right: 5px;
    stroke: #27fdf5;
    vertical-align: middle;
    width: 20px;
  }

  &:hover {
    border-color: #f98dc9;
  }
`;

export default SocialLink;