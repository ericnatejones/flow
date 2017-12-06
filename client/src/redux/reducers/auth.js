let isAuthenticated, isAdmin = false;
localStorage.token ? isAuthenticated = true: isAuthenticated = false;
localStorage.isAdmin ? isAdmin = true: isAdmin = false;

let defaultState = {
    isAuthenticated,
    isAdmin,
    loginError: "",
    signupError: "",
    user: {
        username: localStorage.username,
        name: localStorage.name
    }
};

const mainReducer = function (state = defaultState, action) {
    switch (action.type) {
        case "SET_DATA":
            return {
                ...state
            }
        case "LOGIN":
            localStorage.setItem("token", action.data.token);
            localStorage.setItem("username", action.data.user.username);
            localStorage.setItem("name", action.data.user.name);
            return {
                ...state,
                user: {
                    username: action.data.user.username,
                    name: action.data.user.name
                },
                isAuthenticated: true,
                isAdmin: action.data.user.admin,
                loginError: "",
                signupError: ""
            }
        case "LOGOUT":
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            localStorage.removeItem("name");

            return {
                ...state,
                user: {
                    username: ""
                },
                isAuthenticated: false,
                isAdmin: false
            }
        case "ERROR":
            return {
              ...state,
              [action.  errorType]: action.error
            }
        default:
            return {
                ...state
            }
    }
}

export default mainReducer;
