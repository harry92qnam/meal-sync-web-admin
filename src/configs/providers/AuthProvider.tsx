'use client';
import sessionService from '@/services/session-service';
import { Button, Image, Spinner } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useEffect, useState } from 'react';
import styles from './not-found.module.css';
const AuthProvider = ({ children, role }: { children: ReactNode; role: 'admin' | 'moderator' }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(true);
  const router = useRouter();

  const authenticate = async () => {
    if (!(typeof window !== 'undefined')) return false;
    const token = localStorage.getItem('token') || '';
    let result = true;
    if (!token) {
      result = true;
      router.push('/login');
    } else {
      result = false;
      const roleInSession = sessionService.getRole();
      if (roleInSession != role) {
        router.replace('/not-found');
        setIsAuthorized(false);
      } else {
        setIsAuthorized(true);
        if (roleInSession == 'admin') router.replace('/dashboard');
        else router.replace('/orders');
      }
    }
    setIsLoading(false);
    return result;
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
