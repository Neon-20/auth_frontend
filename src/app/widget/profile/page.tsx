'use client';
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  useOrgData,
  OrgData,
  UserProfileData,
  useUserProfileData,
  useProfileStore,
  useSecurityStore,
  useToken
} from '../login/widgetStore';

import { ScrollArea } from '@/components/ui/scroll-area';
import { useSearchParams } from 'next/navigation';

import { useToast } from '@/components/ui/use-toast';
import SkeletonProfile from './profileSkeleton';
import Profile from './ProfileTab';
import Security from './SecurityTab';

//profile image
//username
//password
//mfa

export default function WidgetProfile() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const org_id = searchParams.get('org_id');
  const redirect_url = searchParams.get('redirect_url');

  const { set_user_token, user_token } = useToken();
  //to fetch the org token from the store
  //  const storeOrg_token = useOrgData(state => state.org_token);
  //to fetch the org data from the store
  //  const storeOrgData = useOrgData(state => state.data);
  //to set the org Data
  const setOrgData = useOrgData(state => state.setOrgData);
  const setUserData = useUserProfileData(state => state.setProfileData);
  const UserData = useUserProfileData(state => state.data);
  const { username, image, email, setUsername, setImage, setEmail } =
    useProfileStore();
  const { password, mfa, setPassword, setMfa } = useSecurityStore();
  const [loading1, setLoading1] = useState(true);

  const { toast } = useToast();

  useEffect(() => {
    fetchOrgDetails()
      .then(() => getUserToken())
      .then(userToken => getUserDetails(userToken))
      .then(() => setLoading1(false))
      .catch(error => {
        const errMsg = (error as Error).message;
        toast({
          title: 'Error!',
          description: `${errMsg}`,
          variant: 'destructive'
        });
        return;
      });
  }, []);
  useEffect(() => {
    console.log(user_token);
  }, [user_token]);

  async function fetchOrgDetails() {
    try {
      const response = await fetch(
        `https://api.trustauthx.com/settings/auth?org_id=${org_id}`,
        {
          method: 'GET'
        }
      );

      if (response.status === 406) {
        throw new Error('Some error occured with the request');
      }

      if (response.status === 200) {
        const orgData = (await response.json()) as OrgData;
        const { org_token, ...rest } = orgData;
        const data = rest.data;

        //store the org token and data from the response to the zustand store
        setOrgData(org_token, data);
        return;
      }
    } catch (error) {
      const errMsg = (error as Error).message;
      throw new Error(errMsg);
    }
  }

  const getAccessToken = (): string => {
    const cookies = document.cookie.split(';');
    let token = '';
    for (const cookie of cookies) {
      // split the cookie into name and value
      const [key, value] = cookie.split('=');
      // if the key matches code, return the value
      if (key === code) {
        token = value;
      }
    }
    return token;
  };

  async function getUserToken() {
    const token = getAccessToken();

    try {
      const response = await fetch(
        `https://api.trustauthx.com/user/me/get/user-token?code=${code}`,
        {
          method: 'GET',

          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
            Access_token: token
          }
        }
      );
      const data = (await response.json()) as string;
      set_user_token(data);
      return data;
    } catch (error) {
      console.log(error);
      const errMsg = (error as Error).message;
      throw new Error(errMsg);
    }
  }

  async function getUserDetails(userToken: string) {
    try {
      const response = await fetch(
        `https://api.trustauthx.com/user/me/auth/data?UserToken=${userToken}`,
        {
          method: 'GET',
          headers: {
            accept: 'application/json'
          }
        }
      );

      const userData = (await response.json()) as UserProfileData;

      setUsername(userData.data.partner.org_id.full_name);
      setImage(userData.data.partner.org_id.img);
      setEmail(userData.email);
      setPassword(userData.data.partner.org_id.password);
      setMfa(userData.data.partner.org_id.fa2);
      setUserData(userData);
      return;
    } catch (error) {
      const errMsg = (error as Error).message;
      console.log(error);
      throw new Error(errMsg);
    }
  }
  async function getUserData() {
    // console.log('user_token:', user_token);
    try {
      const response = await fetch(
        `https://api.trustauthx.com/user/me/auth/data?UserToken=${user_token}`,
        {
          method: 'GET',
          headers: {
            accept: 'application/json'
          }
        }
      );

      const userData = (await response.json()) as UserProfileData;

      setUsername(userData.data.partner.org_id.full_name);
      setImage(userData.data.partner.org_id.img);
      setEmail(userData.email);
      setPassword(userData.data.partner.org_id.password);
      setMfa(userData.data.partner.org_id.fa2);
      setUserData(userData);
      return;
    } catch (error) {
      const errMsg = (error as Error).message;
      console.log(error);
      throw new Error(errMsg);
    }
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="h-fit min-h-[80vh] w-[90vw]  md:w-[80vw] lg:w-[70vw] border-2 border-slate-300 rounded-md text-center p-2">
        <div className="flex flex-col justify-center items-start pt-4 px-4">
          <h1 className="text-2xl font-medium">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Make changes to your account
          </p>
        </div>
        <Separator className="my-4" />
        <ScrollArea className="h-[70vh]">
          <Tabs
            defaultValue="profile"
            className="w-full flex flex-col sm:flex-row sm:h-full"
          >
            <TabsList className="bg-transparent flex flex-row sm:flex-col justify-start items-start h-10 sm:h-full sm:w-1/5 sm:pr-4 ">
              <TabsTrigger
                value="profile"
                className="w-1/2 sm:w-full flex justify-start py-2  data-[state=active]:bg-slate-100  sm:mb-4"
              >
                Profile
              </TabsTrigger>
              <TabsTrigger
                disabled={loading1}
                value="security"
                className="w-1/2 sm:w-full flex justify-start py-2  data-[state=active]:bg-slate-100 "
              >
                Security
              </TabsTrigger>
            </TabsList>
            <TabsContent value="profile" className="sm:w-4/5">
              {loading1 ? <SkeletonProfile /> : <Profile />}
            </TabsContent>
            <TabsContent value="security" className="sm:w-4/5">
              <Security />
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </div>
    </div>
  );
}