'use client';
import sessionService from '@/services/session-service';
import { Button, Image, Spinner } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useEffect, useState } from 'react';
import styles from './not-found.module.css';
const AuthProvider = ({
  children,
  role = 'guest', // all page
}: {
  children: ReactNode;
  role?: 'all' | 'guest' | 'authenticated' | 'admin' | 'moderator'; // who can access
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(true);
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('authDTO');

    router.push('/login');
  };
  const authenticate = async () => {
    if (!(typeof window !== 'undefined')) return;
    const token = localStorage.getItem('token') || '';

    if (!token) {
      // CURRENT_USER isGuest => if not allow => back to home
      if (role != 'all' && role != 'guest') {
        router.replace('/');
        setIsAuthorized(false);
      } else setIsAuthorized(true);
    } else {
      // CURRENT_USER "authenticated" | 'admin' | 'moderator'
      const roleInSession = sessionService.getRole();
      if (!roleInSession) {
        handleLogout();
      } else if (role == 'all') {
        setIsAuthorized(true);
      } else if (role == 'guest') {
        if (roleInSession == 'admin') router.replace('/dashboard');
        else router.replace('/orders');
        // router.replace('/not-found');
        setIsAuthorized(false);
      } else if (role == 'authenticated') {
        setIsAuthorized(true);
      } else if (role == roleInSession) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
        router.replace('/not-found');
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLoading(true);
      authenticate();
    }
  }, []);

  if (isAuthorized) {
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.subtitle}>Không tìm thấy trang này</p>
        <Button className={styles.link} onClick={() => router.back()}>
          Quay lại trang trước
        </Button>
      </div>
    </div>;
  }
  return isLoading || !isAuthorized ? (
    <div className="h-screen w-screen flex flex-col gap-3 justify-center items-center">
      <div className="flex gap-3 justify-center items-center">
        <div style={{ marginLeft: '-12px' }}>
          <Image alt="VFoody Logo" height={32} radius="sm" src="../../images/logo.png" width={32} />
        </div>
        <div className="flex flex-col">
          <h1 className="text-2xl font-medium text-primary">MealSync</h1>
        </div>
      </div>
      <div className="flex gap-3 justify-center items-center mt-2">
        <Spinner color="default" />
        <Spinner color="primary" />
        <Spinner color="secondary" />
        <Spinner color="success" />
        <Spinner color="warning" />
        <Spinner color="danger" />
      </div>
    </div>
  ) : (
    children
  );
};

export default AuthProvider;
