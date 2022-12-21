import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import {  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from './screens/HomeScreen';
import BeneficiaryScreen from './screens/BeneficiaryHomeScreen';
import CheckHomeScreen from './screens/CheckHomeScreen';
import CheckScreen from './screens/CheckScreen';
import CarddHomeScreen from './screens/CarddHomeScreen';
import CarddScreen from './screens/CarddScreen';
import ProductScreen from './screens/ProductScreen';
import AccountScreen from './screens/AccountScreen';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext } from 'react';
import { Store } from './Store';
import SigninScreen from './screens/SigninScreen';
import PaymentAddressScreen from './screens/PaymentAddressScreen';
import SignupScreen from './screens/SignupScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import TransactionScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import ProtectedRoute from './components/ProtectedRoute';
import SummaryScreen from './screens/SummaryScreen';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import AccountListScreen from './screens/AccountListScreen';
import CheckListScreen from './screens/CheckListScreen';
import CarddListScreen from './screens/CarddListScreen';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {  userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('paymentAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
    
  };
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
      <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar bg="primary" variant="dark" expand="lg">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>DEMO Bank</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
               
                <Nav className="me-auto    "> 
                <Link to="/Beneficiary" className="nav-link"> Beneficiary</Link>
                <Link to="/Cardd" className="nav-link"> Card</Link>
                <Link to="/Check" className="nav-link"> Check</Link>
                {/*w-100 justify-content-end */}
                  
                  
                  {userInfo && userInfo.isAdmin && (
                    <NavDropdown title="Others" id="admin-nav-dropdown">
                      <LinkContainer to="summary">
                        <NavDropdown.Item>Summary</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/products">
                        <NavDropdown.Item>Beneficiary</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/orders">
                        <NavDropdown.Item>Transactions</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/cardds">
                        <NavDropdown.Item>Card</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/checks">
                        <NavDropdown.Item>Checks</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/accounts">
                        <NavDropdown.Item>Accounts</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderhistory">
                        <NavDropdown.Item>Transaction History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        className="dropdown-item"
                        to="/"
                        onClick={signoutHandler}
                      >
                        Sign Out
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link" to="/signin">
                      Sign In
                    </Link>
                  )}
                </Nav>
              </Navbar.Collapse>
              
            </Container>
            
          </Navbar>
          {/* <Link to="/">DEMO Bank</Link>  */}
        </header>
        
        <main>
        <Container className="mt-3">
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/account/:slug" element={<AccountScreen />} />
              <Route path="/cardd/:slug" element={<CarddScreen />} />
              <Route path="/check/:slug" element={<CheckScreen />} />
              
              <Route path="/home" element={<HomeScreen />} />
              <Route path="/Beneficiary" element={<BeneficiaryScreen />} />
              <Route path="/Check" element={<CheckHomeScreen />} />
              <Route path="/Cardd" element={<CarddHomeScreen />} />
              <Route path="/" element={<SigninScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route
                path="/payment"
                element={<PaymentAddressScreen />}
              ></Route>
              <Route
                path="/orderhistory"
                element={
                  <ProtectedRoute>
                    <OrderHistoryScreen />
                  </ProtectedRoute>
                }
              ></Route>
              <Route path="/Confirmation" element={<PlaceOrderScreen />} />
              
              <Route
                path="/order/:id"
                element={
                  <ProtectedRoute>
                    <TransactionScreen />
                  </ProtectedRoute>
                }
              ></Route>
              

              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfileScreen />
                  </ProtectedRoute>
                }
              />
              {/* Admin Routes */}
              <Route
                path="/summary"
                element={
                  <AdminRoute>
                    <SummaryScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/products"
                element={
                  <AdminRoute>
                    <ProductListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/product/:id"
                element={
                  <AdminRoute>
                    <ProductEditScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/orders"
                element={
                  <AdminRoute>
                    <OrderListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/accounts"
                element={
                  <AdminRoute>
                    <AccountListScreen />
                  </AdminRoute>
                } 
              ></Route>
              <Route
                path="/admin/checks"
                element={
                  <AdminRoute>
                    <CheckListScreen />
                  </AdminRoute>
                } 
              ></Route>
              <Route
                path="/admin/cardds"
                element={
                  <AdminRoute>
                    <CarddListScreen />
                  </AdminRoute>
                } 
              ></Route>
               
              <Route path="/signup" element={<SignupScreen />} />
            </Routes>
        </Container>
        </main>
        <footer>
          <div className="text-center">@ All rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
export default App;