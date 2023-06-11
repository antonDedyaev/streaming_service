export class CreateFilmDto{
    id:number;
    type:string;
    name:string;
    enName:string;
    posterUrl:string; 		
    posterPreviewURL:string;	
    premiereRussia:string; 		
    hasIMAX:boolean; 		
    year:number;
    description:string;
    shortDescription:string;
    ageRating:number;
    ratingKp:number;  		
    votesKp:number;   		
    movieLength:number;
} 