import "../styles/style.css";
import "../styles/responsive.css";
import "../styles/bootstrap.min.css";
import "../styles/animate.min.css";
import "../styles/boxicons.min.css";
import "../styles/meanmenu.min.css";
import "../styles/flaticon.css";
import Layout from "../components/Layout/Layout";
import { Provider } from 'react-redux';
import store from '../redux/store'; // Import the Redux store

const MyApp = ({ Component, pageProps }) => {
	return (
		<Provider store={store}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	);
};

export default MyApp;
