import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useAppDispatch } from "./storeHelpers";
import { loginUser, logoutUser } from "../core/store/auth/actions";
import { getCookie, removeCookie, setCookie } from "../utils/cookie";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { signIn } from "../core/api/services/auth";
import { getEmployee } from "../core/api";
import { IAuth } from "../core/store/auth/reducer";

type TDecodedToken = {
    username: string;
    exp: number;
};

const useAuth = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [loginLoading, setLoginLoading] = useState(false);

    useEffect(() => {
        const isLoggedIn = async () => {
            const accessToken = getCookie("accessToken");
            if (accessToken) {
                const decodedToken: TDecodedToken = jwtDecode(accessToken);
                const currentTime = Math.floor(Date.now() / 1000);

                //check if token expired
                if (decodedToken.exp && decodedToken.exp <= currentTime) {
                    logout();
                } else {
                    const userID = Number(decodedToken.username);
                    if (!isNaN(userID) && typeof userID === "number") {
                        await fetchUserDetails(userID);
                    } else
                        dispatch(
                            loginUser({ userName: decodedToken.username })
                        );
                }
            }
        };
        isLoggedIn();
    }, []);

    const fetchUserDetails = async (userID: number) => {
        try {
            const userResponse = await getEmployee(userID);
            if (userResponse) {
                const user = userResponse.data.data;
                const moreDetails = JSON.parse(user.moreDetails);

                const userDetails: IAuth = {
                    userID: userID,
                    userName: user.firstName,
                    imageURL: moreDetails?.photoId ?? "",
                    isAdmin: moreDetails?.isAdmin ?? false,
                };
                dispatch(loginUser(userDetails));
            }
        } catch (error) {
            throw new Error("Employee not found");
        }
    };

    const login = async (username: string, password: string) => {
        setLoginLoading(true);
        try {
            const authResponse = await signIn({
                username,
                password,
            });
            if (authResponse) {
                const accessToken = authResponse.data.access_token;
                const refreshToken = authResponse.data.refresh_token;
                setCookie("accessToken", accessToken);
                setCookie("refreshToken", refreshToken);

                const userID = Number(username);
                if (!isNaN(userID) && typeof userID === "number") {
                    await fetchUserDetails(userID);
                } else dispatch(loginUser({ userName: username }));

                toast.success("Welcome. You are succesfully logged in.");
                navigate("/");
                setLoginLoading(false);
            }
        } catch (error: any) {
            if (error.status === 401) {
                toast.error("Invalid Username or Password");
            } else {
                toast.error("Could not login. Please try again");
            }
            console.log(error);
            logout();
            setLoginLoading(false);
        }
    };

    const logout = () => {
        removeCookie("accessToken");
        removeCookie("refreshToken");
        dispatch(logoutUser());
    };

    return { login, logout, loginLoading };
};

export default useAuth;