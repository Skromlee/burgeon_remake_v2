import { Button } from "@mui/material";
import { useDispatch } from "react-redux";

const Hero = () => {
    return (
        <section id="hero">
            {/* Flex container */}
            <div className="container flex flex-col-reverse items-center px-6 mx-auto mt-10 space-y-0 md:space-y-0 md:flex-row">
                {/* Left Item */}
                <div className="flex flex-col mb-32 space-y-12 md:w-1/2">
                    <h1 className="max-w-md text-4xl font-bold text-center md:text-5xl md:text-left">
                        Bing everyone together to mange the parcels
                    </h1>
                    <p className="max-w-sm text-center text-darkGrayishBlue md:text-left">
                        Burgeon makes it simple for teams to plan day-to-day
                        tasks while keeping the parcels in view.
                    </p>
                    <div className="flex justify-center md:justify-start">
                        <a href="/signup">
                            <Button
                                variant="contained"
                                sx={{
                                    borderRadius: 28,
                                    padding: 1.6,
                                    paddingX: 4,
                                }}
                            >
                                Get Started
                            </Button>
                        </a>
                    </div>
                </div>
                {/* Right Item */}
                <div className="md:w-1/2">
                    <img
                        src="/images/illustration-intro.svg"
                        alt="illustration-intro-img"
                    />
                </div>
            </div>
        </section>
    );
};
export default Hero;
