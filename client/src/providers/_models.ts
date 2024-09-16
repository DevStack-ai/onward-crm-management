export interface AuthModel {
  token: string;
  refreshToken?: string;
}

export interface UserAddressModel {
  addressLine: string;
  city: string;
  state: string;
  postCode: string;
}

export interface UserCommunicationModel {
  email: boolean;
  sms: boolean;
  phone: boolean;
}

export interface UserEmailSettingsModel {
  emailNotification?: boolean;
  sendCopyToPersonalEmail?: boolean;
  activityRelatesEmail?: {
    youHaveNewNotifications?: boolean;
    youAreSentADirectMessage?: boolean;
    someoneAddsYouAsAsAConnection?: boolean;
    uponNewOrder?: boolean;
    newMembershipApproval?: boolean;
    memberRegistration?: boolean;
  };
  updatesFromKeenthemes?: {
    newsAboutKeenthemesProductsAndFeatureUpdates?: boolean;
    tipsOnGettingMoreOutOfKeen?: boolean;
    thingsYouMissedSindeYouLastLoggedIntoKeen?: boolean;
    newsAboutStartOnPartnerProductsAndOtherServices?: boolean;
    tipsOnStartBusinessProducts?: boolean;
  };
}

export interface UserSocialNetworksModel {
  linkedIn: string;
  facebook: string;
  twitter: string;
  instagram: string;
}
export interface BasicTableState {
  dataList: Array<{}>;
  page: number;
  itemsPerPage: number;
  total: number;
  pages: number;
  filters: Object;
  isFirstTime: boolean;
  isCreating: boolean;
}
export interface ReduxState {
  [key: string]: BasicTableState;
}
export interface UserModel {
  id: number;
  name: string;
  email: string;
  phone?: string;
  auth_profile_id: number;
  permissions?: UserCompanyModel[];
  currentCompany?: UserCompanyModel;
  language?: "es" | "en" | "de" | "fr" | "ja" | "zh" | "ru";

}

export interface UserCompanyModel {
  name: string;
  id: number;

}
