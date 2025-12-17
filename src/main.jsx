import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeLayout from './Layouts/HomeLayout.jsx'
import ProductList from './components/ProductList.jsx'
import Order from './components/Order.jsx'
import LoginForm from './components/LoginForm.jsx'
import ProductDetails from './components/ProductDetails.jsx'
import Admin from './components/Admin.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Cart from './components/Cart.jsx'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import Register from './components/Register.jsx'



const products=[
        {
            id:1,
            name:'vegetables',
            price:'100',
            image:'https://tse1.mm.bing.net/th/id/OIP.22aFQSK47XCY6E9UlMeDRQHaE7?pid=Api&P=0&h=180'
        },
        {
            id:2,
            name:'egg',
            price:'50',
            image:'https://www.nutritionfact.in/wp-content/uploads/2022/06/egg.jpg'
        },
        {
            id:3,
            name:'Wheat Floor',
            price:'300',
            image:'https://www.aahaimpex.in/wp-content/uploads/2018/06/Wheat-Flour.png'
        },
        {
            id:4,
            name:'rice',
            price:'1000',
            image:'https://www.ikedaspa.com/wp-content/uploads/2014/09/04-SJ_rice-import-126-ab-ED.png'
        },
        {
            id:5,
            name:'salt',
            price:'200',
            image:'https://static.toiimg.com/photo/68483689.cms'
        },
    ];

createRoot(document.getElementById('root')).render(
<>
    <ToastContainer/>
    <BrowserRouter>
    <Routes>
        <Route element={<HomeLayout/>}>
        <Route path='/' element={<App/>}/>
        <Route path='/product'>
                <Route index element={<ProductList products={products}/>} />
                <Route path='/product/:id' element={<ProductDetails/>}/>
        </Route>
        <Route path='/orders' element={<ProtectedRoute><Order/></ProtectedRoute>}/>
        <Route path='/login' element={<LoginForm/>}/>
        <Route path="/register" element={<Register />} />
        <Route path='/admin' element={<PrivateRoute><Admin/></PrivateRoute>} />
        <Route path='/cart' element={<Cart />} />
        </Route>

    </Routes>
    </BrowserRouter>
</>
)
