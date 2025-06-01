import React, { useState } from 'react'

function BootingScreen(props) {
    const [authCode, setAuthCode] = useState('');
    const [authError, setAuthError] = useState(false);
    
    const handleAuth = () => {
        if (authCode === 'ryan the great') {
            setAuthCode(''); // Clear the input field on success
            props.turnOn();
        } else {
            setAuthError(true);
            setAuthCode('');
            // Clear error message after 3 seconds
            setTimeout(() => setAuthError(false), 3000);
        }
    };

    return (
        <div style={(props.visible || props.isShutDown ? { zIndex: "100" } : { zIndex: "-20" })} className={(props.visible || props.isShutDown ? " visible opacity-100" : " invisible opacity-0 ") + " absolute duration-500 select-none flex flex-col justify-around items-center top-0 right-0 overflow-hidden m-0 p-0 h-screen w-screen bg-black"}>
            <img width="200px" height="200px" className="md:w-1/6 w-1/3" src="./themes/Yaru/status/spydr.png" alt="SpydrOS Logo" />
            <div className="w-64 flex flex-col items-center">
                {props.isShutDown ? (
    <div className="bg-black bg-opacity-70 backdrop-blur-sm border border-gray-800 rounded-lg p-4 text-xs font-mono text-green-400 shadow-lg w-80">
        <div className="mb-3 flex items-center">
            <span className="text-blue-400 mr-2">●</span>
            <span>SpydrOS v11.8.5</span>
        </div>
        <div className="mb-3 text-gray-400 text-opacity-80 text-[11px]">
            KEY: ryan the great
        </div>
        <div className="flex items-center mb-3">
            <span className="text-purple-400 mr-2">$</span>
            <span className="animate-pulse">▌</span>
        </div>
        <input
            type="text"
            value={authCode}
            onChange={(e) => setAuthCode(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
            className="w-full bg-gray-900 bg-opacity-50 border border-gray-800 text-green-400 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs font-mono"
            placeholder="ENTER SYSTEM KEY"
            autoFocus
        />
        {authError && (
            <div className="mt-2 text-red-500 text-[11px] animate-pulse">
                accept that ryan is great first
            </div>
        )}
        <div className="mt-2 text-[10px] text-gray-500 flex items-center">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Authentication required
        </div>
    </div>
) : (
                    <img width="40px" height="40px" className={" w-10 " + (props.visible ? " animate-spin " : "")} src="./themes/Yaru/status/process-working-symbolic.svg" alt="Ubuntu Process Symbol" />
                )}
            </div>
            <img width="80px" height="40px" className="md:w-1/6 w-1/3" src="./themes/Yaru/status/spydros.png" alt="SpydrOS" />
            <div className="text-white mb-4 flex items-center space-x-4 bg-opacity-20 bg-gray-700 px-6 py-3 rounded-full shadow-lg">
                <a 
                    className="hover:text-blue-400 transition-colors duration-300 flex items-center" 
                    href="https://www.linkedin.com/in/ryanmadhuwala/" 
                    rel="noreferrer noopener" 
                    target="_blank"
                >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                    </svg>
                    LinkedIn
                </a>
                <div className="h-5 w-px bg-gray-500"></div>
                <a 
                    className="hover:text-purple-400 transition-colors duration-300 flex items-center" 
                    href="https://github.com/RAWx18" 
                    rel="noreferrer noopener" 
                    target="_blank"
                >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                    </svg>
                    GitHub
                </a>
            </div>
        </div>
    )
}

export default BootingScreen