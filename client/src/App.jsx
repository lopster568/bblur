//HOOKS AND FUNCTIONS IMPORTS
import { Routes, Route } from "react-router-dom"
import { useDispatch } from "react-redux";
import { lazy, Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { setNotifications } from "./redux/notifications/notifications.actions";
//MUI IMPORTS
import { Box, Stack, Snackbar } from "@mui/material";
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { closeAlert, setAlert } from "./redux/alert/alert.actions";

import Loading from "./components/LoadingScreen/loadingscreen.component";

//LAZY COMPONENT IMPORTS
const Sidebar = lazy(() => import("./components/Sidebar/sidebar.component"))
const Rightbar = lazy(() => import("./components/Rightbar/rightbar.component"))
const BottomNav = lazy(() => import("./components/BottomNav/bottom-nav.component"))
const Navbar = lazy(() => import("./components/Navbar/navbar.component"))
const Add = lazy(() => import("./components/Add/add.component"))

//LAZY ROUTE COMPONENTS IMPORTS
const Login = lazy(() => import("./pages/Login/Login.component"))
const SignUp = lazy(() => import("./pages/SignUp/SignUp.component"))
const Profile = lazy(() => import("./pages/ProfileSettings/profile.component"))
const Discover = lazy(() => import("./pages/Discover/discover.component"))
const SocialCircle = lazy(() => import("./pages/SocialCircle/social-circle.component"))
const Settings = lazy(() => import("./pages/Settings/Settings.component"))
const Home = lazy(() => import("./pages/Home/home.component"))
const UserProfile = lazy(() => import("./pages/UserProfile/user-profile.component"))
const PostViewEdit = lazy(() => import("./pages/PostView-Edit/post-view-edit.component"))
const SavedPosts = lazy(() => import("./pages/SavedPosts/saved-posts.component"))

function App() {
  const dispatch = useDispatch()
  const themeMode = useSelector(state => state.theme)
  const darkTheme = createTheme({
    palette: {
      mode: themeMode.mode
    }
  })
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'), {
    defaultMatches: true
  });
  const alert = useSelector(state => state.alert)
  const anchor = {
    vertical: 'top',
    horizontal: 'right',
  }

  return (
    <ThemeProvider theme={darkTheme}  >
      <Box bgcolor={'background.default'} color="text.primary" >
        <Suspense fallback={<Loading />} >
          <Navbar />
          <Stack direction="row" spacing={isMobile ? 0 : 2} justifyContent="space-between" >
            <Sidebar />
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/profile' element={<Profile />} />
              <Route exact path='/discover' element={<Discover />} />
              <Route exact path='/circle' element={<SocialCircle />} />
              <Route exact path='/settings' element={<Settings />} />
              <Route exact path='/login' element={<Login />} />
              <Route exact path='/signup' element={<SignUp />} />
              <Route exact path='/saved-posts' element={<SavedPosts />} />
              <Route path='/user'>
                <Route path=":id" element={<UserProfile />} />
              </Route>
              <Route path='/post'>
                <Route path="edit">
                  <Route path=":id" element={<PostViewEdit edit />} />
                </Route>
                <Route path=":id" element={<PostViewEdit />} />
              </Route>
            </Routes>
            <Rightbar />
            <BottomNav />
            <Add />
            <Snackbar 
              open={alert.open}
              onClose={() => dispatch(closeAlert())}
              message={alert.message}
              autoHideDuration={3000}
              severity="info"
              anchorOrigin={anchor}
            />
          </Stack>
        </Suspense>
      </Box>
    </ThemeProvider >
  );
}

export default App;