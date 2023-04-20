import { useMemo } from "react"

export const useRatingCount = (windowWidth: number) => {
    
    const getRatingCount = useMemo(() => {
        switch(true) {
            case windowWidth < 598:
                return 2

            case windowWidth < 880:
                return 3

            case windowWidth < 1160:
                return 4

            default: 
                return 5
        }
    }, [windowWidth])

    return getRatingCount
}