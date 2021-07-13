import Cookies from 'js-cookie';
import apiCall from '../apiCall';

export const signUp = async (user = {}) => {
  try {
    const res = await apiCall('/signup', 'post', user);
    Cookies.set('accessToken', res.data.accessToken)
    Cookies.set('userName', res.data.user.name)
    return res;
  } catch (err) {
    console.log(err)
    return false;
  }
}

export const signIn = async (user = {}) => {
  try {
    const res = await apiCall('/signin', 'post', user);
    Cookies.set('accessToken', res.data.accessToken)
    Cookies.set('userName', res.data.user.name)
    return res;
  } catch (err) {
    console.log(err)
    return false;
  }
}

export const signOut = async () => {
  try {
    const accessToken = Cookies.get('accessToken')
    const res = await apiCall('/sign-out', 'post', {}, accessToken);
    Cookies.set('accessToken', '')
    return res;
  } catch (err) {
    console.log(err)
  }
}
