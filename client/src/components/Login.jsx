import {React,useState , useEffect} from 'react'
import {useSelector , useDispatch} from 'react-redux'
import { loginUser, registerUser } from '../redux/Slices/AuthSlice.js';

const Login = ({ setShowLogin }) => {
    const [state, setState] = useState("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const dispatch = useDispatch();
    const {user, loading, error} = useSelector((state) => {
        console.log('Current Redux State:', state);
        return state.auth;
    });
    
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        if (state === 'login') {
            const resultAction = await dispatch(loginUser({ email, password }));
            if (loginUser.fulfilled.match(resultAction)) {
                // Login successful
            }
        } else {
            // Register
            const resultAction = await dispatch(registerUser({ name, email, password }));
            if (registerUser.fulfilled.match(resultAction)) {
                // Registration successful, user is auto-logged in
            }
        }
    }

    useEffect(() => {
        if (user) {
            setShowLogin(false);
        }
    }, [user, setShowLogin]);

    useEffect(() => {
        if (error) {
            // You can add a toast notification here if you want
            console.error('Login error:', error);
        }
    }, [error]);

  return (
    <div onClick={()=> setShowLogin(false)} className='fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center text-sm text-gray-600 bg-black/50'>
         <form onSubmit={onSubmitHandler} onClick={(e)=>e.stopPropagation()} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white">
            {error && <p className="text-red-500 w-full text-center">{error.message || 'Login failed. Please try again.'}</p>}
            <p className="text-2xl font-medium m-auto">
                <span className="text-primary">User</span> {state === "login" ? "Login" : "Sign Up"}
            </p>
            {state === "register" && (
                <div className="w-full">
                    <p>Name</p>
                    <input onChange={(e) => setName(e.target.value)} value={name} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="text" required />
                </div>
            )}
            <div className="w-full ">
                <p>Email</p>
                <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="email" required />
            </div>
            <div className="w-full ">
                <p>Password</p>
                <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="password" required />
            </div>
            {state === "register" ? (
                <p>
                    Already have account? <span onClick={() => setState("login")} className="text-primary cursor-pointer">click here</span>
                </p>
            ) : (
                <p>
                    Create an account? <span onClick={() => setState("register")} className="text-primary cursor-pointer">click here</span>
                </p>
            )}
            <button  
            type='submit'
            disabled={loading}
            className={`bg-primary hover:bg-blue-800 transition-all text-white w-full py-2 rounded-md ${loading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}>
                {loading ? 'Loading...' : state === "register" ? "Create Account" : "Login"}
            </button>
        </form>
    </div>
  )
}

export default Login