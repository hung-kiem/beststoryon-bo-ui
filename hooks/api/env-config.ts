const baseApi = (process.env.NEXT_PUBLIC_API_BASE as string) || '';

const staticApi = (baseApi + process.env.NEXT_PUBLIC_API_STATIC) as string;

const localUserApi = {
  list: (baseApi + process.env.NEXT_PUBLIC_API_LOCAL_USER_LIST) as string,
  create: (baseApi + process.env.NEXT_PUBLIC_API_LOCAL_USER_LIST) as string,
  update: (baseApi + process.env.NEXT_PUBLIC_API_LOCAL_USER_LIST) as string,
  detail: (baseApi + process.env.NEXT_PUBLIC_API_LOCAL_USER_DETAIL) as string,
  waitApproval: (baseApi + process.env.NEXT_PUBLIC_API_LOCAL_USER_WAIT_APPROVAL) as string,
  approval: (baseApi + process.env.NEXT_PUBLIC_API_LOCAL_USER_APPROVAL) as string,
  history: (baseApi + process.env.NEXT_PUBLIC_API_LOCAL_USER_HISTORY) as string,
};

const roleApi = {
  list: (baseApi + process.env.NEXT_PUBLIC_API_ROLE_LIST) as string,
};

const systemApi = {
  email: (baseApi + process.env.NEXT_PUBLIC_API_SYSTEM_EMAIL) as string,
  sms: (baseApi + process.env.NEXT_PUBLIC_API_SYSTEM_SMS) as string,
  otp: (baseApi + process.env.NEXT_PUBLIC_API_SYSTEM_OTP) as string,
};

const userApi = {
  list: (baseApi + process.env.NEXT_PUBLIC_API_USER_LIST) as string,
  detail: (baseApi + process.env.NEXT_PUBLIC_API_USER_DETAIL) as string,
  history: (baseApi + process.env.NEXT_PUBLIC_API_USER_HISTORY) as string,
};

const channelApi = {
  list: (baseApi + process.env.NEXT_PUBLIC_API_APP_LIST) as string,
  detail: (baseApi + process.env.NEXT_PUBLIC_API_APP_DETAIL) as string,
  lock: (baseApi + process.env.NEXT_PUBLIC_API_APP_LOCK) as string,
  unlock: (baseApi + process.env.NEXT_PUBLIC_API_APP_UNLOCK) as string,
  close: (baseApi + process.env.NEXT_PUBLIC_API_APP_CLOSE) as string,
};

export { staticApi, localUserApi, roleApi, systemApi, userApi, channelApi };
