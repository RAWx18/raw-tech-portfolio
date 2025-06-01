import React, { Component } from 'react';
import $ from 'jquery';

export class Trash extends Component {
    constructor() {
        super();
        this.trashItems = [
            {
                name: "AI small models Projects",
                icon: "./themes/Yaru/system/folder.png",
                description: "Early explorations in machine learning that shaped my understanding of AI systems"
            },
            {
                name: "First Portfolio",
                icon: "./themes/Yaru/system/folder.png",
                description: "My very first attempt at a personal website - crude but nostalgic"
            },
            {
                name: "College App.zip",
                icon: "./themes/filetypes/zip.png",
                description: "A fest management system which I built during college that taught me about OOPS concepts and teamwork"
            },
            {
                name: "AR Glasses",
                icon: "./themes/Yaru/system/folder.png",
                description: "Collection of sleepless nights and caffeine-fueled working sprints that sparked my creativity"
            },
        ];
        this.state = {
            empty: false,
            selectedItem: null
        }
    }

    componentDidMount() {
        // get user preference from local-storage
        let wasEmpty = localStorage.getItem("trash-empty");
        if (wasEmpty !== null && wasEmpty !== undefined) {
            if (wasEmpty === "true") this.setState({ empty: true });
        }
    }

    focusFile = (e, item) => {
        // icon
        $(e.target).children().get(0).classList.toggle("opacity-60");
        // file name
        $(e.target).children().get(1).classList.toggle("bg-ub-orange");
        
        // Set the selected item for the description panel
        this.setState({ selectedItem: item });
    }

    emptyTrash = () => {
        this.setState({ empty: true });
        localStorage.setItem("trash-empty", true);
    };

    restoreTrash = () => {
        this.setState({ empty: false });
        localStorage.setItem("trash-empty", false);
    };

    emptyScreen = () => {
        return (
            <div className="flex-grow flex flex-col justify-center items-center">
                <img className="w-24" src="./themes/Yaru/status/user-trash-symbolic.svg" alt="Ubuntu Trash" />
                <span className="font-bold mt-4 text-xl px-1 text-gray-400">Memory Lane is Empty</span>
                <p className="text-gray-500 mt-2 text-center max-w-md">
                    Here are all the unfinished projects that shaped me, even if they never reached the top.
                    <br />
                    <span className="text-ub-orange cursor-pointer hover:underline" onClick={this.restoreTrash}>Restore memories</span>
                </p>
            </div>
        );
    }

    showTrashItems = () => {
        return (
            <div className="flex flex-grow overflow-hidden">
                <div className="flex-grow-0 w-2/3 ml-4 flex flex-wrap items-start content-start justify-start overflow-y-auto windowMainScreen">
                    {
                        this.trashItems.map((item, index) => {
                            return (
                                <div 
                                    key={index} 
                                    tabIndex="1" 
                                    onFocus={(e) => this.focusFile(e, item)} 
                                    onBlur={(e) => this.focusFile(e, null)} 
                                    className="flex flex-col items-center text-sm outline-none w-24 my-2 mx-4 cursor-pointer"
                                >
                                    <div className="w-16 h-16 flex items-center justify-center">
                                        <img src={item.icon} alt="File Icon" className="transition-all duration-200" />
                                    </div>
                                    <span className="text-center rounded px-1 py-0.5 transition-colors duration-200">{item.name}</span>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="flex-grow-0 w-1/3 border-l border-gray-700 p-4 bg-black bg-opacity-20">
                    {this.state.selectedItem ? (
                        <div className="h-full flex flex-col">
                            <h3 className="text-lg font-bold text-ub-orange">{this.state.selectedItem.name}</h3>
                            <p className="mt-2 text-gray-300 text-sm flex-grow">
                                {this.state.selectedItem.description}
                            </p>
                            <div className="text-xs text-gray-500 mt-4">
                                These projects may be in the "trash" but they're treasured memories of my learning journey.
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center text-gray-500 text-sm">
                            Select a project to view details
                        </div>
                    )}
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="w-full h-full flex flex-col bg-ub-cool-grey text-white select-none">
                <div className="flex items-center justify-between w-full bg-ub-warm-grey bg-opacity-40 text-sm">
                    <span className="font-bold ml-2">Memory Lane</span>
                    <div className="flex">
                        <div onClick={this.restoreTrash} className="border border-black bg-black bg-opacity-50 px-3 py-1 my-1 mx-1 rounded hover:bg-opacity-80 cursor-pointer">Restore</div>
                        <div onClick={this.emptyTrash} className="border border-black bg-black bg-opacity-50 px-3 py-1 my-1 mx-1 rounded hover:bg-opacity-80 cursor-pointer">Clear</div>
                    </div>
                </div>
                {
                    (this.state.empty
                        ? this.emptyScreen()
                        : this.showTrashItems()
                    )
                }
            </div>
        )
    }
}

export default Trash;

export const displayTrash = () => {
    return <Trash> </Trash>;
}