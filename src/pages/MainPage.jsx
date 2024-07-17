import SideBar from '../components/Sidebar/SideBar';
import MainChat from '../components/MainChat/MainChat';
import { useDispatch, useSelector } from 'react-redux';
import { closeContextMenu } from '../store/contextMenuSlice';
import DetailPage from './DetailPage';
import { Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ErrorModal from '../components/Modal/ErrorModal';
import { useEffect, useRef } from 'react';
import { setError } from '../store/errorSlice';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ErrorPage from './ErrorPage';
import { ErrorBoundary } from 'react-error-boundary';
import Logo from '../assets/sLogo/logo-blue.png';

export default function MainPage() {
    const errorModal = useRef(null);
    const sliceIsError = useSelector((state) => state.errorSlice.isError);
    const dispatch = useDispatch();
    // Define the error handler function
    const apiErrorHandler = (error) => {
        const serviceCode = error?.code;
        const httpMessage = error.message;
        dispatch(setError({ message: httpMessage, code: serviceCode }));
    };
    // Initialize the query client with error handling
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                onError: (error) => {
                    apiErrorHandler(error);
                },
                staleTime: 1000 * 60 * 15, // 5 minutes
                cacheTime: 1000 * 60 * 60, // 15 minutes
                refetchOnWindowFocus: false,
            },
            mutations: {
                onError: (error) => {
                    apiErrorHandler(error);
                },
            },
        },
    });
    const handleContextMenuClose = () => {
        dispatch(closeContextMenu());
    };
    // UseEffect to open/close modal based on error state
    useEffect(() => {
        if (sliceIsError) {
            errorModal.current.open();
        } else {
            errorModal.current.close();
        }
    }, [sliceIsError]);
    return (
        <QueryClientProvider client={queryClient}>
            <main className="main" onClick={(e) => handleContextMenuClose(e)}>
                <input
                    type="checkbox"
                    id="main--checkbox"
                    className="main__checkbox"
                />

                <label htmlFor="main--checkbox">
                    <img src={Logo} className="main__logo" />
                </label>

                <aside className="main--sidebar">
                    <SideBar />
                </aside>
                <section className="main--main">
                    <ErrorBoundary FallbackComponent={ErrorPage}>
                        <Routes>
                            <Route
                                path="/namegacha/"
                                element={<WrappedMainChat />}
                            />
                            <Route
                                path="/namegacha/detail/:pageId"
                                element={<WrappedDetailPage />}
                            />
                            <Route
                                path="/namegacha/error"
                                element={<ErrorPage />}
                            />
                            <Route
                                path="/namegacha/*"
                                element={<Navigate to="/namegacha/error" />}
                            />
                        </Routes>
                    </ErrorBoundary>
                </section>
            </main>
            <ErrorModal ref={errorModal} />
            <ToastContainer />
        </QueryClientProvider>
    );
}
function WrappedMainChat() {
    return (
        <div className="mainChat">
            <MainChat />
        </div>
    );
}

function WrappedDetailPage() {
    return (
        <div className="mainChat">
            <DetailPage />
        </div>
    );
}
