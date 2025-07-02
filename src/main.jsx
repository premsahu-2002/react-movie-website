import { createRoot } from 'react-dom/client'
import Root from './Root.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './pages/ErrorPage.jsx'
import CtxProvider from './provider/global-state-provider.jsx'
import MovieSeprate from './pages/MovieSeprate.jsx'
import Index from './index.jsx'


const router = createBrowserRouter([{
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [{
        index: true,
        element: <Index />,
    },{
        path: '/movie/:movieId',
        element: <MovieSeprate />,
    }
]
}
])

createRoot(document.getElementById('root')).render(

    <CtxProvider>
    <RouterProvider router={router} />
    </CtxProvider>
   
)
