import ColorCompare from "./ColorCompare";  

function Home() {
    return (
        <>
            <div className="p-2 w-full bg-[#3b3e48] h-11/12 text-amber-50 flex flex-col items-center justify-center">
                {/* <h1 className='ml-2'>Home</h1> */}
                <ColorCompare />
            </div>
            
        </>
    );
}

export default Home;