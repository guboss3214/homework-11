"use client";
import { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store, AppDispatch, RootState } from "@/store/store";
import { getMyProfileInfo } from "@/store/slices/userSlice";

function AuthLogic({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const { token, profile } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (token && !profile) {
      dispatch(getMyProfileInfo());
    }
  }, [token, profile, dispatch]);

  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthLogic>{children}</AuthLogic>
    </Provider>
  );
}