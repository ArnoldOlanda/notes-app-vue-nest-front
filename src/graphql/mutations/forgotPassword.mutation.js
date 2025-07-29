import gpl from "graphql-tag";

export const FORGOT_PASSWORD_MUTATION = gpl`
mutation forgotPassword($email: String!) {
    forgotPassword(email: $email){
        message
    }
}
`;
