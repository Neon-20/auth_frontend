import CryptoJS from 'crypto-js';
export const getAccessToken = (code: string): string => {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    // split the cookie into name and value
    const [key, value] = cookie.split('=');
    // if the key matches code, return the value
    if (key.trim() === code) {
      console.log(value);
      return value;
    }
  }
  return 'could not get Access_token';
};
// export const decryptToken = (token: string): string => {
//   const bytes = CryptoJS.AES.decrypt(token, 'asjdhkasjdh');
//   const decoded = bytes.toString(CryptoJS.enc.Utf8);
//   return decoded;
// };

//https://app.trustauthx.com/widget/profile?org_id=c3621ed40ccc4fca955779fab8f776c921e8865e439211ee88069dc8f7663e88&code=274e1877a97d45ddaa7b6809b8867dfb&redirect_url=http://127.0.0.1:3535/re-auth&ac=U2FsdGVkX18DhKDTJ8Mr4y0Ih8vP+6Fhem8S2f57CgXX6SPaUc7v3CPV9ezyHyCYrx4p+G6stCNiJQSfLTOHRfbsU70J+D2OV3oBvr+Jf5AIWYEkBBtCVGL6L3ngs1d1mT08FezPZv+FNLte2Ccko3CMCYQ74EJFbLAZZasS1E2HBjB+RncOBVP0jiexICTOgwHcBAhocq1ufWjyU7MIjw/FQvEArlTGxuqU3FJiILAcJ1gc85xaMA01c8SR+vH5x7KIBtUq0v5AjjbbL0OGjqzw4R7gT9eW/of2IisUu99mX4Uan/mr8dwj9GByS6ECnYXIvg0h31sUqhfoB72szAwgulyneVI2QQCEm0g4bZ1IFrw9uqKOq5vSmX2ZZU1CDFS5ReaOHymil9ljM/ZeKQn35RAfUc5BXtXj6G3US2T04IGHOMmFZIPPTMJWrH9TP0CTg6i/0iqSiA6rHr3QYvGSVnsaOFIAtOMg1e3QRuSRaPOWcCoRAZEOly1dUQS9xa0nJCGC1o0/FWsarVVLKZmgf5YCLqr9B6UTIUNDZ6ecOhSDVNZNWJsKWKSYqgdGXbvt+r0/CmkHXIN06DpAOW4eIe2rN8A+UDuIOEgCH4IAYxoshx5iEPfjK9QrhqspbLFn/FxGWBP6wIJ3w9DKfPqJq65ZQVzIgBEZxw2Ufb7V4BvBkDpseFOeAlNxs56oJWesp4LoEqn9FTS7K28CsF4GgJYeGFkc1iIVPNDD5rV62OoKUAoAMN0en9CqogT14B9cghBAR0Opkl5KpXxPdggdbP1mgTBEpmRa7bla5OoYhRHOZNDGorYDM0TnWz9ZwIU6w34aEN3sqCC168+a35C7Zm6sxkdsImoXOnLnYUVf3g6+vDfIvUkrzwOYR9aPOwBlktQib0Cn3EdWKr9efAwW0t73hoV0OLyzeWScHAuJkN+qngk2HCpRXbblY8ag/0kTbOaw551eLlACd+1fBCndn538L4SxxXIVGEx4hu++Fm8UB1P3KCTufbfhd9Tg3lcGmrgOVJsVMYIvBfkflS0bMyL6vVBerS2HADflDJ/d5mIrBNBJTe37XPQBoceTe88PLoSlZtCtAT6q3yjOG9/Tg4g1L6viUSsfGl+Lv7o5kSt5pBokHXUI0vmrTT8FLCt7RjGLgkjVgnYMwKDtEPA+T33g1fDwP+BDkJqQN9o+dPtElF68Hej8d2B39EgaI7+GKOh78fC0+8ATtLZ1+H9G5uQPKkFqXZTs9euA7O+vU7ts2gCR+3ZEz/vjtGsNTakbRe7nAtV2r6Qacbr57e6BnMfX4bgiR+Jx0ygwDVUZWr2Q+SWVeBDx3dbiaialzg1KIJRdbcG3fP/L/4RAfg==

//http://localhost:3000/widget/profile?org_id=c3621ed40ccc4fca955779fab8f776c921e8865e439211ee88069dc8f7663e88&code=503fe98b42e84471ae2fdd3ad8661263&redirect_url=http://127.0.0.1:3535/re-auth&ac=U2FsdGVkX18hg9urcJts4x5CmRWtfaOc+2ktZmBjcr8zrGtebcdaqkNXYX+RQh/ZSAHoyj6ryInQJLa6cYTCXTPbecsEcLfBmxtKvbn1ZqX/fCPR2rvyAPNzCmsaf3rTOm4eSo4N1ntGaXNKwq7X6DHIgBdmy5bBIiMtPvUleQCrm9StmSwcFcgi3sy1DEY8bdPOiOH9PxAvpmEeeDFwFHLobp9/LG3SlMFLaWqtwYTyzK3DrVxdsQ9ze2HXanm2XZQNDfJQTWkKSuP8kaZKDbNoHXVEJch2qE8tTcheDO9LR2rLq0UbT3jrpVuqk13vNxVhhkKJDRwi3YWPZcMunQIuIS4boo6TKLbmv6MLeMtaw5E2YYIGtv/4Ps4l9Ixk1Q7ZJSFh7kE6JoeGlijaXoJMg81cT3KYfitJ27EpbD0OAJsp1ZXOb4f87nwOFO6n7OWhCxRVI+aX2Dt7mkA9vVC4pAtQiN/7KREjzvNuqf01VyrnGFTJLngH6bEpysQFnX7hwcyifocZUd30riSXBg6TkKA8wImdQJmcwkq3y6ezlroiOjt1j28zfQOgfV07Gs/fxefHeGQVscf03d3JtH5aWQUcXI07vik5rDWKXIAzGwW04+H24RWnPsJhvNIQnE6YcDZp6Q1PBqHRjQSdwUS9bFJoAUeo72LFMSqiJLXWCN5bAx4joTHnFq8WSx8+9WqbGsqpoduwWOBGiUjrKt35M2yUMdeCy2qfQktpGBmKToihC7MCcwnK/HdP6iKZt+JTEotROKQfFpkoCmymnXL8Z9ul4PfyeJhQhKzQDc3SEjxLxm1A+9ZPBsGXYlCkILZVRxh4FkLUcsee9vuk/tLkCuvVNNzymr7dvh7AJpSHAn5Btc5gwRhI9JxiXBCKOGbM6SMzc4e4jZrTcJBgo/OGaI2GO+2jdKIixtrDnd90NUIs6cxcbRI28fR32B9TdcymTtGwTBK6QiKFoglH6rDP54fUrBqqh9PfJvQuWkAfrs4arMTHZ1ObLWUp78g/TLI0twISunUqn2fSpRmVsglUQil8qVdGKFhbC9yzn4Q5/7n18Mcnh/h1V+r5c8gxQUgBkHBlYWoIX5Umsfbb+A+jMGzAHX16IFJM45f4svT8+/ldkxO8dVy2g3xvR5iDjKbkd0l715AdpQY48QTa9AJUshJxQm6PJHQCGSk5ONGYG3LoXMhvQLOh0WNFKUdxSXAy7dixE86Z99j6W4c4O+V5m1+4ivytPDZvaajJCLQr+zIftU161bYy462JU3xigIFbMAQVRUt4XdXY06K2q/H1a4U9yUSCbSpfokHNA8JSiP7uqMolKi0W6jsoM2Momqvi2qN/4YbvUFqCGz11/w==
