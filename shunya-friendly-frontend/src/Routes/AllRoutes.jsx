import { Routes, Route } from "react-router-dom"
import Home from "../Pages/Home/Home"
import CreateUser from './../Pages/Create User/CreateUser';
import ViewUser from './../Pages/View User/ViewUser';

const AllRoutes = () => {
  return (
    <Routes>
        <Route path = '/' element = {<Home />} />
        <Route path = '/create-user' element = {<CreateUser />} />
        <Route path = '/view-user' element = {<ViewUser />} />
    </Routes>
  )
}

export default AllRoutes