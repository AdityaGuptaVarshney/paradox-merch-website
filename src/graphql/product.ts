// graphql/products.ts
import { gql } from '@apollo/client';

export const GET_MERCH_PRODUCTS = gql`
  query GetMerchProducts($category: String) {
    ProductQuery(filter: { category: $category }) {
      edges {
        node {
          id
          name
          price
          images {
            imageURL
          }
        }
      }
    }
  }
`;
