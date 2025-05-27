import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { USER_LOGIN, UserLoginResponse } from '../graphql/auth';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  memberData: UserLoginResponse['userLogin']['member'] | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [memberData, setMemberData] = useState<UserLoginResponse['userLogin']['member'] | null>(null);
  const router = useRouter();

  const [loginMutation] = useMutation<UserLoginResponse>(USER_LOGIN);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        try {
          const idToken = await user.getIdToken();
          const { data } = await loginMutation({
            variables: { firebaseToken: idToken }
          });

          if (data) {
            localStorage.setItem('authToken', data.userLogin.token);
            localStorage.setItem('memberData', JSON.stringify(data.userLogin.member)); // ✅ new line
            setMemberData(data.userLogin.member);
          }
        } catch (error) {
          console.error('Error during GraphQL login:', error);
          toast.error('Error logging in');
        }
      } else {
        localStorage.removeItem('authToken');
        setMemberData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [loginMutation]);

  useEffect(() => {
    const storedMemberData = localStorage.getItem('memberData');
    if (storedMemberData) {
      setMemberData(JSON.parse(storedMemberData));
    }
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push('/');
    } catch (error) {
      console.error('Error signing in with Google:', error);
      toast.error('Error signing in with Google');
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('authToken');
      localStorage.removeItem('memberData');
      setMemberData(null);
      router.push('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Error signing out');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, logout, memberData }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 