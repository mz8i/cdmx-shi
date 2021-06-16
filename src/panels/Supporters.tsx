import { LogoAAIcon, LogoBCIcon, LogoBGSIcon, LogoCASAIcon, LogoNFIcon } from '../ui/icons';

export function Supporters() {
    return (
        <>
            <div className="flex flex-row gap-10">
                <div>
                    <h3 className="uppercase font-bold text-xs mb-2">Developed by:</h3>
                    <div className="flex flex-row gap-2">
                        <a href="https://www.bgs.ac.uk/" target="_blank" rel="noreferrer">
                            <LogoBGSIcon height={28} fill="#333" />
                        </a>
                        <a
                            href="https://www.ucl.ac.uk/bartlett/casa/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <LogoCASAIcon height={40} fill="#333" />
                        </a>
                        <a
                            href="https://www.aaschool.ac.uk/research/groundlab"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <LogoAAIcon height={31} fill="#333" />
                        </a>
                    </div>
                </div>
                <div>
                    <h3 className="uppercase font-bold text-xs mb-2">With the support of:</h3>
                    <div className="flex flex-row gap-2">
                        <a href="https://www.britishcouncil.org/" target="_blank" rel="noreferrer">
                            <LogoBCIcon height={25} fill="#333" />
                        </a>
                        <a
                            href="https://www.newton-gcrf.org/newton-fund/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <LogoNFIcon height={25} fill="#333" />
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
