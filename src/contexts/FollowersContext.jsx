import { createContext, useContext, useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchFollowers, fetchFollowings } from "../../store/userSlice";
import axios from "axios";


export const FollowersContext = createContext();

export const FollowersProvider = ({ children }) => {
    const [followers, setFollowers] = useState({
        data: [],
        total: 0,
    });
    const [followings, setFollowings] = useState({
        data: [],
        total: 0,
    });
    const dispatch = useDispatch();
    const { uid } = useParams();
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [type, setType] = useState('followers');

    const limit = 10;
    const fetchFollowersURL = `http://localhost:3000/user/showFollowers/${uid}?page=${page}&limit=${limit}`;

    const fetchFollowingsURL = `http://localhost:3000/user/showFollowings/${uid}?page=${page}&limit=${limit}`;

    const incrementPage = () => {
        if (uid) {
            setPage(prev => prev + 1);
        } else {
            type === 'followers' ?
                (dispatch(incrementFollowersPage)) :
                (dispatch(incrementFollowingsPage));
        }
    }

    const fetchData = async () => {
        try {

            const token = localStorage.getItem('token');
            if (uid) {

                const [followersRes, followingRes] = await Promise.all([
                    axios.get(fetchFollowersURL,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }),
                    axios.get(fetchFollowingsURL,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        })
                ]);
                const followersData = followersRes.data;
                const followingsData = followingRes.data;
                console.log('followers response: ', followersRes);
                console.log('following response: ', followingRes);
                setFollowers((prev) => ({ ...prev, data: followersData.data, total: followersData.total_followers || 0 }));
                setFollowings((prev) => ({ ...prev, data: followingsData.data, total: followingsData.total_followings || 0 }));

            } else {
                dispatch(fetchFollowings());
                dispatch(fetchFollowers());
            }
        } catch (err) {
            console.error("An error occurred fetching followers and following ", err);
        }
    }

    return (
        <FollowersContext.Provider value={{ followers, followings, fetchData, incrementPage, hasMore, setType }}>
            {children}
        </FollowersContext.Provider>
    )
}

export const useFollowers = () => {
    return useContext(FollowersContext);
}