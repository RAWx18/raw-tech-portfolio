import React, { Component } from 'react';
import ReactGA from 'react-ga4';

export class AboutVivek extends Component {

    constructor() {
        super();
        this.screens = {};
        this.state = {
            screen: () => { },
            active_screen: "portfolio", // default to portfolio screen
            navbar: false,
        }
    }

    componentDidMount() {
        this.screens = {
            "portfolio": <Portfolio />,
            "about": <About />,
            "secrets": <Secrets />,
            "projects": <Projects />,
        }

        let lastVisitedScreen = localStorage.getItem("about-section");
        if (lastVisitedScreen === null || lastVisitedScreen === undefined) {
            lastVisitedScreen = "portfolio";
        }

        // Set initial screen
        this.setState({
            screen: this.screens[lastVisitedScreen],
            active_screen: lastVisitedScreen
        });
    }

    changeScreen = (e) => {
        // Fix the null reference error
        const screen = e?.id || e?.target?.id;
        
        if (!screen) return;

        // store this state
        localStorage.setItem("about-section", screen);

        // google analytics
        ReactGA.send({ hitType: "pageview", page: `/${screen}`, title: "Custom Title" });

        this.setState({
            screen: this.screens[screen],
            active_screen: screen
        });
    }

    showNavBar = () => {
        this.setState({ navbar: !this.state.navbar });
    }

    renderNavLinks = () => {
        return (
            <>
                <div id="portfolio" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "portfolio" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="RAW portfolio" src="./themes/Yaru/status/projects.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Portfolio</span>
                </div>
                <div id="about" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "about" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="about RAW" src="./themes/Yaru/status/about.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">About Me</span>
                </div>
                <div id="secrets" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "secrets" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="RAW secrets" src="./themes/Yaru/status/changes-prevent-symbolic.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Secrets</span>
                </div>
                <div id="projects" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "projects" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="RAW projects" src="./themes/Yaru/status/projects.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Projects</span>
                </div>
            </>
        );
    }

    render() {
        return (
            <div className="w-full h-full flex bg-ub-cool-grey text-white select-none relative">
                <div className="md:flex hidden flex-col w-1/4 md:w-1/5 text-sm overflow-y-auto windowMainScreen border-r border-black">
                    {this.renderNavLinks()}
                </div>
                <div onClick={this.showNavBar} className="md:hidden flex flex-col items-center justify-center absolute bg-ub-cool-grey rounded w-6 h-6 top-1 left-1">
                    <div className=" w-3.5 border-t border-white"></div>
                    <div className=" w-3.5 border-t border-white" style={{ marginTop: "2pt", marginBottom: "2pt" }}></div>
                    <div className=" w-3.5 border-t border-white"></div>
                    <div className={(this.state.navbar ? " visible animateShow z-30 " : " invisible ") + " md:hidden text-xs absolute bg-ub-cool-grey py-0.5 px-1 rounded-sm top-full mt-1 left-0 shadow border-black border border-opacity-20"}>
                        {this.renderNavLinks()}
                    </div>
                </div>
                <div className="flex flex-col w-3/4 md:w-4/5 justify-start items-center flex-grow bg-ub-grey overflow-y-auto windowMainScreen">
                    {this.state.screen}
                </div>
            </div>
        );
    }
}

export default AboutVivek;

export const displayAboutVivek = () => {
    return <AboutVivek />;
}

function Portfolio() {
    const openPortfolio = () => {
        window.open("https://rawx18.netlify.app", "_blank");
    };

    return (
        <div className="w-full h-full flex flex-col bg-white">
            <div className="flex justify-between items-center p-3 bg-gray-100 border-b">
                <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-600 ml-4">rawx18.netlify.app</span>
                </div>
                <button
                    onClick={openPortfolio}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm transition-colors flex items-center"
                >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Open in New Tab
                </button>
            </div>
            <div className="flex-1 relative">
                <iframe
                    src="https://rawx18.netlify.app"
                    className="w-full h-full border-0"
                    title="RAW Portfolio Website"
                    loading="lazy"
                />
            </div>
        </div>
    );
}

function About() {
    return (
        <>
            <div className="w-20 md:w-28 my-4 bg-white rounded-full">
                <img className="w-full" src="./images/logos/ryan.jpeg" alt="Ryan Logo" />
            </div>
            <div className=" mt-4 md:mt-8 text-lg md:text-2xl text-center px-1">
                <div>My name is <span className="font-bold">Ryan</span>,</div>
                <div className="font-normal ml-1">I'm an <span className="text-pink-600 font-bold">AI Engineer!</span></div>
            </div>
            <div className=" mt-4 relative md:my-8 pt-px bg-white w-32 md:w-48">
                <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-0"></div>
                <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-0"></div>
            </div>
            <ul className=" mt-4 leading-tight tracking-tight text-sm md:text-base w-5/6 md:w-3/4 emoji-list">
                <li className=" list-pc">I'm an <span className=" font-medium">undergraduate student</span> currently pursuing a BTech in Computer Science at IIIT Gwalior. I've completed several internships - check them out in my portfolio! I don't want to repeat information here since this is just a fun, psycho-crazy techie version of my portfolio. For the main portfolio, visit <a href="https://rawx18.netlify.app" target="_blank" className="text-blue-400 underline">rawx18.netlify.app</a>. (Feel free to connect with me at <a className='text-underline' href='mailto:rawx18.dev@gmail.com'><u>rawx18.dev@gmail.com</u></a> :) )</li>
                <li className=" mt-3 list-building">I enjoy building awesome software that solves practical problems, especially those involving cutting-edge technologies like AI.</li>
            </ul>
        </>
    )
}

