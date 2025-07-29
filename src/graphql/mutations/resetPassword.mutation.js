import gpl from "graphql-tag";

export const RESET_PASSWORD_MUTATION = gpl`
mutation resetPassword($token: String!, $password: String!) {
    resetPassword(token: $token, password: $password){
        message
    }
}
`;
