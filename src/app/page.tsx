import Image from "next/image";
import Link from "next/link";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = auth();
  
  if (userId) {
    redirect("/app");
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="w-full py-4 px-4 sm:px-8 flex justify-between items-center border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center">
          <Image 
            src="/ll.png" 
            alt="Platr Logo" 
            width={40} 
            height={40} 
            className="dark:invert-[0.95]"
          />
        </div>
        <div className="hidden md:flex space-x-8 text-sm font-medium">
          <a href="#features" className="hover:text-[#FF5A00] transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-[#FF5A00] transition-colors">How It Works</a>
          <a href="#testimonials" className="hover:text-[#FF5A00] transition-colors">Testimonials</a>
          <a href="#faq" className="hover:text-[#FF5A00] transition-colors">FAQ</a>
        </div>
        <div className="flex items-center space-x-4">
          <SignInButton mode="modal" afterSignInUrl="/app">
            <button className="hidden sm:block text-sm px-5 py-2 rounded-full border border-gray-200 dark:border-gray-700 hover:border-[#FF5A00] dark:hover:border-[#FF5A00] transition-colors duration-300">
              Login
            </button>
          </SignInButton>
          <SignUpButton mode="modal" afterSignUpUrl="/app">
            <button className="text-sm px-5 py-2 rounded-full bg-[#FF5A00] text-white hover:bg-[#E65100] transition-colors duration-300">
              Get Started
            </button>
          </SignUpButton>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-gradient w-full py-20 px-4 sm:px-8 flex flex-col items-center text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold max-w-4xl leading-tight mb-6">
          Stop Debating Where to Eat,
          <span className="text-gradient"> Start Enjoying Meals</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mb-10">
          Platr brings your group together to find the perfect restaurant that satisfies everyone&apos;s preferences, dietary needs, and budget constraints.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link href="/app" className="btn-primary px-8 py-3 rounded-full text-base font-medium">
            Try It Now
          </Link>
          <button className="btn-secondary px-8 py-3 rounded-full text-base font-medium">
            Learn More
          </button>
        </div>
        <div className="relative w-full max-w-5xl">
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#FF5A00]/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#FFC107]/10 rounded-full blur-3xl"></div>
          <div className="relative shadow-2xl rounded-3xl border border-gray-200 dark:border-gray-800 overflow-hidden animate-float">
            <Image 
              src="https://placehold.co/1200x650/FF5A00/FFFFFF?text=Platr+App+Interface" 
              alt="Platr App Interface" 
              width={1200} 
              height={650}
              className="w-full h-auto rounded-3xl" 
            />
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="w-full py-16 px-4 sm:px-8 bg-[#F8F0E5] dark:bg-[#222222]/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <p className="text-4xl sm:text-5xl font-bold text-[#FF5A00] mb-2">25+</p>
            <p className="text-gray-600 dark:text-gray-400">Minutes saved on average per dining decision</p>
          </div>
          <div className="text-center">
            <p className="text-4xl sm:text-5xl font-bold text-[#FF5A00] mb-2">38%</p>
            <p className="text-gray-600 dark:text-gray-400">of users with dietary restrictions easily accommodated</p>
          </div>
          <div className="text-center">
            <p className="text-4xl sm:text-5xl font-bold text-[#FF5A00] mb-2">98%</p>
            <p className="text-gray-600 dark:text-gray-400">satisfaction rate among group diners</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Choose Platr?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our platform is designed to make group dining decisions quick, fair, and satisfying for everyone involved.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Preference Aggregation",
                description: "Our smart algorithm combines everyone's preferences to find restaurants that satisfy the whole group.",
                icon: "🎯"
              },
              {
                title: "Dietary Accommodation",
                description: "We prioritize venues that cater to all dietary restrictions in your group, from vegetarian to gluten-free.",
                icon: "🥗"
              },
              {
                title: "Budget Conscious",
                description: "Set price ranges that work for everyone to ensure nobody feels uncomfortable about the cost.",
                icon: "💰"
              },
              {
                title: "Real-time Crowd Data",
                description: "See how busy restaurants are right now to avoid long wait times and crowded venues.",
                icon: "⏱️"
              },
              {
                title: "Location Smart",
                description: "Find places that are convenient for everyone based on travel distance for each group member.",
                icon: "📍"
              },
              {
                title: "Quick Decision Making",
                description: "Cut down the average 25-minute debate to just a few taps with our streamlined process.",
                icon: "⚡"
              }
            ].map((feature, index) => (
              <div key={index} className="feature-card bg-white dark:bg-[#222222]/20 p-8 rounded-2xl">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="w-full py-20 px-4 sm:px-8 bg-[#F8F0E5] dark:bg-[#222222]/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">How Platr Works</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Finding the perfect restaurant for your group is just a few simple steps away.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: "1",
                title: "Create a Group",
                description: "Invite friends to join your dining group through the app or by sharing a unique link.",
                image: "https://placehold.co/300x200/FF5A00/FFFFFF?text=Create+Group"
              },
              {
                step: "2",
                title: "Set Preferences",
                description: "Everyone inputs their dietary needs, cuisine preferences, and budget constraints.",
                image: "https://placehold.co/300x200/FF5A00/FFFFFF?text=Set+Preferences"
              },
              {
                step: "3",
                title: "Get Matched",
                description: "Our algorithm suggests perfect restaurant matches based on everyone's input.",
                image: "https://placehold.co/300x200/FF5A00/FFFFFF?text=Restaurant+Matches"
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mx-auto mb-6 rounded-xl overflow-hidden w-full max-w-xs">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#FF5A00] to-[#FFC107] opacity-30 blur-lg"></div>
                  <Image 
                    src={step.image} 
                    alt={step.title} 
                    width={300} 
                    height={200}
                    className="relative rounded-xl w-full" 
                  />
                  <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-[#FF5A00] flex items-center justify-center text-white font-bold">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="w-full py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Platr has transformed how groups decide where to eat across the country.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "As the only vegetarian in my friend group, I was always the difficult one. With Platr, we find places that work for everyone without compromise.",
                name: "Priya S.",
                location: "Mumbai"
              },
              {
                quote: "My colleagues and I use Platr for lunch decisions. We've discovered amazing restaurants we would have never found otherwise!",
                name: "Rahul M.",
                location: "Bangalore"
              },
              {
                quote: "Planning family dinners with picky eaters was a nightmare until we started using Platr. Now everyone looks forward to our weekly outings!",
                name: "Anita K.",
                location: "Delhi"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white dark:bg-[#222222]/20 p-8 rounded-2xl border border-gray-100 dark:border-gray-800">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-[#FFC107]" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 px-4 sm:px-8 bg-[#FF5A00] text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to End the &ldquo;Where Should We Eat?&rdquo; Debate?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of satisfied users who have transformed their group dining experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/app" className="bg-white text-[#FF5A00] px-8 py-3 rounded-full text-base font-medium hover:bg-gray-100 transition-colors">
              Try It Now
            </Link>
            <button className="bg-transparent border border-white px-8 py-3 rounded-full text-base font-medium hover:bg-white/10 transition-colors">
              Schedule a Demo
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="w-full py-20 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Everything you need to know about Platr.
            </p>
          </div>
          <div className="space-y-6">
            {[
              {
                question: "Is Platr available in my city?",
                answer: "Platr is currently available in major cities across India including Delhi, Mumbai, Bangalore, Chennai, Hyderabad, and Pune. We're rapidly expanding to more locations!"
              },
              {
                question: "How does Platr handle dietary restrictions?",
                answer: "Users can input specific dietary needs (vegetarian, vegan, gluten-free, etc.) and our algorithm prioritizes restaurants that can accommodate everyone in your group."
              },
              {
                question: "Is Platr free to use?",
                answer: "Yes! The basic version of Platr is completely free. We also offer a premium subscription with additional features like reservation management and exclusive deals."
              },
              {
                question: "How accurate is the crowd size data?",
                answer: "Our crowd data comes from multiple sources including partner restaurants, user check-ins, and anonymized location data to provide real-time estimates that are typically 85-90% accurate."
              },
              {
                question: "Can I use Platr for large groups?",
                answer: "Absolutely! Platr works for groups of any size. For very large groups (20+), we recommend using our group splitting feature for easier preference management."
              }
            ].map((faq, index) => (
              <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h3 className="text-xl font-medium mb-2">{faq.question}</h3>
                <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 px-4 sm:px-8 bg-[#F8F0E5] dark:bg-[#222222]/5 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <Image 
                src="/ll.png" 
                alt="Platr Logo" 
                width={30} 
                height={30}
                className="mb-6 dark:invert-[0.95]" 
              />
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Making group dining decisions simple, fair, and delightful.
              </p>
              <div className="flex space-x-4">
                {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                  <a key={social} href={`#${social}`} className="text-gray-400 hover:text-[#FF5A00]">
                    <svg width="20" height="20" fill="currentColor" className="h-5 w-5" viewBox="0 0 24 24">
                      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
                    </svg>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Product</h4>
              <ul className="space-y-2">
                {['Features', 'Pricing', 'Case Studies', 'Reviews', 'Updates'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-[#FF5A00] dark:hover:text-[#FF5A00]">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Company</h4>
              <ul className="space-y-2">
                {['About', 'Team', 'Careers', 'Press', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-[#FF5A00] dark:hover:text-[#FF5A00]">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Legal</h4>
              <ul className="space-y-2">
                {['Terms', 'Privacy', 'Cookies', 'Licenses', 'Settings'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-[#FF5A00] dark:hover:text-[#FF5A00]">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-500 dark:text-gray-400">
            <p>© {new Date().getFullYear()} Platr. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
