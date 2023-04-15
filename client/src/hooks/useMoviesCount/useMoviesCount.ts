import { useMemo } from "react"

export const useMoviesCount = (windowWidth: number) => {
    
    const getMoviesCount = useMemo(() => {
        switch(true) {
            case windowWidth < 400:
                return 2

            case windowWidth < 512:
                return 3

            case windowWidth < 600:
                return 4

            case windowWidth < 745:
                return 3

            case windowWidth < 920:
                return 4

            case windowWidth < 1097:
                return 5

            case windowWidth < 1270:
                return 6

            default: 
                return 7
        }
    }, [windowWidth])

    return getMoviesCount
}