import arrow from "../assets/right-arrow.svg"
import notebook from "../assets/notebook.svg"
import unlocked from "../assets/unlocked.svg"
import downArrow from "../assets/down-arrow.svg"

export function Header() {
    return (
        <header className="mt-1.5 border-t-[1px] border-gray-300 p-5 flex gap-6 text-sm text-gray-400 justify-between">
            <nav className="flex gap-6">
                <div className="mr-4 cursor-pointer pt-1.5">
                    <img src={arrow} alt="" width={10} height={10}/>
                </div>
                <ul className="flex list-none gap-4">
                    <li>
                        <div className="text-gray-400 flex items-center gap-2 hover:cursor-pointer">
                            <img src={notebook} alt="" width={14} height={14}/>
                            <span className="underline font-bold">Main</span>
                        </div>
                    </li>
                    <span>/</span>
                    <li>
                        <div className="text-gray-400 flex items-center gap-2 hover:cursor-pointer">
                            <span>Getting started</span>
                        </div>
                    </li>
                    <span>/</span>
                    <li>
                        <div className="text-gray-400 flex items-center gap-2 hover:cursor-pointer">
                            <span>Front-end developer test project</span>
                        </div>
                    </li>
                </ul> 
            </nav>
            <nav>
                <ul className="flex list-none gap-4">
                    <li>
                        <div className="text-gray-400 flex items-center gap-2 hover:cursor-pointer">
                            <img src={unlocked} alt=""/>
                            <span>Editing</span>
                        </div>
                    </li>
                    <span>|</span>
                    <li>
                        <div className="text-gray-400 flex items-center gap-2 hover:cursor-pointer">
                            <span className="text-blue-800 font-bold">Publish Space</span>
                            <img src={downArrow} alt="" width="20px" height="20px"/>
                        </div>
                    </li>
                </ul>
            </nav>
        </header>
    )
}