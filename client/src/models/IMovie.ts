export default interface IMovie {
    id: number
    type: string
	name: string
    enName: string
    posterUrl: string
    logo?: string
    year: number
    description: string
    shortDescription: string
    ageRating: number
    ratingKp: number
    votesKp: number
    movieLength: number
    genres: any[]
    countries: any[]
    persons: any[]
    place?: number
}