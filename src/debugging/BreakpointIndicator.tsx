export function BreakpointIndicator() {
    return (
        <div className="absolute bottom-0 left-0 z-50 h-10 w-20">
            <div className="absolute inset-0 bg-red-500 text-center sm:invisible">ph</div>
            <div className="absolute inset-0 bg-yellow-500 text-center invisible sm:visible md:invisible">
                sm
            </div>
            <div className="absolute inset-0 bg-green-500 text-center invisible md:visible lg:invisible">
                md
            </div>
            <div className="absolute inset-0 bg-blue-500 text-center invisible lg:visible xl:invisible">
                lg
            </div>
            <div className="absolute inset-0 bg-purple-500 text-center invisible xl:visible 2xl:invisible">
                xl
            </div>
            <div className="absolute inset-0 bg-black text-white text-center invisible 2xl:visible">
                2xl
            </div>
        </div>
    );
}
