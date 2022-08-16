
import {useEffect,useState,createContext,useContext} from 'react'
import { useColorScheme } from 'react-native';
export const GlobalStyle = {
	userProfileSize: 40,
	iconSize: 26,
	contactProfileSize: 50,
	highlightcolor: '#4CDBFF',
	pinklightcolor: '#FF60C5',
	textTypes: {
		Title:{
			fontSize:30
		},
		H1: {
			fontSize:24,
			fontWeight:'bold',
		},
		H2: {
			fontSize:20,
			fontWeight: 'bold',
		},
		H3: {
			fontSize:16,
			fontWeight: 'bold',
		},		
	},
	defaultprofile: require('./assets/profilepicsquaresmall.png'),

	lightColors: {
		background: '#FFFFFF',
		backgroundalt:'#ebebeb',
		primary: '#512DA8',
		text: '#121212',
		textalt:'#414141',
		error: '#D32F2F',
	  },
	  
	  // Dark theme colors
	darkColors: {
		background: '#2e2e2e',
		backgroundalt:'#414141',
		primary: '#B39DDB',
		text: '#FFFFFF',
		textalt:'#cfcfcf',
		error: '#EF9A9A',
	  },
}

export const ThemeContext = createContext({
    isDark: false,
    colors: GlobalStyle.lightColors,
    setScheme: () => {},
});


export const ThemeProvider = (props) => {
    // Getting the device color theme, this will also work with react-native-web
    const colorScheme = useColorScheme(); // Can be dark | light | no-preference
	console.log("color scheme is" +colorScheme)
    /*
    * To enable changing the app theme dynamicly in the app (run-time)
    * we're gonna use useState so we can override the default device theme
    */
    const [isDark, setIsDark] = useState(colorScheme === "dark");

    // Listening to changes of device appearance while in run-time
    useEffect(() => {
        setIsDark(colorScheme === "dark");
    }, [colorScheme]);

    const defaultTheme = {
        isDark,
        // Chaning color schemes according to theme
        colors: isDark ? GlobalStyle.darkColors : GlobalStyle.lightColors,
        // Overrides the isDark value will cause re-render inside the context.  
        setScheme: (scheme) => setIsDark(scheme === "dark"),
    };

  return (
        <ThemeContext.Provider value={defaultTheme}>
            {props.children}
        </ThemeContext.Provider>
    );
};


export const useTheme = () => useContext(ThemeContext);