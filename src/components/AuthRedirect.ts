import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { checkUserRole } from '../utils/authUtils';


function AuthRedirect() {
  const router = useRouter();
  useEffect(() => {

        const role = checkUserRole();
        
        if (role === "admin") {
          router.replace('/admin');
        } else if (role === "user") {
          router.replace('/user');
        } else {
          router.replace('/');
        }
      
  }, []);



  return null
}

export default AuthRedirect;
