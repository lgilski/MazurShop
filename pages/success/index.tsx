import { useEffect } from 'react';

export default function SuccessPage() {
  useEffect(() => {
    localStorage.removeItem('cartItems');
  }, []);

  return <div>uwu</div>;
}
