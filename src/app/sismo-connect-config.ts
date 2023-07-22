import {
  ClaimType,
  AuthType,
  SignatureRequest,
  AuthRequest,
  ClaimRequest,
  SismoConnectConfig,
} from "@sismo-core/sismo-connect-client";

const SISMO_APP_ID = process.env.SISMO_APP_ID || '0xfcb13ca1822f6b782f816c8c8e6c631e';

export { ClaimType, AuthType };
export const CONFIG: SismoConnectConfig = {
  appId: SISMO_APP_ID,
  vault: {
    // For development purposes insert the Data Sources that you want to impersonate
    // Never use this in production
    impersonate: [
      // EVM Data Sources
      // "0xA4C94A6091545e40fc9c3E0982AEc8942E282F38",
      // "0x1b9424ed517f7700e7368e34a9743295a225d889",
      // "0x82fbed074f62386ed43bb816f748e8817bf46ff7",
      // "0xc281bd4db5bf94f02a8525dca954db3895685700",

      // Telegram Data Source
      // "telegram:dhadrien",
    ],
  },
  // displayRawResponse: true, // this enables you to get access directly to the
  // Sismo Connect Response in the vault instead of redirecting back to the app
};

// Request users to prove ownership of a Data Source (Wallet, Twitter, Github, Telegram, etc.)
export const AUTHS: AuthRequest[] = [
  // Anonymous identifier of the vault for this app
  // vaultId = hash(vaultSecret, appId).
  // full docs: https://docs.sismo.io/sismo-docs/build-with-sismo-connect/technical-documentation/vault-and-proof-identifiers
  // { authType: AuthType.VAULT },
  { authType: AuthType.EVM_ACCOUNT },
  { authType: AuthType.GITHUB, isOptional: true, },
  { authType: AuthType.TWITTER, isOptional: true },
  // { authType: AuthType.TELEGRAM, userId: "875608110", isOptional: true },
];

// Request users to prove membership in a Data Group (e.g I own a wallet that is part of a DAO, owns an NFT, etc.)
export const CLAIMS: ClaimRequest[] = [
  {
    // claim Uni Token Holders
    groupId: "0x2ca1efd034c5d55cffab84a848625ef6", 
  },
  // {
  //   // claim on Baguette NFT holder Data Group membership:
  //   // value for each group member = number of NFT minted
  //   groupId: "0x5888b776af73c861523551fd7e4034e2",
  //   claimType: ClaimType.GTE,
  //   value: 1,
  //   isOptional: true,
  // },
];

// Request users to sign a message
export const SIGNATURE_REQUEST: SignatureRequest = {
  message: "I agree to govern with délégative!",
  isSelectableByUser: true,
};
