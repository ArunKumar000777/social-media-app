import React, { useEffect,useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import {Outlet,Link} from 'react-router-dom'
import { useRefreshMutation } from './authApiSlice'
import {selectCurrentToken} from './authSlice'

const PersistLogin = () => {
    const token = useSelector(selectCurrentToken)
    const effectRan = useRef(false)
    const [trueSuccess, setTrueSuccess] = useState(false);
    const [refresh, { isLoading, isUninitialized, isSuccess, isError, error }] = useRefreshMutation();

    useEffect(() => {
        if (effectRan.current === true || process.env.NODE_ENV !== "development") {
            const verifyRefreshToken = async () => {
                try {
                    const response = await refresh();
                    const { accessToken } = response.data;
                    setTrueSuccess(true);
                } catch (error) {
                }
            };
            if(!token) verifyRefreshToken()
        }
        return () => {
            effectRan.current = true;
            
        };
        // eslint-disable-next-line
    }, []); 
    let content
   
     if (isLoading) { //persist: yes, token: no
        // console.log('loading')
        content = <p>Loading...</p>
    } else if (isError) { //persist: yes, token: no
        // console.log('error')
        content = (
            <p className='errmsg'>
                {`${error?.data?.message} - `}
                <Link to="/login">Please login again</Link>.
            </p>
        )
    } else if (isSuccess && trueSuccess) { //persist: yes, token: yes
        // console.log('success')
        content = <Outlet />
    } else if (token && isUninitialized) { //persist: yes, token: yes
        // console.log('token and uninit')
        // console.log(isUninitialized)
        content = <Outlet />
    }

    return content;
}

export default PersistLogin