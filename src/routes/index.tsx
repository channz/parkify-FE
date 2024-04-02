import OnboardingFirst from '@/pages/onboarding/onboarding-first';
import Login from '@/pages/auth/login';
import Register from '@/pages/auth/register';

const router = createRoot([
    {
        children: [
            { path: "/onboard", element: <OnboardingFirst />},
            { path: "/login", element: <Login />},
            { path: "/register", element: <Register />},
        ],
    },
]);

export default function App (){
    return <RouterProvider router={router} />;
}