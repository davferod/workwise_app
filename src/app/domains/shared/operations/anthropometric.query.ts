import { gql } from "apollo-angular";

export const QUERY_antro = gql`
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

export const QUERY_ANTHROPOMETRIC_MEASUREMENTS = gql`
query AnthropometricMeasurements {
  anthropometricMeasurements {
    _id
    armCircumference
    bodyMassIndex
    date
    height
    hipCircumference
    legCircumference
    userId
    waistCircumference
    weight
  }
}`;
