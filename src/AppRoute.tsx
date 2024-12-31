import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import Screens from './screens';
import Tabs from './navigator/Tabs';
import accountService from './services/accountService';
import {selectIsAuth, setSignin} from './store/balanceSlice';

export default function AppRoute() {
  const dispatch = useDispatch();
  useEffect(() => {
    accountService.checkSigned().then((res: any) => {
      if (res.data.error == 0) {
        const user = {
          username: res.data.data.username,
          roles: res.data.data.roles,
          isAuth: true,
        };
        dispatch(setSignin(user));
      }
    });
  }, []);
  const isAuth = useSelector(selectIsAuth);
  return <>{isAuth ? <Tabs /> : <Screens.Login />}</>;
}
