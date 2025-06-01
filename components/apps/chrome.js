import React, { Component } from 'react';

export class Chrome extends Component {
    constructor() {
        super();
        this.home_url = 'https://www.google.com/webhp?igu=1';
        this.state = {
            url: 'https://www.google.com/webhp?igu=1',
            display_url: "https://www.google.com",
            showPopup: false, // Start with false
        }
    }

    componentDidMount() {
        let lastVisitedUrl = localStorage.getItem("chrome-url");
        let lastDisplayedUrl = localStorage.getItem("chrome-display-url");
        
        // Always start with Google homepage when Chrome opens
        this.setState({ 
            url: this.home_url, 
            display_url: "https://www.google.com" 
        });
        
        // Always show popup when Chrome opens (removed the dismissed check)
        setTimeout(() => {
            this.setState({ showPopup: true });
        }, 1500); // Show popup after 1.5 seconds
    }

    storeVisitedUrl = (url, display_url) => {
        localStorage.setItem("chrome-url", url);
        localStorage.setItem("chrome-display-url", display_url);
    }

    refreshChrome = () => {
        const iframe = document.getElementById("chrome-screen");
        if (iframe) {
            iframe.src = iframe.src;
        }
    }

    goToHome = () => {
        this.setState({ url: this.home_url, display_url: "https://www.google.com" });
        setTimeout(() => this.refreshChrome(), 100);
    }

    dismissPopup = () => {
        this.setState({ showPopup: false });
        // Removed localStorage setting so popup shows every time
    }

    searchRyan = () => {
        // Open Google search in new tab since Google search is blocked in iframe
        const searchUrl = 'https://www.google.com/search?q=Ryan+Madhuwala';
        window.open(searchUrl, '_blank');
        this.dismissPopup();
    }

    checkKey = (e) => {
        if (e.key === "Enter") {
            let url = e.target.value;
            let display_url = "";

            url = url.trim();
            if (url.length === 0) return;

            if (url.indexOf("http://") !== 0 && url.indexOf("https://") !== 0) {
                url = "https://" + url;
            }

            url = encodeURI(url);
            display_url = url;
            
            // Special handling for Google URLs
            if (this.isGoogleUrl(url)) {
                if (this.isGoogleSearchUrl(url)) {
                    // If it's a Google search URL, open in new tab (because iframe will be blocked)
                    window.open(url, '_blank');
                    return;
                } else {
                    // If it's just google.com homepage, allow in iframe
                    this.setState({ url, display_url });
                    this.storeVisitedUrl(url, display_url);
                    document.getElementById("chrome-url-bar").blur();
                    return;
                }
            }
            
            // Check if URL is likely to be blocked by X-Frame-Options
            if (this.isBlockedUrl(url)) {
                // Open in new tab for blocked URLs
                window.open(url, '_blank');
                return;
            }
            
            this.setState({ url, display_url });
            this.storeVisitedUrl(url, display_url);
            document.getElementById("chrome-url-bar").blur();
        }
    }

    // Check if URL is Google related
    isGoogleUrl = (url) => {
        return url.includes('google.com');
    }

    // Check if URL is a Google search URL (which gets blocked in iframe)
    isGoogleSearchUrl = (url) => {
        return url.includes('google.com/search') || url.includes('google.com/?q=') || url.includes('google.com?q=');
    }

    // Check if URL is likely to be blocked by iframe
    isBlockedUrl = (url) => {
        const blockedDomains = [
            'youtube.com',
            'facebook.com',
            'twitter.com',
            'instagram.com',
            'linkedin.com',
            'github.com',
            'stackoverflow.com',
            'reddit.com',
            'amazon.com',
            'microsoft.com',
            'apple.com'
        ];
        
        // Don't include google.com here since we handle it separately
        return blockedDomains.some(domain => url.includes(domain));
    }

    handleDisplayUrl = (e) => {
        this.setState({ display_url: e.target.value });
    }

    displayUrlBar = () => {
        return (
            <div className="w-full pt-0.5 pb-1 flex justify-start items-center text-white text-sm border-b border-gray-900">
                <div onClick={this.refreshChrome} className=" ml-2 mr-1 flex justify-center items-center rounded-full bg-gray-50 bg-opacity-0 hover:bg-opacity-10 cursor-pointer">
                    <img className="w-5" src="./themes/Yaru/status/chrome_refresh.svg" alt="Ubuntu Chrome Refresh" />
                </div>
                <div onClick={this.goToHome} className=" mr-2 ml-1 flex justify-center items-center rounded-full bg-gray-50 bg-opacity-0 hover:bg-opacity-10 cursor-pointer">
                    <img className="w-5" src="./themes/Yaru/status/chrome_home.svg" alt="Ubuntu Chrome Home" />
                </div>
                <input onKeyDown={this.checkKey} onChange={this.handleDisplayUrl} value={this.state.display_url} id="chrome-url-bar" className="outline-none bg-ub-grey rounded-full pl-3 py-0.5 mr-3 w-5/6 text-gray-300 focus:text-white" type="url" spellCheck={false} autoComplete="off" />
            </div>
        );
    }

    renderPopup = () => {
        return (
            <div className={`fixed top-20 right-6 z-50 bg-white rounded-xl shadow-2xl p-5 w-80 border-2 border-purple-200 transition-all duration-300 ${
                this.state.showPopup ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-[-20px] scale-95 pointer-events-none'
            }`}>
                <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mr-3 shadow-lg">
                            <span className="text-white text-lg">😎</span>
                        </div>
                        <span className="text-gray-800 font-bold text-base">Hey You!</span>
                    </div>
                    <button 
                        onClick={this.dismissPopup}
                        className="text-gray-400 hover:text-gray-600 text-2xl leading-none font-bold hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center"
                    >
                        ×
                    </button>
                </div>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                    <span className="font-bold text-purple-600">Just Google me!</span> 🔥<br/>
                    Search <span className="font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded-md">"Ryan Madhuwala"</span> I dare you.... 
                </p>
                <div className="flex space-x-3">
                    <button 
                        onClick={this.searchRyan}
                        className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white text-sm px-5 py-2.5 rounded-lg transition-all font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                        Google Me 🚀
                    </button>
                    <button 
                        onClick={this.dismissPopup}
                        className="text-gray-500 hover:text-gray-700 text-sm px-4 py-2.5 rounded-lg transition-colors border border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                    >
                        Nah
                    </button>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="h-full w-full flex flex-col bg-ub-cool-grey relative">
                {this.displayUrlBar()}
                <iframe 
                    src={this.state.url} 
                    className="flex-grow" 
                    id="chrome-screen" 
                    frameBorder="0" 
                    title="Ubuntu Chrome Url"
                    key={this.state.url}
                />
                {this.renderPopup()}
            </div>
        )
    }
}

export default Chrome

export const displayChrome = () => {
    return <Chrome></Chrome>;
}