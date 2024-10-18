import { gql } from "apollo-angular";

export  const MUTATION_LOGIN = gql`
mutation Login($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    accessToken
    refreshToken
    user {
      _id
    }
  }
}
`

export const MUTATION_SIGNUP = gql`
  mutation Signup($loginUserInput: LoginUserInput!) {
    signup(loginInput: $loginInput) {
    accessToken
    refreshToken
    user {
      _id
    }
  }
}
`

export const MUTATION_UPDATE_PROFILE = gql`
  mutation UpdateProfile($updateProfileInput: UpdateProfileInput!) {
    updateProfile(updateProfileInput: $updateProfileInput) {
      full_name
      gender
      date_of_birth
      levelexp
      cel_phone
      health_history
      associated_gym {
        name
        location
      }
    }
  }
`
