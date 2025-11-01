import React, { useState, useEffect } from 'react';

const App: React.FC = () => {
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  // Voting states
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Results states - now managed locally
  const [voteCounts, setVoteCounts] = useState<{ [key: string]: number }>({
    'Todor-Matija': 0,
    'Lara-Sara': 0,
  });

  // Check localStorage for previous vote on component mount
  useEffect(() => {
    if (localStorage.getItem('vi1_has_voted')) {
        setHasVoted(true);
    }
  }, []);

  // Effect for tab content transitions
  useEffect(() => {
    setIsContentVisible(false);
    const timer = setTimeout(() => {
      setIsContentVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const handleVoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTicket && !hasVoted) {
      setIsSubmitting(true);
      setTimeout(() => {
        setVoteCounts(prevCounts => ({
          ...prevCounts,
          [selectedTicket]: (prevCounts[selectedTicket] || 0) + 1,
        }));
        localStorage.setItem('vi1_has_voted', selectedTicket);
        setHasVoted(true);
        setIsSubmitting(false);
      }, 500);
    }
  };

  const renderContent = () => {
    const tickets = [
      { id: 'Todor-Matija', president: 'Todor Ilic', coPresident: 'Matija Radulovic' },
      { id: 'Lara-Sara', president: 'Lara Djusic', coPresident: 'Sara Samardzic' },
    ];

    if (activeTab === 'home') {
      return (
        <div
          className={`text-center transition-opacity duration-1000 ease-in-out transform ${
            isContentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <h2 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-extrabold text-red-500 tracking-tighter leading-tight">
            MAKE IT GREAT!
          </h2>
          <p className="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-300">
            WE TRUST!
          </p>
          <div className="mt-8 md:mt-12 inline-block">
             <p className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-red-600 border-t-4 border-b-4 border-red-500 py-4 px-8 tracking-widest">
                VI/1!
             </p>
          </div>
        </div>
      );
    }

    if (activeTab === 'info') {
      return (
        <div
          className={`text-left max-w-2xl mx-auto p-8 bg-gray-800 rounded-lg shadow-xl transition-opacity duration-1000 ease-in-out transform ${
            isContentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <h2 className="text-4xl font-bold text-red-500 mb-6 border-b-2 border-red-500 pb-2">Information</h2>
          <div className="space-y-4 text-lg text-gray-300">
            <p><span className="font-semibold text-red-400">Creator:</span> Matija Radulovic</p>
            <p><span className="font-semibold text-red-400">Author:</span> Todor Ilic</p>
            <p className="mt-6 pt-4 border-t border-gray-700 text-gray-400 italic">Vi/1 was ruined by bisexual, lesbian, gay people and vapes. we want to return it to normal</p>
          </div>
        </div>
      );
    }

     if (activeTab === 'vote') {
      return (
        <div
          className={`max-w-2xl w-full mx-auto p-6 md:p-8 bg-gray-800 rounded-lg shadow-xl transition-opacity duration-1000 ease-in-out transform ${
            isContentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <div>
            <h2 className="text-3xl font-bold text-red-500 mb-6 border-b-2 border-red-500 pb-2 text-center">Vote for VI/1 Leadership</h2>
            {hasVoted ? (
              <div className="flex flex-col items-center justify-center h-full bg-gray-700/50 p-6 rounded-md text-center">
                <svg className="w-16 h-16 text-green-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <p className="text-2xl text-green-400 font-semibold">Thank you for voting!</p>
                <p className="text-gray-300 mt-2">Your vote has been recorded.</p>
              </div>
            ) : (
              <form onSubmit={handleVoteSubmit} className="space-y-6">
                <fieldset>
                  <legend className="text-xl font-semibold text-red-400 mb-4">Select a Presidential Ticket</legend>
                  <div className="space-y-4">
                    {tickets.map(ticket => (
                       <label key={ticket.id} className="flex items-start p-4 bg-gray-700 rounded-md cursor-pointer hover:bg-gray-600 transition-colors has-[:checked]:bg-red-900/50 has-[:checked]:ring-2 ring-red-500">
                        <input type="radio" name="ticket" value={ticket.id} onChange={(e) => setSelectedTicket(e.target.value)} className="form-radio h-5 w-5 mt-1 text-red-600 bg-gray-900 border-gray-500 focus:ring-red-500" />
                        <span className="ml-4 text-lg text-gray-300">
                          <strong className="block text-red-400">President:</strong> {ticket.president}<br />
                          <strong className="block mt-1 text-red-400">Co-President:</strong> {ticket.coPresident}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                
                <button
                  type="submit"
                  disabled={!selectedTicket || isSubmitting || hasVoted}
                  className="w-full py-3 mt-4 text-xl font-bold text-white bg-red-600 rounded-md transition-all duration-200 ease-in-out hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-red-500 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Vote'}
                </button>
              </form>
            )}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      <header className="fixed top-0 left-0 w-full bg-gray-800 z-10 p-4 md:p-6 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold text-red-600 tracking-wider">
            MAKE VI/1 GREAT AGAIN!
          </h1>
          <nav>
            <button
              onClick={() => setActiveTab('home')}
              aria-current={activeTab === 'home' ? 'page' : undefined}
              className={`px-4 py-2 text-lg font-semibold rounded-md transition-colors ${activeTab === 'home' ? 'bg-red-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab('info')}
              aria-current={activeTab === 'info' ? 'page' : undefined}
              className={`ml-4 px-4 py-2 text-lg font-semibold rounded-md transition-colors ${activeTab === 'info' ? 'bg-red-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
            >
              Info
            </button>
            <button
              onClick={() => setActiveTab('vote')}
              aria-current={activeTab === 'vote' ? 'page' : undefined}
              className={`ml-4 px-4 py-2 text-lg font-semibold rounded-md transition-colors ${activeTab === 'vote' ? 'bg-red-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
            >
              Vote
            </button>
          </nav>
        </div>
      </header>

      <main className="flex items-center justify-center min-h-screen pt-24 px-4">
        {renderContent()}
      </main>
      
    </div>
  );
};

export default App;
