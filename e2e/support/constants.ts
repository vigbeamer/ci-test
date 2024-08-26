export const MAILINATOR_DOMAIN = "team769733.testinator.com";
export const MAILINATOR_TOKEN =
  process.env.MAILINATOR_TOKEN || "63b8f61c2efd49e6a012b2d585b190d6";
export const USERFLOW_LOCAL = "https://userflow.local:4040";
export const USERFLOW_STAGING = "https://app.userflowtoolz.com";
export const TINYTIME_LOCAL = "https://tinytime.userflow.local:4040";
export const TINYTIME_STAGING = "https://tinytime.userflowtoolz.com";
export const USERFLOW_BASE_URL = process.env.IS_DEV
  ? USERFLOW_LOCAL
  : USERFLOW_STAGING;
export const TINYTIME_BASE_URL = process.env.IS_DEV
  ? TINYTIME_LOCAL
  : TINYTIME_STAGING;
export const SIGNIN_ROUTE = `${USERFLOW_BASE_URL}/app/signin`;
export const CREATE_ACCOUNT_ROUTE = `${USERFLOW_BASE_URL}/app/create-account`;
export const MAILBOX_ROUTE = `${USERFLOW_BASE_URL}/dev/mailbox`;
export const SIGNOUT_ROUTE = `${USERFLOW_BASE_URL}/app/signout`;
