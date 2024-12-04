import { Routes, Route, NavLink } from 'react-router-dom';
import NumberOne from './pages/NumberOne';
import NumberTwo from './pages/NumberTwo';
import NumberThree from './pages/NumberThree';

const App = () => {
    return (
        <div className="flex min-h-screen">
            <header className="bg-gradient-to-b from-purple-500 via-blue-500 to-green-500 shadow-lg w-64 p-6">
                <ul className="flex flex-col space-y-4 text-white text-lg font-medium">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `transition-transform transform  hover:scale-105 hover:text-yellow-300 
                            }`
                        }
                    >
                        Valyuta
                    </NavLink>
                    <NavLink
                        to="/NumberTwo"
                        className={({ isActive }) =>
                            ` transition-transform transform  hover:scale-105 hover:text-yellow-300   ''
                            }`
                        }
                    >
                        GitHub
                    </NavLink>
                    <NavLink
                        to="/NumberThree"
                        className={({ isActive }) =>
                            `transition-transform transform hover:scale-105 hover:text-yellow-300 ''
                            }`
                        }
                    >
                        Kutubxona
                    </NavLink>
                </ul>
            </header>

            <main className="flex-1 bg-gray-100 p-10">
                <Routes>
                    <Route path="/" element={<NumberOne />} />
                    <Route path="/NumberTwo" element={<NumberTwo />} />
                    <Route path="/NumberThree" element={<NumberThree />} />
                </Routes>
            </main>
        </div>
    );
};

export default App;
