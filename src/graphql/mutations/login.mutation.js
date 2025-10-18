import gpl from "graphql-tag";

export const LOGIN_MUTATION = gpl`
mutation login ($email: String!, $password: String!) {
    login(email: $email, password: $password){
        token
        user{
            id
            name
            email
            active
            avatar
        }
    }
}
`;
