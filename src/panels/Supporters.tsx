import {
    LogoAAIcon,
    LogoBCIcon,
    LogoBGSIcon,
    LogoCASAIcon,
    LogoIUIcon,
    LogoNFIcon,
} from '../ui/icons';

export function Supporters() {
    return (
        <>
            <div className="flex flex-row gap-8">
                <div>
                    <h3 className="uppercase font-bold text-xs mb-2">Developed by:</h3>
                    <div className="flex flex-row gap-2">
                        <a href="https://www.bgs.ac.uk/" target="_blank" rel="noreferrer">
                            <LogoBGSIcon height={25} fill="#333" />
                        </a>
                        <a
                            href="https://www.ucl.ac.uk/bartlett/casa/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <LogoCASAIcon height={37} fill="#333" />
                        </a>
                        <a
                            href="https://www.aaschool.ac.uk/research/groundlab"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <LogoAAIcon height={28} fill="#333" />
                        </a>
                    </div>
                </div>
                <div>
                    <h3 className="uppercase font-bold text-xs mb-2">With the support of:</h3>
                    <div className="flex flex-row gap-2">
                        <a href="https://www.britishcouncil.org/" target="_blank" rel="noreferrer">
                            <LogoBCIcon height={22} fill="#333" />
                        </a>
                        <a
                            href="https://www.newton-gcrf.org/newton-fund/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <LogoNFIcon height={23} fill="#333" />
                        </a>
                    </div>
                </div>
                <div>
                    <h3 className="uppercase font-bold text-xs mb-2">A special thanks to:</h3>
                    <div className="flex flex-row gap-2">
                        <a href="https://islaurbana.org/english/" target="_blank" rel="noreferrer">
                            <LogoIUIcon height={26} fill="#333" />
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
