import Cookie from "js-cookie";

export default {
  auth(to: any, from: any, next: any) {
    const token = Cookie.get('access_token');

    if (!token) {
      next('/login')
    }

    fetch('http://localhost:3000/auth/me', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    })
      .then(response => response.json())
      .then(data => {
        if (!data.name) {
          next('/login')
        }

        localStorage.setItem('user', JSON.stringify(data));
      })

    next();
  }
}