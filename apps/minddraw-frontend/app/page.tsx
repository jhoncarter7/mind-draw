
"use client";
import { useState, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Pencil, MousePointer, Image, Shapes } from "lucide-react";

export default function Home() {
  const constraintsRef = useRef(null);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
       
      <Head>
        <title>Canvas Nova - Next Generation Drawing Platform</title>
        <meta
          name="description"
          content="Canvas Nova - The smart canvas for your ideas"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <header className="fixed w-full z-50 backdrop-blur-lg bg-slate-900/80 py-3">
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link href="/">
            <span className="text-3xl font-extrabold">
              Canvas<span className="text-teal-400">Nova</span>
            </span>
          </Link>

          <nav className="hidden md:flex">
            {["Features", "Pricing", "Resources", "Blog"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-slate-300 hover:text-teal-400 px-5 py-2 font-medium transition-colors"
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Link
              href="/signin"
              className="hidden md:inline-block text-slate-300 hover:text-teal-400 font-medium transition-colors"
            >
              Login
            </Link>
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-teal-400 hover:bg-teal-500 text-slate-900 font-bold py-2 px-6 rounded-full transition-colors"
            >
              Start Free
            </motion.a>
          </div>
        </div>
      </header>

      <main>
       
        <section className="pt-32 pb-20 px-4 relative overflow-hidden">
          {/* Background Gradient Animation */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-800"></div>
            <motion.div
              className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl"
              animate={{
                x: [0, 30, 0],
                y: [0, 20, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
              animate={{
                x: [0, -30, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </div>

          <div className="container mx-auto text-center relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-5xl md:text-6xl font-extrabold mb-6"
            >
              The Canvas for{" "}
              <span className="text-teal-400">Creative Minds</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-xl text-slate-300 max-w-2xl mx-auto mb-12"
            >
              Create stunning diagrams, wireframes, and illustrations with our
              intuitive drawing platform. Designed for teams that value
              creativity and collaboration.
            </motion.p>

            {/* Interactive Canvas Preview */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative w-full aspect-square max-w-xl mx-auto mb-16"
              ref={constraintsRef}
            >
              <div className="absolute inset-0 bg-gradient-radial from-purple-500/20 to-transparent -z-10 animate-pulse-slow rounded-full blur-3xl"></div>

              <div className="relative bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-4 border border-gray-100 overflow-hidden h-full">
                <div className="absolute top-0 left-0 right-0 bg-gray-50 p-2 border-b flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="text-xs text-gray-500 mx-auto">
                    Untitled Drawing - Canvas Nova
                  </div>
                </div>

                <div className="pt-8 h-full relative">
                  <div className="absolute inset-0 opacity-10 bg-gray-200"></div>

                  <motion.div
                    drag
                    dragConstraints={constraintsRef}
                    whileTap={{ scale: 1.05 }}
                    className="absolute w-48 h-32 bg-purple-500/20 border-2 border-purple-500 rounded-lg flex items-center justify-center left-20 top-20"
                  >
                    <span className="font-medium text-purple-700">
                      Drag me!
                    </span>
                  </motion.div>

                  <motion.div
                    drag
                    dragConstraints={constraintsRef}
                    whileTap={{ scale: 1.05 }}
                    className="absolute w-40 h-40 bg-blue-500/20 border-2 border-blue-500 rounded-full flex items-center justify-center right-20 top-40"
                  >
                    <span className="font-medium text-blue-700">Move me!</span>
                  </motion.div>

                  <motion.div
                    drag
                    dragConstraints={constraintsRef}
                    whileTap={{ scale: 1.05 }}
                    className="absolute w-56 h-24 bg-pink-500/20 border-2 border-pink-500 rounded-md flex items-center justify-center left-40 bottom-20"
                  >
                    <span className="font-medium text-pink-700">
                      Position me!
                    </span>
                  </motion.div>
                </div>
              </div>

              <motion.div
                className="absolute -left-4 top-1/4 bg-white p-2 rounded-full shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
              >
                <Pencil className="h-6 w-6 text-purple-500" />
              </motion.div>

              <motion.div
                className="absolute -right-4 top-1/2 bg-white p-2 rounded-full shadow-lg"
                animate={{ y: [0, 10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              >
                <Shapes className="h-6 w-6 text-blue-500" />
              </motion.div>

              <motion.div
                className="absolute left-1/4 -bottom-4 bg-white p-2 rounded-full shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                  delay: 1,
                }}
              >
                <Image className="h-6 w-6 text-pink-500" />
              </motion.div>

              <motion.div
                className="absolute right-1/4 -top-4 bg-white p-2 rounded-full shadow-lg"
                animate={{ y: [0, 10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 2.2,
                  ease: "easeInOut",
                  delay: 0.7,
                }}
              >
                <MousePointer className="h-6 w-6 text-teal-500" />
              </motion.div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row justify-center gap-4 mt-8"
            >
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-teal-400 hover:bg-teal-500 text-slate-900 font-bold py-4 px-8 rounded-full inline-flex items-center justify-center"
              >
                Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
              </motion.a>

              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent hover:bg-slate-800 text-teal-400 font-bold py-4 px-8 rounded-full inline-flex items-center justify-center border border-teal-400/30"
              >
                Watch Demo
              </motion.a>
            </motion.div>
          </div>
        </section>

        <section className="py-24 px-4 bg-slate-800 relative">
          <motion.div
            className="absolute top-0 right-0 w-1/3 h-1/3 bg-teal-500/10 rounded-full blur-3xl"
            animate={{
              x: [0, -30, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple-500/10 rounded-full blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />

          <div className="container mx-auto relative z-10">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="text-4xl font-extrabold mb-4"
              >
                Powerful Features for Creative Teams
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-xl text-slate-300 max-w-2xl mx-auto"
              >
                Everything you need to bring your ideas to life.
              </motion.p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Intuitive Drawing Tools",
                  description:
                    "Our smart tools adapt to your style, making creation feel natural and effortless.",
                  color: "from-purple-500 to-purple-400",
                },
                {
                  title: "Real-time Collaboration",
                  description:
                    "Work together with your team in real-time, no matter where they are located.",
                  color: "from-blue-500 to-blue-400",
                },
                {
                  title: "Smart Templates",
                  description:
                    "Start quickly with hundreds of professionally designed templates.",
                  color: "from-teal-500 to-teal-400",
                },
                {
                  title: "AI-Powered Assistance",
                  description:
                    "Get intelligent suggestions and improvements as you design.",
                  color: "from-amber-500 to-amber-400",
                },
                {
                  title: "Version History",
                  description:
                    "Track changes and revert to previous versions with one click.",
                  color: "from-pink-500 to-pink-400",
                },
                {
                  title: "Export & Integration",
                  description:
                    "Export in multiple formats and integrate with your favorite tools.",
                  color: "from-indigo-500 to-indigo-400",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-slate-900 rounded-2xl p-8 border border-slate-700"
                >
                  <div
                    className={`h-1 w-16 bg-gradient-to-r ${feature.color} mb-6 rounded-full`}
                  ></div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-slate-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-24 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800"></div>
          <motion.div
            className="absolute top-1/3 left-1/2 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />

          <div className="container mx-auto relative z-10">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="text-4xl font-extrabold mb-4"
              >
                Loved by Creative Teams
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-xl text-slate-300 max-w-2xl mx-auto"
              >
                See what our customers are saying about Canvas Nova.
              </motion.p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  quote:
                    "Canvas Nova has completely transformed how our design team collaborates. The real-time features are game-changing.",
                  author: "Sarah Johnson",
                  role: "Design Director, Pixel Perfect",
                  color: "border-teal-400",
                },
                {
                  quote:
                    "We've tried many drawing tools, but none compare to the intuitive nature and powerful features of Canvas Nova.",
                  author: "Michael Chen",
                  role: "Product Manager, TechFlow",
                  color: "border-purple-400",
                },
                {
                  quote:
                    "The AI-powered suggestions have cut our diagramming time in half. It's like having another designer on the team.",
                  author: "Alex Rivera",
                  role: "UX Lead, Creative Solutions",
                  color: "border-pink-400",
                },
                {
                  quote:
                    "Our remote team relies on Canvas Nova daily. It's become an essential part of our workflow.",
                  author: "Jamie Taylor",
                  role: "Creative Director, Studio Innovate",
                  color: "border-blue-400",
                },
                {
                  quote:
                    "The templates saved us countless hours. We can focus on customizing rather than starting from scratch.",
                  author: "Priya Patel",
                  role: "Marketing Lead, Growth Wizards",
                  color: "border-amber-400",
                },
                {
                  quote:
                    "Canvas Nova's version history has saved us multiple times when clients want to revert to previous concepts.",
                  author: "Thomas Wright",
                  role: "Agency Owner, Digital Creatives",
                  color: "border-indigo-400",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`bg-slate-900 rounded-2xl p-8 border-l-4 ${testimonial.color} border-t border-r border-b border-slate-700`}
                >
                  <p className="text-slate-300 mb-6 italic">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <p className="font-bold">{testimonial.author}</p>
                    <p className="text-slate-400 text-sm">{testimonial.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-4 bg-slate-800 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />

          <div className="container mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-10 md:p-16 max-w-5xl mx-auto border border-slate-700 shadow-2xl"
            >
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                  Ready to bring your ideas to life?
                </h2>
                <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                  Join thousands of creative teams already using Canvas Nova.
                  Start your 14-day free trial today.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-teal-400 hover:bg-teal-500 text-slate-900 font-bold py-4 px-10 rounded-full inline-flex items-center"
                >
                  Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
                </motion.a>

                <motion.a
                  href="#"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-transparent hover:bg-slate-800 text-teal-400 font-bold py-4 px-10 rounded-full inline-flex items-center border border-teal-400/30"
                >
                  View Pricing
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 py-16 px-4 border-t border-slate-800">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <h3 className="text-2xl font-extrabold mb-6">
                Canvas<span className="text-teal-400">Nova</span>
              </h3>
              <p className="text-slate-400 mb-6">
                The next generation drawing platform that empowers teams to
                create stunning diagrams in minutes.
              </p>
              <div className="flex space-x-4">
                {["Twitter", "LinkedIn", "GitHub", "Discord"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-slate-400 hover:text-teal-400 transition-colors"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>

            {["Product", "Company", "Resources"].map((section) => (
              <div key={section}>
                <h3 className="font-bold text-xl mb-6">{section}</h3>
                <ul className="space-y-4">
                  {["Features", "Pricing", "Roadmap", "Blog"].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-slate-400 hover:text-teal-400 transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400">
              © 2025 Canvas Nova. All rights reserved.
            </p>
            <div className="flex space-x-8 mt-4 md:mt-0">
              <a
                href="#"
                className="text-slate-400 hover:text-teal-400 transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-teal-400 transition-colors"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-teal-400 transition-colors"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
