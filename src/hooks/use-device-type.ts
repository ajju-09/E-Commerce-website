import { useEffect, useState } from "react";

function useDeviceType(){
    const [deviceType, setDeviceType] = useState('unKnown');

    useEffect(() => {
        const handleReszie = () => {
            setDeviceType(window.innerWidth <= 768 ? 'mobile' : 'desktop')
        }

        handleReszie(); //set initial value
        window.addEventListener('resize', handleReszie);

        return () => window.removeEventListener('resize', handleReszie)
    }, [])

    return deviceType
}

export default useDeviceType