import gql from "graphql-tag";

export const CREATE_TAG_MUTATION = gql`
    mutation createTag($createTagInput: CreateTagInput!) {
        createTag(createTagInput: $createTagInput) {
            id
            name
        }
    }
`;