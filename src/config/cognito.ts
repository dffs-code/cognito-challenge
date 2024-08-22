import { CognitoIdentityServiceProvider } from 'aws-sdk';
import 'dotenv/config'

const cognito = new CognitoIdentityServiceProvider({
  region: 'us-east-2',
});

export const signUp = (email: string, password: string) => {
  return cognito.signUp({
    ClientId: process.env.COGNITO_CLIENT_ID!,
    Username: email,
    Password: password,
  }).promise();

};

export const signIn = (email: string, password: string) => {
  return cognito.initiateAuth({
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: process.env.COGNITO_CLIENT_ID!,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password
    }
  }).promise();
};

export const confirmSignUp = (email: string, confirmationCode: string) => {
  return cognito.confirmSignUp({
    ClientId: process.env.COGNITO_CLIENT_ID!,
    Username: email,
    ConfirmationCode: confirmationCode
  }).promise();
}
