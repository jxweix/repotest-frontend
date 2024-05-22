"use client";
import { useEffect, useState } from 'react';

function UnauthenticatedPage() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      const response = await fetch('/api/check-auth');
      const data = await response.json();
      setLoggedIn(data.loggedIn);
    }

    checkAuth();
  }, []);

  if (loggedIn) {
    return <p>You are already logged in.</p>;
  } else {
    return <p>Please sign in to see todos!</p>;
  }
}

export default UnauthenticatedPage;