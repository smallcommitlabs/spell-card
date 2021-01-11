/**
 * The authentication client is a wrapper around the AWS-SDK auth object.
 * The reasoning for this is that the application should not be concerned
 * about what is being used for authetication and it also allows for easier mocking.
 *
 * Methods can be added here as needed
 */

export interface IAuthClient {
  /**
   * Attempt to sign in the user with the provided credientials
   * @returns true if the login was accepted otherwise false
   */
  signIn: (username: string, password: string) => Promise<boolean>;

  /**
   * Signs out the user. If the user is not signed in then this will have no effect
   */
  signOut: () => Promise<void>;

  /**
   * Check if the user is currently authenticated
   * @returns true if the user is currently authenticated otherwise false
   */
  isAuth: () => Promise<boolean>;
}

/**
 * Mock implementation of the authentication client that will accept any set of credientials.
 */
export const AuthClient: IAuthClient = {
  signIn: async (username, password) => {
    console.log(`User is attempting to login with details: ${username}, ${password}`);
    localStorage.setItem('auth', 'true');
    return true;
  },

  signOut: async () => {
    console.log('Signing out user');
    localStorage.removeItem('auth');
  },

  isAuth: async () => {
    const res = localStorage.getItem('auth') !== null;
    return res;
  },
};
