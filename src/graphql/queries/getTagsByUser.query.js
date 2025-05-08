import gql from "graphql-tag";

export const GET_TAGS_BY_USER = gql`query GetTagsByUserId($userId: Int!) {
    getTags(userId: $userId) {
        id
        name
        active
    }
}`;