function Secrets() {
    return (
        <>
            <div className=" font-medium relative text-2xl mt-2 md:mt-4 mb-4">
                🤫 Secrets & Fun Facts
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>
            <div className="w-10/12 space-y-6">
                <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg">
                    <h3 className="text-lg font-bold text-yellow-400 mb-2">🎬 Movies/Series Addiction</h3>
                    <p className="text-sm text-gray-300">I might have spent over 1000+ hours watching sci-fi, disaster, success stories, and time-travel related movies and series. Don't judge me! 😅</p>
                </div>
                
                <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg">
                    <h3 className="text-lg font-bold text-blue-400 mb-2">🚀 Hidden Project</h3>
                    <p className="text-sm text-gray-300">Project Spydr is my secret AI assistant that I'm building. It's still in stealth mode, but it might just revolutionize how we interact with code! 🤖</p>
                </div>
                
                <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg">
                    <h3 className="text-lg font-bold text-green-400 mb-2">💼 Zentoro - My Emotional Startup</h3>
                    <p className="text-sm text-gray-300">Zentoro might be just another startup to others, but for me, it means everything. It's really close to my heart and represents my entrepreneurial dreams.</p>
                </div>
                
                <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg">
                    <h3 className="text-lg font-bold text-purple-400 mb-2">🎯 Ultimate Goal</h3>
                    <p className="text-sm text-gray-300">Beyond being a billionaire CEO, I secretly want to create the first AI that can replicate JARVIS. I want to be Iron Man, but honestly, Batman would work too! 🦸‍♂️</p>
                </div>
                
                <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg">
                    <h3 className="text-lg font-bold text-red-400 mb-2">💻 Love for Coding</h3>
                    <p className="text-sm text-gray-300">I love getting into "the zone" - locking myself away from distractions just to build something crazy and innovative! 😏</p>
                </div>
            </div>
        </>
    )
}

function Projects() {
    const project_list = [
        {
            name: "SpydrOS Portfolio",
            date: "Jun 2025",
            link: "https://github.com/RAWx18/raw-tech-portfolio",
            description: [
                "Ubuntu-inspired portfolio OS built with React & Tailwind CSS. Features terminal emulation, authentication system, and interactive desktop environment.",
            ],
            domains: ["react", "tailwindcss", "ubuntu", "portfolio"]
        },
        {
            name: "AI Traffic Management System",
            date: "Mar 2024",
            link: "https://github.com/RAWx18",
            description: [
                "Intelligent traffic optimization system using computer vision and machine learning to reduce congestion in smart cities.",
            ],
            domains: ["python", "opencv", "tensorflow", "ai"]
        },
        {
            name: "Quantum Credit Scoring",
            date: "Jan 2024",
            link: "https://github.com/RAWx18",
            description: [
                "Revolutionary credit scoring system leveraging quantum computing principles for enhanced financial risk assessment.",
            ],
            domains: ["quantum", "finance", "machine-learning"]
        },
        {
            name: "Zentoro Platform",
            date: "Dec 2023",
            link: "https://github.com/RAWx18/Zentoro",
            description: [
                "Full-stack web platform for digital transformation with microservices architecture and real-time analytics dashboard.",
            ],
            domains: ["react", "node.js", "microservices", "analytics"]
        },
        {
            name: "Real-time Chat Application",
            date: "Jun 2023",
            link: "https://github.com/RAWx18",
            description: [
                "Scalable real-time messaging platform with end-to-end encryption, file sharing, and group video calls.",
            ],
            domains: ["websockets", "encryption", "webrtc", "react"]
        }
    ];

    const tag_colors = {
        "react": "blue-400",
        "tailwindcss": "blue-300",
        "ubuntu": "orange-500",
        "portfolio": "purple-400",
        "python": "green-400",
        "opencv": "red-400",
        "tensorflow": "yellow-500",
        "ai": "purple-600",
        "quantum": "pink-500",
        "finance": "green-600",
        "machine-learning": "blue-600",
        "node.js": "green-500",
        "microservices": "gray-400",
        "analytics": "indigo-400",
        "iot": "cyan-400",
        "raspberry-pi": "red-500",
        "ml": "purple-500",
        "websockets": "yellow-400",
        "encryption": "red-600",
        "webrtc": "blue-500"
    }

    return (
        <>
            <div className=" font-medium relative text-2xl mt-2 md:mt-4 mb-4">
                Latest Projects
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>

            {
                project_list.map((project, index) => {
                    return (
                        <a key={index} href={project.link} target="_blank" rel="noreferrer" className="flex w-full flex-col px-4">
                            <div className="w-full py-3 px-4 my-2 border border-gray-50 border-opacity-10 rounded hover:bg-gray-50 hover:bg-opacity-5 cursor-pointer transition-all">
                                <div className="flex flex-wrap justify-between items-center">
                                    <div className='flex justify-center items-center'>
                                        <div className=" text-base md:text-lg mr-2 font-semibold">{project.name}</div>
                                    </div>
                                    <div className="text-gray-300 font-light text-sm">{project.date}</div>
                                </div>
                                <ul className=" tracking-normal leading-tight text-sm font-light ml-4 mt-2">
                                    {
                                        project.description.map((desc, index) => {
                                            return <li key={index} className="list-disc mt-1 text-gray-100">{desc}</li>;
                                        })
                                    }
                                </ul>
                                <div className="flex flex-wrap items-start justify-start text-xs py-2 mt-2">
                                    {
                                        (project.domains ?
                                            project.domains.map((domain, index) => {
                                                return <span key={index} className={`px-2 py-1 w-max border border-${tag_colors[domain]} text-${tag_colors[domain]} m-1 rounded-full bg-opacity-10 bg-${tag_colors[domain]}`}>{domain}</span>
                                            })
                                            : null)
                                    }
                                </div>
                            </div>
                        </a>
                    )
                })
            }
        </>
    )
}