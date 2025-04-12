"use client"
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
// import { Button } from '@/components/ui/button';
import { ArrowRight, Pencil, MousePointer, Image, Shapes } from 'lucide-react';

const Hero = () => {
  const constraintsRef = useRef(null);

  return (
    <section className="relative min-h-screen pt-28 overflow-hidden">
      {/* Background Patterns */}
      {/* <div className="absolute inset-0 -z-10 opacity-5">
        <div className="absolute top-0 left-0 right-0 h-full grid grid-cols-12 gap-4">
          {Array.from({ length: 12 * 24 }).map((_, i) => (
            <div key={i} className="canvas-dot bg-canvas-purple"></div>
          ))}
        </div>
      </div>
       */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
           
          </motion.div>
          
          {/* Interactive Canvas Preview */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative w-full aspect-square max-w-xl mx-auto"
            ref={constraintsRef}
          >
            <div className="absolute inset-0 bg-gradient-radial from-canvas-purple/20 to-transparent -z-10 animate-pulse-slow rounded-full blur-3xl"></div>
            
            <div className="relative bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-4 border border-gray-100 overflow-hidden h-full">
              <div className="absolute top-0 left-0 right-0 bg-gray-50 p-2 border-b flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="text-xs text-gray-500 mx-auto">Untitled Drawing - CanvasGlow</div>
              </div>
              
              <div className="pt-8 h-full relative">
                <div className="absolute inset-0 opacity-10 bg-grid-pattern"></div>
                
                <motion.div
                  drag
                  dragConstraints={constraintsRef}
                  whileTap={{ scale: 1.05 }}
                  className="absolute w-48 h-32 bg-canvas-purple/20 border-2 border-canvas-purple rounded-lg flex items-center justify-center left-20 top-20"
                >
                  <span className="font-medium text-canvas-purple">Drag me!</span>
                </motion.div>
                
                <motion.div
                  drag
                  dragConstraints={constraintsRef}
                  whileTap={{ scale: 1.05 }}
                  className="absolute w-40 h-40 bg-canvas-blue/20 border-2 border-canvas-blue rounded-full flex items-center justify-center right-20 top-40"
                >
                  <span className="font-medium text-canvas-blue">Move me!</span>
                </motion.div>
                
                <motion.div
                  drag
                  dragConstraints={constraintsRef}
                  whileTap={{ scale: 1.05 }}
                  className="absolute w-56 h-24 bg-canvas-pink/20 border-2 border-canvas-pink rounded-md flex items-center justify-center left-40 bottom-20"
                >
                  <span className="font-medium text-canvas-pink">Position me!</span>
                </motion.div>
              </div>
            </div>
            
            {/* Floating Tool Icons */}
            <motion.div 
              className="absolute -left-4 top-1/4 bg-white p-2 rounded-full shadow-lg"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <Pencil className="h-6 w-6 text-canvas-purple" />
            </motion.div>
            
            <motion.div 
              className="absolute -right-4 top-1/2 bg-white p-2 rounded-full shadow-lg"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 0.5 }}
            >
              <Shapes className="h-6 w-6 text-canvas-blue" />
            </motion.div>
            
            <motion.div 
              className="absolute left-1/4 -bottom-4 bg-white p-2 rounded-full shadow-lg"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 1 }}
            >
              <Image className="h-6 w-6 text-canvas-pink" />
            </motion.div>
            
            <motion.div 
              className="absolute right-1/4 -top-4 bg-white p-2 rounded-full shadow-lg"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut", delay: 0.7 }}
            >
              <MousePointer className="h-6 w-6 text-canvas-teal" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
