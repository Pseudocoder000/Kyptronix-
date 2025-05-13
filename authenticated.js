import { useEffect, useState } from 'react'



export function useAuthenticator() {
    const [authenticated,setAuthenticated] = useState(null);

    useEffect(() => {
        fetch('/api/user/isAuthenticated')
          .then((r) => r.json())
          .then((data) => setAuthenticated(data.isAuthenticated))
    },[]

    );

    return authenticated;
}
