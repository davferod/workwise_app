import { gql } from "apollo-angular";

export const MUTATION_CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
    _id
    title
    backgroundColor
    description
    members
    userId
    createdAt
    }
  }
`
