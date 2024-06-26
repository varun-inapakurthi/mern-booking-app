import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import Layout from './layouts/layout';
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import { useAppContext } from './contexts/AppContext';
import AddHotel from './pages/AddHotel';
import MyHotels from './pages/MyHotels';

function App() {
  const { isLoggedIn } = useAppContext();
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <Layout>
              <p>Home page</p>
            </Layout>
          }
        />
        <Route
          path='/search'
          element={
            <Layout>
              <p>Search page</p>
            </Layout>
          }
        />
        <Route
          path='/register'
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path='/sign-in'
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        />
        {isLoggedIn && (
          <>
            <Route
              path='/add-hotel'
              element={
                <Layout>
                  <AddHotel />
                </Layout>
              }
            />
            <Route
              path='/my-hotels'
              element={
                <Layout>
                  <MyHotels />
                </Layout>
              }
            />
          </>
        )}
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </Router>
  );
}

export default App;
