import React, { useState } from 'react';
import $ from 'jquery';

export function Settings(props) {
    const [activeTab, setActiveTab] = useState('background');
    
    const wallpapers = {
        "wall-0": "./images/wallpapers/spydr_background.png",
        "wall-1": "./images/wallpapers/lando.jpg",
        "wall-2": "./images/wallpapers/mclaren.webp",
        "wall-3": "./images/wallpapers/f1.jpg",
    };

    let changeBackgroundImage = (e) => {
        props.changeBackgroundImage($(e.target).data("path"));
    }

    const renderBackgroundSettings = () => (
        <div className="p-6">
            <h2 className="text-white text-xl mb-4">Background</h2>
            <div className="mb-6">
                <div className="md:w-2/5 w-2/3 h-48 m-auto border-2 border-gray-600 rounded-lg overflow-hidden" 
                     style={{ backgroundImage: `url(${wallpapers[props.currBgImgName]})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center center" }}>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {
                    Object.keys(wallpapers).map((name, index) => {
                        return (
                            <div 
                                key={index} 
                                tabIndex="1" 
                                onFocus={changeBackgroundImage} 
                                onClick={changeBackgroundImage}
                                data-path={name} 
                                className={`
                                    ${(name === props.currBgImgName) ? "border-orange-500 ring-2 ring-orange-500" : "border-gray-600 hover:border-gray-400"} 
                                    aspect-video cursor-pointer outline-none border-2 rounded-lg overflow-hidden transition-all duration-200 hover:scale-105
                                `} 
                                style={{ backgroundImage: `url(${wallpapers[name]})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center center" }}
                            >
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );

    const renderAboutSystem = () => (
        <div className="p-6">
            <h2 className="text-white text-xl mb-6">About</h2>
            <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <img src="./themes/Yaru/status/spydr.png" alt="SpydrOS" className="w-16 h-16" />
                    <div>
                        <h3 className="text-white text-lg font-semibold">SpydrOS</h3>
                        <p className="text-gray-300">Version 11.8.5 LTS</p>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div className="space-y-3">
                        <div className="flex justify-between border-b border-gray-700 pb-2">
                            <span className="text-gray-400">OS Name:</span>
                            <span className="text-white">SpydrOS</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-700 pb-2">
                            <span className="text-gray-400">OS Type:</span>
                            <span className="text-white">64-bit</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-700 pb-2">
                            <span className="text-gray-400">GNOME Version:</span>
                            <span className="text-white">42.5</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-700 pb-2">
                            <span className="text-gray-400">Windowing System:</span>
                            <span className="text-white">Wayland</span>
                        </div>
                    </div>
                    
                    <div className="space-y-3">
                        <div className="flex justify-between border-b border-gray-700 pb-2">
                            <span className="text-gray-400">Processor:</span>
                            <span className="text-white">AMD® Ryzen7™ 9th gen</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-700 pb-2">
                            <span className="text-gray-400">Memory:</span>
                            <span className="text-white">64.0 GiB</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-700 pb-2">
                            <span className="text-gray-400">Disk Capacity:</span>
                            <span className="text-white">2 TB</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-700 pb-2">
                            <span className="text-gray-400">Graphics:</span>
                            <span className="text-white">Nvidia RTX® 5090 32GB Vram</span>
                        </div>
                    </div>
                </div>

                <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">Device Name</h4>
                    <p className="text-gray-300 text-sm">raw-portfolio-os</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="w-full flex flex-col flex-grow z-20 max-h-full overflow-hidden windowMainScreen select-none bg-ub-cool-grey">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <h1 className="text-white text-xl font-semibold">Settings</h1>
            </div>
            
            {/* Navigation Tabs */}
            <div className="flex border-b border-gray-700">
                <button
                    className={`px-6 py-3 text-sm font-medium transition-colors ${
                        activeTab === 'background' 
                            ? 'text-orange-500 border-b-2 border-orange-500' 
                            : 'text-gray-400 hover:text-white'
                    }`}
                    onClick={() => setActiveTab('background')}
                >
                    Background
                </button>
                <button
                    className={`px-6 py-3 text-sm font-medium transition-colors ${
                        activeTab === 'about' 
                            ? 'text-orange-500 border-b-2 border-orange-500' 
                            : 'text-gray-400 hover:text-white'
                    }`}
                    onClick={() => setActiveTab('about')}
                >
                    About
                </button>
            </div>
            
            {/* Content Area */}
            <div className="flex-1 overflow-y-auto">
                {activeTab === 'background' && renderBackgroundSettings()}
                {activeTab === 'about' && renderAboutSystem()}
            </div>
        </div>
    )
}

export default Settings

export const displaySettings = () => {
    return <Settings />;
}