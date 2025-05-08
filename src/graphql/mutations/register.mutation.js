import gpl from "graphql-tag";

export const REGISTER_MUTATION = gpl`
mutation Register($data: CreateUserInput!) {
    register(data: $data) {
        user {
            id
            name
            email
            active
        }
        token
    }
}`;
