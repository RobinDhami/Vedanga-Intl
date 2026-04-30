import React, { lazy, Suspense } from 'react';

const GalleryDisplay = lazy(() => import('@/components/GalleryDisplay'));
const Hero = lazy(() => import('@/components/Hero'));
const Info = lazy(() => import('@/components/Info'));
const LatestEvents = lazy(() => import('@/components/LatestEvents'));
const LatestNews = lazy(() => import('@/components/LatestNews'));
const MapSection = lazy(() => import('@/components/MapSection'));
const Principal = lazy(() => import('@/components/Principal'));
const Team = lazy(() => import('@/components/Team'));
const VideoSection = lazy(() => import('@/components/VideoSection'));

export default function Home() {
  return (
    <main>
      <Suspense fallback={<div className='flex justify-center items-center h-screen'>Loading...</div>}>
        <Hero />
        <Info />
        <Team />
        <Principal />
        <GalleryDisplay />
        <LatestEvents />
        <LatestNews />
        <VideoSection />
        <MapSection />
      </Suspense>
    </main>
  );
}
