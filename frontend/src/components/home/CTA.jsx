import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const CTA = () => {
    return (
        // CTA Section
        <section id="cta" className="bg-brightRed">
            {/* <!-- Flex container --> */}
            <div className="container mx-auto flex flex-col items-center justify-between space-y-12 px-6 py-24 md:flex-row md:space-y-0 md:py-12">
                {/* <!-- Heading --> */}
                <h2 className="text-center text-5xl font-bold leading-tight text-white md:max-w-xl md:text-left md:text-4xl">
                    Simplyify how your team works today
                </h2>
                {/* <!-- Button --> */}
                <div>
                    <a href="/signup">
                        <Button
                            variant="contained"
                            color="white"
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
        </section>
    );
};
export default CTA;
