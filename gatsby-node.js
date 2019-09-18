const _ = require('lodash');
const Promise = require('bluebird');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const createPaginatedPages = require('gatsby-paginate');
const userConfig = require('./config');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogPost = path.resolve('./src/templates/blog-post.js');
  const pageTemplate = path.resolve('./src/templates/page-template.js');

  const blogs =  graphql(
      `
        {
          allMarkdownRemark(
            filter: { fileAbsolutePath: { glob: "**/src/pages/blog/*/*.md" } }
            sort: { fields: [frontmatter___date], order: DESC }
            limit: 1000
          ) {
            edges {
              node {
                fields {
                  slug
                }
                excerpt
                frontmatter {
                  title
                  date(formatString: "MMMM D, YYYY")
                  featuredImage {
                    childImageSharp {
                      sizes(maxWidth: 850) {
                        base64
                        aspectRatio
                        src
                        srcSet
                        sizes
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
    ).then(result => {
      if (result.errors) {
        console.log(result.errors);
        reject(result.errors);
      }

      // Create blog posts pages.
      const posts = result.data.allMarkdownRemark.edges;

      _.each(posts, (post, index) => {
        const previous =
          index === posts.length - 1 ? null : posts[index + 1].node;
        const next = index === 0 ? null : posts[index - 1].node;

        createPaginatedPages({
          edges: result.data.allMarkdownRemark.edges,
          createPage: createPage,
          pageTemplate: 'src/templates/index.js',
          pageLength: userConfig.postsPerPage,
        });

        createPage({
          path: post.node.fields.slug,
          component: blogPost,
          context: {
            slug: post.node.fields.slug,
            previous,
            next,
          },
        });
      });
    });

    const staticPages =  graphql(
      `
        {
          allMarkdownRemark(
            filter: { fileAbsolutePath: { glob: "**/src/pages/static/*/*.md" } }
            sort: { fields: [frontmatter___date], order: DESC }
            limit: 1000
          ) {
            edges {
              node {
                fields {
                  slug
                }
                excerpt
                frontmatter {
                  title
                  date(formatString: "MMMM D, YYYY")
                  featuredImage {
                    childImageSharp {
                      sizes(maxWidth: 850) {
                        base64
                        aspectRatio
                        src
                        srcSet
                        sizes
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
    ).then(result => {
      if (result.errors) {
        console.log(result.errors);
        reject(result.errors);
      }

      // Create blog posts pages.
      const posts = result.data.allMarkdownRemark.edges;

      _.each(posts, (post, index) => {
        const previous =
          index === posts.length - 1 ? null : posts[index + 1].node;
        const next = index === 0 ? null : posts[index - 1].node;

        createPage({
          path: post.node.fields.slug.replace("/static", ""),
          component: pageTemplate,
          context: {
            slug: post.node.fields.slug,
            previous,
            next,
          },
        });
      });
    });

  return Promise.all([blogs, staticPages]);
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
