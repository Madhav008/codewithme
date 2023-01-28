import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const PrivateRoutes = () => {
    const { user } = useSelector((state) => state.user)
    return (
        user.username != null ? <Outlet /> : <Navigate to='/login' />
    )
}
