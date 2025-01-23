import React from 'react'
import { Router } from './routes'
import { UserAuthenticated } from '../services/authenticate/authenticate'

export const ProtectedRoutes = ({children}) => { 
    return UserAuthenticated()? children : <Router/>
}