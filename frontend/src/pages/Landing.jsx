const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-20 text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
          Streamline Your{" "}
          <span className="text-teal-400">Technical Workflow</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Say goodbye to sticky notes. Centralize, assign, and manage your tech
          support notes with ease — all in one secure platform.
        </p>
        <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transform transition duration-300 hover:scale-105">
          Launch Tech Notes
        </button>
      </div>
    </section>
  );
};

const CallToAction = () => {
  return (
    <section className="bg-teal-600 text-white py-16 text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-6">Empower Your Support Team</h2>
        <p className="text-lg md:text-xl mb-8 max-w-xl mx-auto">
          Improve note ownership, accountability, and collaboration with
          role-based access, automated logins, and clear status tracking.
        </p>
        <button className="bg-white text-teal-600 font-bold py-3 px-8 rounded-full text-lg shadow-lg transform transition duration-300 hover:scale-105 hover:bg-gray-200">
          Start Managing Notes
        </button>
      </div>
    </section>
  );
};

function Landing() {
  return (
    <div className="font-sans antialiased text-gray-900 **min-h-screen flex flex-col">
      <div className="flex-grow">
        <HeroSection />
        <CallToAction />
      </div>
    </div>
  );
}

export default Landing;
