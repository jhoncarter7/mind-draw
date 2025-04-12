// pages/pricing.js
"use client"
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, X, ArrowRight, CreditCard, Zap, Building, Crown } from 'lucide-react';

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState('annually');
  
  const plans = [
    {
      name: 'Starter',
      icon: <CreditCard className="w-8 h-8 text-teal-400" />,
      description: 'Perfect for individuals and small projects',
      monthlyPrice: 9,
      annualPrice: 96, // $8 per month, billed annually
      features: [
        'Unlimited personal diagrams',
        'Basic templates library',
        'Standard export options',
        'Community support',
        '5 GB cloud storage',
      ],
      limitations: [
        'No team collaboration',
        'No AI assistance',
        'No version history',
      ],
      ctaText: 'Start Free Trial',
      accentColor: 'from-teal-500 to-teal-400',
      bgGradient: 'from-slate-900 to-slate-800',
      popular: false,
    },
    {
      name: 'Pro',
      icon: <Zap className="w-8 h-8 text-amber-400" />,
      description: 'Designed for professionals and creators',
      monthlyPrice: 19,
      annualPrice: 180, // $15 per month, billed annually
      features: [
        'Everything in Starter',
        'Unlimited diagrams',
        'Advanced templates',
        'All export formats',
        'AI diagram assistance',
        '50 GB cloud storage',
        '1 team workspace',
        'Priority support',
      ],
      limitations: [
        'Limited team features',
      ],
      ctaText: 'Start Free Trial',
      accentColor: 'from-amber-500 to-amber-400',
      bgGradient: 'from-slate-900 to-slate-800',
      popular: true,
    },
    {
      name: 'Team',
      icon: <Building className="w-8 h-8 text-purple-400" />,
      description: 'For growing teams and organizations',
      monthlyPrice: 39,
      annualPrice: 396, // $33 per month, billed annually
      features: [
        'Everything in Pro',
        'Unlimited team workspaces',
        'Advanced collaboration',
        'Team libraries & templates',
        'Admin controls',
        'Custom branding',
        'API access',
        '250 GB cloud storage',
        '24/7 priority support',
      ],
      limitations: [],
      ctaText: 'Start Free Trial',
      accentColor: 'from-purple-500 to-purple-400',
      bgGradient: 'from-slate-900 to-slate-800',
      popular: false,
    },
    {
      name: 'Enterprise',
      icon: <Crown className="w-8 h-8 text-rose-400" />,
      description: 'Custom solutions for large organizations',
      monthlyPrice: null,
      annualPrice: null,
      features: [
        'Everything in Team',
        'Custom contract',
        'Enterprise SSO',
        'Dedicated support manager',
        'Custom training',
        'Unlimited storage',
        'Advanced security',
        'Custom integrations',
        'On-premise options',
      ],
      limitations: [],
      ctaText: 'Contact Sales',
      accentColor: 'from-rose-500 to-rose-400',
      bgGradient: 'from-slate-900 to-slate-800',
      popular: false,
    }
  ];

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }),
    hover: {
      y: -10,
      transition: {
        duration: 0.2
      }
    }
  };

  const ctaVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Head>
        <title>Pricing - Canvas Nova</title>
        <meta name="description" content="Canvas Nova pricing plans" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <header className="fixed w-full z-50 backdrop-blur-lg bg-slate-900/80 py-3">
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link href="/">
            <span className="text-3xl font-extrabold">Canvas<span className="text-teal-400">Nova</span></span>
          </Link>
          
          <nav className="hidden md:flex">
            {['Features', 'Pricing', 'Resources', 'Blog'].map((item) => (
              <a key={item} href="#" className={`text-slate-300 hover:text-teal-400 px-5 py-2 font-medium transition-colors ${item === 'Pricing' ? 'text-teal-400' : ''}`}>
                {item}
              </a>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
            <a href="#" className="hidden md:inline-block text-slate-300 hover:text-teal-400 font-medium transition-colors">
              Login
            </a>
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

      {/* Main Content */}
      <main>
        {/* Hero Section */}
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
                repeatType: "reverse"
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
                repeatType: "reverse"
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
              Choose Your Perfect <span className="text-teal-400">Plan</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-xl text-slate-300 max-w-2xl mx-auto mb-12"
            >
              Scale your creativity with flexible options that grow with your needs.
              Start with a 14-day free trial on any plan.
            </motion.p>
            
            {/* Toggle Switch */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex justify-center items-center space-x-6 mb-16"
            >
              <span 
                className={`text-lg font-medium cursor-pointer ${billingPeriod === 'monthly' ? 'text-white' : 'text-slate-400'}`}
                onClick={() => setBillingPeriod('monthly')}
              >
                Monthly
              </span>
              
              <div 
                className="relative w-16 h-8 bg-slate-700 rounded-full cursor-pointer flex items-center p-1"
                onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'annually' : 'monthly')}
              >
                <motion.div 
                  className="w-6 h-6 bg-teal-400 rounded-full"
                  animate={{ x: billingPeriod === 'annually' ? 8 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </div>
              
              <div className="flex items-center">
                <span 
                  className={`text-lg font-medium cursor-pointer ${billingPeriod === 'annually' ? 'text-white' : 'text-slate-400'}`}
                  onClick={() => setBillingPeriod('annually')}
                >
                  Annually
                </span>
                <span className="ml-2 bg-teal-400/20 text-teal-400 text-xs font-bold px-2 py-1 rounded-full">Save 15%</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="pb-24 px-4 relative z-10">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {plans.map((plan, index) => (
                <motion.div 
                  key={index}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  whileHover={plan.popular ? {} : "hover"}
                  viewport={{ once: true }}
                  variants={cardVariants}
                  className={`bg-gradient-to-b ${plan.bgGradient} border border-slate-700 rounded-3xl overflow-hidden relative ${plan.popular ? 'lg:-mt-6' : ''}`}
                >
                  {/* Card Header */}
                  <div className={`h-2 bg-gradient-to-r ${plan.accentColor}`}></div>
                  
                  <div className="p-8">
                    {plan.popular && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-amber-400/20 text-amber-400 text-xs font-bold px-3 py-1 rounded-full">
                          Most Popular
                        </span>
                      </div>
                    )}
                    
                    <div className="mb-4">
                      {plan.icon}
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-slate-400 mb-6">{plan.description}</p>
                    
                    <div className="mb-6">
                      {plan.monthlyPrice ? (
                        <>
                          <div className="flex items-end">
                            <span className="text-4xl font-bold">
                              ${billingPeriod === 'monthly' ? plan.monthlyPrice : Math.floor(plan.annualPrice / 12)}
                            </span>
                            <span className="text-slate-400 ml-2">/ month</span>
                          </div>
                          <div className="text-sm text-slate-400 mt-1">
                            {billingPeriod === 'annually' && (
                              <span>Billed ${plan.annualPrice} annually</span>
                            )}
                          </div>
                        </>
                      ) : (
                        <div className="text-2xl font-bold">Custom Pricing</div>
                      )}
                    </div>
                    
                    <motion.a 
                      href="#"
                      variants={ctaVariants}
                      initial="rest"
                      whileHover="hover"
                      whileTap="tap"
                      className={`block w-full py-3 rounded-xl text-center font-bold ${
                        plan.popular 
                          ? `bg-gradient-to-r ${plan.accentColor} text-slate-900` 
                          : 'bg-slate-800 text-white border border-slate-700 hover:bg-slate-700'
                      } transition-colors mb-8`}
                    >
                      {plan.ctaText}
                    </motion.a>
                    
                    {/* Feature List */}
                    <div>
                      <p className="font-semibold text-sm uppercase tracking-wider text-slate-400 mb-3">What's included</p>
                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature, idx) => (
                          <motion.li 
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + (idx * 0.05) }}
                            viewport={{ once: true }}
                            className="flex items-start"
                          >
                            <span className={`mr-2 mt-1 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-teal-400/20 text-teal-400`}>
                              <Check className="w-3 h-3" />
                            </span>
                            <span className="text-slate-300 text-sm">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                      
                      {plan.limitations.length > 0 && (
                        <>
                          <p className="font-semibold text-sm uppercase tracking-wider text-slate-400 mb-3">Limitations</p>
                          <ul className="space-y-3">
                            {plan.limitations.map((limitation, idx) => (
                              <motion.li 
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + (idx * 0.05) }}
                                viewport={{ once: true }}
                                className="flex items-start"
                              >
                                <span className="mr-2 mt-1 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-slate-800 text-slate-500">
                                  <X className="w-3 h-3" />
                                </span>
                                <span className="text-slate-400 text-sm">{limitation}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
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
              repeatType: "reverse"
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
              repeatType: "reverse"
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
                Frequently Asked Questions
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-xl text-slate-300 max-w-2xl mx-auto"
              >
                Everything you need to know about Canvas Nova pricing.
              </motion.p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                {
                  question: "Can I switch plans anytime?",
                  answer: "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll be charged the prorated difference. When downgrading, the new rate will apply at the start of your next billing cycle."
                },
                {
                  question: "What payment methods do you accept?",
                  answer: "We accept all major credit cards, PayPal, and for annual enterprise plans, we can support invoicing with net-30 terms."
                },
                {
                  question: "Are there any setup or hidden fees?",
                  answer: "No, there are no setup fees or hidden charges. The price you see is the price you pay."
                },
                {
                  question: "How does the free trial work?",
                  answer: "Our 14-day free trial gives you full access to all features of your chosen plan. No credit card is required to start. We'll send you a reminder before it ends."
                },
                {
                  question: "What happens to my diagrams if I cancel?",
                  answer: "You'll have 30 days to export your diagrams after cancellation. After that period, your data will be permanently deleted from our servers."
                },
                {
                  question: "Do you offer discounts for teams?",
                  answer: "Yes, we offer volume discounts for teams with more than 10 members. Contact our sales team for more information."
                },
              ].map((faq, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-slate-900 p-8 rounded-2xl"
                >
                  <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                  <p className="text-slate-400">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
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
              repeatType: "reverse"
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
                <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Still have questions?</h2>
                <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                  Our team is ready to help you find the perfect plan for your needs.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <motion.a 
                  href="#"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-teal-400 hover:bg-teal-500 text-slate-900 font-bold py-4 px-10 rounded-full inline-flex items-center"
                >
                  Contact Sales <ArrowRight className="ml-2 w-5 h-5" />
                </motion.a>
                
                <motion.a 
                  href="#"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-transparent hover:bg-slate-800 text-teal-400 font-bold py-4 px-10 rounded-full inline-flex items-center border border-teal-400/30"
                >
                  Schedule Demo
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
              <h3 className="text-2xl font-extrabold mb-6">Canvas<span className="text-teal-400">Nova</span></h3>
              <p className="text-slate-400 mb-6">
                The next generation drawing platform that empowers teams to create stunning diagrams in minutes.
              </p>
              <div className="flex space-x-4">
                {['Twitter', 'LinkedIn', 'GitHub', 'Discord'].map((social) => (
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
            
            {['Product', 'Company', 'Resources'].map((section) => (
              <div key={section}>
                <h3 className="font-bold text-xl mb-6">{section}</h3>
                <ul className="space-y-4">
                  {['Features', 'Pricing', 'Roadmap', 'Blog'].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-slate-400 hover:text-teal-400 transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400">© 2025 Canvas Nova. All rights reserved.</p>
            <div className="flex space-x-8 mt-4 md:mt-0">
              <a href="#" className="text-slate-400 hover:text-teal-400 transition-colors">Privacy</a>
              <a href="#" className="text-slate-400 hover:text-teal-400 transition-colors">Terms</a>
              <a href="#" className="text-slate-400 hover:text-teal-400 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}