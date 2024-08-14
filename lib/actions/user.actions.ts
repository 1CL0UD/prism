'use server';
import { INewUser } from '@/types';
import { users } from '../appwrite.config';
import { ID, Query } from 'node-appwrite';
import { parseStringify } from '../utils';

export async function createUserAccount(user: INewUser) {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      undefined,
      user.password,
      user.name
    );

    return parseStringify(newUser);
  } catch (error: any) {
    if (error && error?.code === 409) {
      const documents = await users.list([Query.equal('email', [user.email])]);
      return documents?.users[0];
    }
    console.log(error);
  }
}
