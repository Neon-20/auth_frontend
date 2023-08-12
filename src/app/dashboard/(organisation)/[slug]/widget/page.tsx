'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { LanguageSwitcher } from './components/language-switcher';
import { WidgetPreview } from './components/widget-preview';
import WidgetBranding from './components/widget-branding';
import { RefObject, useEffect, useRef, useState } from 'react';
import { WidgetFooter } from './components/widget-footer';
import { WidgetCustom } from './components/widget-custom';
import { Consent } from './components/consent';
import { DevSettings } from './components/dev-settings';
import { updateStoreWithFetch, useWidgetStore } from './widgetStore';
import { WidgetBrandingRef } from './components/widget-branding';
import { WIDGET_TABS as TABS } from '@/constants';
import { useAuth } from '@/Providers/AuthContext';
import { useParams } from 'next/navigation';
import { EmailSettings } from './components/email-settings';

const WidgetSettings = () => {
  const { token } = useAuth();
  const brandingRef: RefObject<WidgetBrandingRef> = useRef(null);
  const [tab, setTab] = useState(TABS.branding);
  const { slug } = useParams();

  useEffect(() => {
    if (token) updateStoreWithFetch(token, slug);
  }, []);

  const {
    logoImage,
    logo,
    setLogoImage,
    resetBranding,
    resetCustomisation,
    resetConsent,
    resetDevSettings,
    widgetBgColor,
    widgetBoxRadius,
    widgetBorderWidth,
    widgetBorderColor,
    widgetColor
  } = useWidgetStore();

  useEffect(() => {
    if (logo) {
      setLogoImage(URL.createObjectURL(logo));
    }

    if (!logo) {
      setLogoImage(logoImage);
    }
  }, [logo]);

  //Update box shadow as per background color dynamically
  function calculateDynamicDropShadow(backgroundHex: string) {
    const shadowOpacity = 0.3;
    const shadowSpread = '0.2rem';

    const rgb = hexToRgb(backgroundHex);

    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    const shadowColor =
      luminance > 0.5
        ? `rgba(0, 0, 0, ${shadowOpacity})`
        : `rgba(255, 255, 255, ${shadowOpacity})`;

    const boxShadow = `0px 0px 20px ${shadowSpread} ${shadowColor}`;
    return {
      boxShadow
    };
  }

  function hexToRgb(hex: string) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
  }

  const handleReset = () => {
    switch (tab) {
      case TABS.branding:
        if (brandingRef.current) {
          brandingRef.current.clearDisplayNameAndGreetings();
        }
        resetBranding();
        return;
      case TABS.consent:
        return resetConsent();
      case TABS.customization:
        return resetCustomisation();
      case TABS.dev_settings:
        return resetDevSettings();
      default:
        return;
    }
  };

  return (
    <div className="flex-1 space-y-4 p-6 pt-14 max-w-7xl mx-auto ">
      <Tabs
        defaultValue={TABS.branding}
        className="space-y-4"
        onValueChange={e => setTab(e)}
      >
        <div className="flex flex-wrap gap-3 justify-between ">
          <TabsList className="bg-gray-100 flex-wrap h-full">
            <TabsTrigger
              value={TABS.branding}
              className="px-8 text-disabled data-[state=active]:text-black data-[state=active]:border data-[state=active]:border-slate-400 data-[state=active]:bg-white"
            >
              Branding
            </TabsTrigger>
            <TabsTrigger
              value={TABS.customization}
              className="px-8 text-disabled data-[state=active]:text-black data-[state=active]:border data-[state=active]:border-slate-400 data-[state=active]:bg-white"
            >
              Customization
            </TabsTrigger>
            <TabsTrigger
              value={TABS.consent}
              className="px-8 text-disabled data-[state=active]:text-black data-[state=active]:border data-[state=active]:border-slate-400 data-[state=active]:bg-white"
            >
              Consent
            </TabsTrigger>
            <TabsTrigger
              value={TABS.dev_settings}
              className="px-8 text-disabled data-[state=active]:text-black data-[state=active]:border data-[state=active]:border-slate-400 data-[state=active]:bg-white"
            >
              Dev Settings
            </TabsTrigger>
            <TabsTrigger
              value={TABS.email_settings}
              className="px-8 text-disabled data-[state=active]:text-black data-[state=active]:border data-[state=active]:border-slate-400 data-[state=active]:bg-white"
            >
              Email Settings
            </TabsTrigger>
          </TabsList>
          <LanguageSwitcher />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <TabsContent
            value={TABS.branding}
            className="mt-0 space-y-4 col-span-1 lg:col-span-4"
          >
            <Card className="shadow-none">
              <CardContent className="p-10 space-y-7">
                <WidgetBranding ref={brandingRef} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent
            value={TABS.customization}
            className="mt-0 space-y-4 col-span-1 lg:col-span-4"
          >
            <Card className="shadow-none">
              <CardContent className="p-10 space-y-7">
                <WidgetCustom />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent
            value={TABS.consent}
            className="mt-0 space-y-4 col-span-1 lg:col-span-4"
          >
            <Card className="shadow-none min-h-[36rem]">
              <CardContent className="p-10">
                <Consent />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent
            value={TABS.dev_settings}
            className="mt-0 space-y-4 col-span-1 lg:col-span-4"
          >
            <Card className="shadow-none min-h-[36rem]">
              <CardContent className="p-10">
                <DevSettings />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent
            value={TABS.email_settings}
            className="mt-0 space-y-4 col-span-1 lg:col-span-4"
          >
            <Card className="shadow-none min-h-[36rem]">
              <CardContent className="p-10">
                <EmailSettings />
              </CardContent>
            </Card>
          </TabsContent>

          <Card
            style={{
              backgroundColor: widgetBgColor.hex
            }}
            className="col-span-1 lg:col-span-3 bg-[#EEF5F1] shadow-none grid place-content-center"
          >
            <CardContent
              style={{
                borderRadius: Number(widgetBoxRadius),
                borderWidth: Number(widgetBorderWidth),
                borderColor: widgetBorderColor.hex,
                backgroundColor: widgetColor.hex,
                ...calculateDynamicDropShadow(widgetBgColor.hex)
              }}
              className="p-10 bg-primary m-4 rounded-lg"
            >
              <WidgetPreview />
            </CardContent>
          </Card>
        </div>
        <WidgetFooter reset={handleReset} />
      </Tabs>
    </div>
  );
};

export default WidgetSettings;
