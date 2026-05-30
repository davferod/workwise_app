import { gql } from "apollo-angular";

export const MUTATION_CREATE_CARD = gql`
  mutation CreateCard($createCardInput: CreateCardInput!) {
    createCard(createCardInput: $createCardInput) {
    _id
    title
    position
    createdAt
    }
  }
`

export const MUTATION_UPDATE_CARD_POSITION = gql`
  mutation UpdateCardPosition($cardPositionInput: UpdateCardPositionInput!) {
    updateCardPosition(CardPositionInput: $cardPositionInput) {
    _id
    ListId
    position
    }
  }
`
