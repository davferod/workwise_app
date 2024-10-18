import { gql } from "apollo-angular";

export const QUERY_PROFILE = gql`
query Profile{
    profile{
    _id
    full_name
    profile_picture
    date_of_birth
    gender
    cel_phone
    levelexp
    health_history
    associated_gym {
      location
      name
    }
    userId {
      username
      email
      role
    }
    boardId {
      _id
      description
      title
    }
    routines {
      _id
      name
      description
      exercises {
        loadPercent
        name
        repetitions
        restBetweenSets
        sets
      }
    }
    createdAt
    updatedAt
  }
}`;

export const QUERY_PROFILES = gql`
query Profiles{
    profiles{
    _id
    full_name
    profile_picture
    date_of_birth
    gender
    cel_phone
    levelexp
    health_history
    associated_gym {
      location
      name
    }
    userId {
      username
      email
      role
    }
    boardId {
      _id
      backgroundColor
      createdAt
      deletedAt
      description
      title
      updatedAt
      userId
    }
    routines {
      _id
      name
      description
      exercises {
        loadPercent
        name
        repetitions
        restBetweenSets
        sets
      }
    }
    createdAt
    updatedAt
  }
}`;
