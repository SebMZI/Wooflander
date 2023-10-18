import { selectCurrentId } from "@/features/auth/authSlice";
import {
  useGetUserProfileQuery,
  usePutUserProfileMutation,
} from "@/features/user/userApiSlice";
import { selectCurrentUserInfo, setUserInfo } from "@/features/user/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserProfile = () => {
  const userId = useSelector(selectCurrentId);
  const dispatch = useDispatch();
  const { data: userInfo } = useGetUserProfileQuery(userId);
  const [putUserProfile] = usePutUserProfileMutation();
  useEffect(() => {
    if (userInfo) {
      dispatch(setUserInfo(userInfo));
    }
  }, [userInfo]);

  const infos = useSelector(selectCurrentUserInfo);

  const [isModifying, setIsModifying] = useState(false);

  const [email, setEmail] = useState();
  const [tel, setTel] = useState();
  const [username, setUsername] = useState();

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!userId) {
      return;
    }
    console.log("Username: ", username);
    try {
      const update = await putUserProfile({ userId, username, tel, email });
      console.log(update);
      setIsModifying(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="user-profile">
      {isModifying ? (
        <div className="btn-container">
          <button
            className="btn btn-solid"
            onClick={() => setIsModifying(false)}
          >
            Cancel
          </button>
          <button className="btn btn-light" onClick={(e) => handleUpdate(e)}>
            Validate
          </button>
        </div>
      ) : (
        <button className="btn btn-solid" onClick={() => setIsModifying(true)}>
          Modify
        </button>
      )}
      <form className="client-profile">
        <div className="profile-container">
          <div className="profile-content">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" defaultValue={infos?.name} disabled />
          </div>
          <div className="profile-content">
            <label htmlFor="lastname">Lastname</label>
            <input
              type="text"
              id="lastname"
              defaultValue={infos?.lastname}
              disabled
            />
          </div>
          <div className="profile-content">
            <label htmlFor="tel">Tel</label>
            {isModifying ? (
              <input
                type="tel"
                id="tel"
                defaultValue={infos?.tel}
                onChange={(e) => setTel(e.target.value)}
              />
            ) : (
              <input type="tel" id="tel" defaultValue={infos?.tel} disabled />
            )}
          </div>
        </div>
        <div className="profile-container">
          <div className="profile-content">
            <label htmlFor="username">Username</label>
            {isModifying ? (
              <input
                type="text"
                id="username"
                defaultValue={infos?.username}
                onChange={(e) => setUsername(e.target.value)}
              />
            ) : (
              <input
                type="text"
                id="username"
                defaultValue={infos?.username}
                disabled
              />
            )}
          </div>
          <div className="profile-content">
            <label htmlFor="email">Email</label>
            {isModifying ? (
              <input
                type="text"
                id="email"
                defaultValue={infos?.email}
                onChange={(e) => setEmail(e.target.value)}
              />
            ) : (
              <input
                type="text"
                id="email"
                defaultValue={infos?.email}
                disabled
              />
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
