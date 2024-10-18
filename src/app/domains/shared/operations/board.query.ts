import { gql } from "apollo-angular";

export const QUERY_GET_BOARDS = gql`
query Boards {
  boards {
    _id
    backgroundColor
    title
    description
    members
    createdAt
  }
}
`
export const QUERY_BOARD_BY_ID = gql`
query FindOneByBoard($boardId: ID!) {
  findOneByBoard(boardId: $boardId) {
    _id
    title
    position
    cards {
      _id
      title
      createdAt
      description
      position
      routines {
        _id
        description
        name
        exercises {
          loadPercent
          name
          repetitions
          restBetweenSets
          sets
        }
        createdAt
      }
      tasks {
        _id
        title
        description
        status
        createdAt
      }
      userid
    }
  }
}
`

