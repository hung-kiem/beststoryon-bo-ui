"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface Response {
  label: string | number;
  value: string | number;
}

export interface ApiResponse {
  channels: Array<Response>;
  roles: Array<Response>;
  roleActives: Array<Response>;
  roleStatus: Array<Response>;
  userStatus: Array<Response>;
  userEvents: Array<Response>;
  localUserStatus: Array<Response>;
  localUserEvents: Array<Response>;
  otpTypes: Array<Response>;
  otpFunctions: Array<Response>;
  smsStatus: Array<Response>;
  emailStatus: Array<Response>;
}

interface State extends ApiResponse {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const initialState: State = {
  channels: [],
  roles: [],
  roleActives: [],
  roleStatus: [],
  userStatus: [],
  userEvents: [],
  localUserStatus: [],
  localUserEvents: [],
  otpTypes: [],
  otpFunctions: [],
  smsStatus: [],
  emailStatus: [],
  loading: false,
  setLoading: () => {},
};

const Context = createContext<State>(initialState);

function StaticProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState<boolean>(false);
  const value = { ...initialState, loading, setLoading };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

function useStatic() {
  const context = useContext(Context);
  if (!context) throw Error("useStatic must be used inside StaticProvider");
  return context;
}

export default StaticProvider;
export { useStatic };
