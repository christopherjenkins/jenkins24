import styled from 'styled-components';
import GatsbyLink from 'gatsby-link';
import userConfig from '../../../config';

const Link = styled(GatsbyLink)`
  color: #27fdf5;
  text-decoration: none;

  &:hover {
    color: ${userConfig.primaryColor};
  }
`;

export default Link;