import type { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";

import Flow from "components/Flow";
import { ReactFlowProvider } from "react-flow-renderer";
import Sidebar from "components/Sidebar";
import { Toaster } from "@/components/ui/toaster"
import { Toaster as ToasterSonner } from "@/components/ui/sonner"

import { Node } from "reactflow";

const Home: NextPage = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Run this effect once on mount
    const handleResize = () => {
      // Consider "mobile" if width is less than or equal to 768 pixels
      setIsMobile(window.innerWidth <= 768);
    };

    // Check once on mount
    handleResize();

    // Optionally listen for resize events if you want to dynamically change the view
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <div className="flex flex-col h-screen">
      <Head>
      <title>Mugen Craft</title>
        <meta property='og:title' content='Mugen Craft - Generate infinite recipe and earn points' />
        <meta
          property='og:description'
          content='Mugen Craft  is a Fully on chain UGC game you can create new recipes by mixing recipes with recipes.'
        />
        <meta property='og:image' content='/ogp.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
        <link rel='apple-touch-icon' sizes='200x200' href='/apple-touch-icon.png' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content='Mugen Craft - Generate infinite recipe and earn points' />
        <meta
          name='twitter:description'
          content='Mugen Craft  is a Fully on chain UGC game you can create new recipes by mixing recipes with recipes.'
        />
        <meta
          name='twitter:image'
          content='https://mugencraft.vercel.app/ogp.png'
        />
      </Head>
      <div className="flex flex-grow">
        <ReactFlowProvider>
        {!isMobile ? (
            <Flow />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span>Unavailable on mobile</span>
            </div>
          )}
          <Toaster />
        </ReactFlowProvider>
        <ToasterSonner position="top-center" />
      </div>
    </div>
  );
};

export default Home;
