import React, { useState, useEffect } from 'react';
import Login from './components/Login';

function App() {
	const [isLogged, setIsLogged] = useState(false);

	useEffect(() => {
		if (localStorage.getItem('userName')) {
			setIsLogged(true);
		}
	}, []);

	const loginHandler = (user) => {
		console.log(user);
		localStorage.setItem('userName', user);
		setIsLogged(true);
	};

	return (
		<>
			{!isLogged && <Login userLoginHandler={loginHandler} />}
			{isLogged && <p>aplikacja po zalogowaniu</p>}
		</>
	);
}

export default App;
