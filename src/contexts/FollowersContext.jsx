import { createContext, useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchFollowers, fetchFollowings } from "../../store/userSlice";
import axios from "axios";


export const FollowersContext = createContext();

export const FollowersProvider = ({ children }) => {
    const {following,followers:followersRedux}=useSelector((state)=>state.user.social);
    const [followers, setFollowers] = useState({
        data: [],
        total: 0,
        hasMore: true,
    });
    const [followings, setFollowings] = useState({
        data: [],
        total: 0,
        hasMore: true,
    });
    const dispatch = useDispatch();
    const { uid } = useParams();
    const [page, setPage] = useState(1);
    const [type, setType] = useState('followers');

    const limit = 10;
    const fetchFollowersURL = `https://dharanas-backend-deployment.onrender.com/user/showFollowers/${uid}?page=${page}&limit=${limit}`;

    const fetchFollowingsURL = `https://dharanas-backend-deployment.onrender.com/user/showFollowings/${uid}?page=${page}&limit=${limit}`;

    const getFollowListType = (type) => {
        setType(type);
        console.log('type of followee in context',type);
    }
  
    
    //get followers and following of the user when uid given, if uid isnt given fetch loginned user's followers and followings
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
                setFollowers((prev) => ({ ...prev, data: followersData.data, total: followersData.total_followers || 0, hasMore:followersData.data.length==limit, }));
                setFollowings((prev) => ({ ...prev, data: followingsData.data, total: followingsData.total_followings || 0, hasMore:followingsData.data.length==limit, }));

            } else {
                if(following.pagination.hasMore && type==='followers'){
                    dispatch(fetchFollowings());
                } 
                if(followersRedux.pagination.hasMore && type==='following'){
                    dispatch(fetchFollowers());
                }
            }
        } catch (err) {
            console.error("An error occurred fetching followers and following ", err);
        }
    }
    const incrementPage = () => {
        if (uid) {
            setPage(prev => prev + 1);
            fetchData()
        } else {
            type === 'followers' ?
                (dispatch(incrementFollowersPage)) :
                (dispatch(incrementFollowingsPage));
        }
    }
    return (
        <FollowersContext.Provider value={{ followers, followings, fetchData, incrementPage, getFollowListType, type, page }}>
            {children}
        </FollowersContext.Provider>
    )
}

export const useFollowers = () => {
    return useContext(FollowersContext);
}