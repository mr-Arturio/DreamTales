import { useRouter } from 'next/router';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        localStorage.removeItem('UserCookie')
        router.push('/');
      alert('User logged out successfully!');
      window.location.reload()
      } else {
        alert('Logout failed.');
      }
    } catch (err) {
      console.error('Error during logout:', err);
      alert('An error occurred during logout.');
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
