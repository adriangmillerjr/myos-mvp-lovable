import React from 'react';

export const OrbitalInterface = () => {
  return (
    <div className="relative w-64 h-64 mx-auto">
      {/* Central core */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-full animate-pulse"></div>
      
      {/* Orbit ring 1 */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-primary/30 rounded-full animate-spin-slow">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-primary/70 rounded-full"></div>
      </div>
      
      {/* Orbit ring 2 */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-primary/20 rounded-full animate-reverse-spin">
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-primary/80 rounded-full"></div>
        <div className="absolute right-3 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-primary/60 rounded-full"></div>
        <div className="absolute left-3 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-primary/60 rounded-full"></div>
      </div>
      
      {/* Orbit ring 3 */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-primary/10 rounded-full animate-spin-slow-2">
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-primary/40 rounded-full"></div>
        <div className="absolute top-1/2 right-2 transform translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-primary/40 rounded-full"></div>
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-1 h-1 bg-primary/40 rounded-full"></div>
        <div className="absolute top-1/2 left-2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-primary/40 rounded-full"></div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute top-8 left-12 w-0.5 h-0.5 bg-primary/60 rounded-full animate-float"></div>
      <div className="absolute top-16 right-8 w-0.5 h-0.5 bg-primary/40 rounded-full animate-float-delay"></div>
      <div className="absolute bottom-12 left-8 w-0.5 h-0.5 bg-primary/50 rounded-full animate-float-2"></div>
      <div className="absolute bottom-8 right-16 w-0.5 h-0.5 bg-primary/40 rounded-full animate-float-delay-2"></div>
    </div>
  );
};