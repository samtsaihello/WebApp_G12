import Navbar from './Navbar.jsx';

function About() {
    return(
        <>
            <div className="p-2 w-full bg-[#3b3e48] h-11/12 text-amber-50 flex flex-col items-center justify-center">
                <h1 className="ml-2">About</h1>
                <div className="w-full h-1/2 flex justify-evenly mt-4">
                    <div className=" w-4/15 border-gray-600 border-2 p-3 rounded-lg h-full">

                    </div>
                    <div className=" w-4/15 border-gray-600 border-2 p-3 rounded-lg h-full">

                    </div>
                    <div className=" w-4/15 border-gray-600 border-2 p-3 rounded-lg h-full">

                    </div>
                </div>
            </div>
        </>
    );
}

export default About;