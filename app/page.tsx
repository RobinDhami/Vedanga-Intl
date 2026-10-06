import React, { lazy, Suspense } from 'react';

const GalleryDisplay = lazy(() => import('@/components/GalleryDisplay'));
const Hero = lazy(() => import('@/components/Hero'));
const Info = lazy(() => import('@/components/Info'));
const LatestEvents = lazy(() => import('@/components/LatestEvents'));
const LatestUpdates = lazy(() => import('@/components/LatestUpdates'));
const MapSection = lazy(() => import('@/components/MapSection'));
const Principal = lazy(() => import('@/components/Principal'));
const VideoSection = lazy(() => import('@/components/VideoSection'));

export default function Home() {
  return (
    <main>
      <Suspense fallback={<div className='flex justify-center items-center h-screen'>Loading...</div>}>
        <Hero />
        <Info />
        <Principal />
        <GalleryDisplay />
        <LatestEvents />
        <LatestUpdates />
        <VideoSection />
        <MapSection />
      </Suspense>
    </main>
  );
}
