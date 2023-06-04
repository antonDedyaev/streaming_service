import {
    getCollection,
    getDynamicUrl,
    getMovies,
    getMoviesByCountry,
    getMoviesByForeign,
    getMoviesByGenre,
} from './moviesHelpers';
import { moviesTest, genersTest, countriesTest } from '@/testAsserts/testItems';

describe('GETCOLLECTION TESTS', () => {
    test('case "new-releases" getCollection should return an array  sorted by release date (newest first)', () => {
        const result = getCollection('new-releases', moviesTest, genersTest, countriesTest);
        expect(JSON.stringify(result)).toBe(
            `[{\"id\":1143242,\"name\":\"Джентльмены\",\"enName\":\"The Gentlemen\",\"posterPreviewURL\":\"https://st.kp.yandex.net/images/film_iphone/iphone360_1143242.jpg\",\"premiereRussia\":\"2020-02-13T00:00:00.000Z\",\"hasIMAX\":true,\"year\":2019,\"ageRating\":18,\"ratingKp\":8.548,\"votesKp\":1398268,\"movieLength\":113,\"genres\":[{\"id\":4,\"name\":\"криминал\",\"enName\":\"crime\"},{\"id\":2,\"name\":\"комедия\",\"enName\":\"comedy\"},{\"id\":5,\"name\":\"боевик\",\"enName\":\"action\"}],\"countries\":[{\"id\":2,\"name\":\"Великобритания\",\"enName\":\"Great Britain\"},{\"id\":3,\"name\":\"США\",\"enName\":\"USA\"}]},{\"id\":462682,\"name\":\"Волк с Уолл-стрит\",\"enName\":\"The Wolf of Wall Street\",\"posterPreviewURL\":\"https://st.kp.yandex.net/images/film_iphone/iphone360_462682.jpg\",\"premiereRussia\":\"2014-02-06T00:00:00.000Z\",\"hasIMAX\":false,\"year\":2013,\"ageRating\":18,\"ratingKp\":7.972,\"votesKp\":1113124,\"movieLength\":180,\"genres\":[{\"id\":1,\"name\":\"драма\",\"enName\":\"drama\"},{\"id\":4,\"name\":\"криминал\",\"enName\":\"crime\"},{\"id\":3,\"name\":\"биография\",\"enName\":\"biography\"},{\"id\":2,\"name\":\"комедия\",\"enName\":\"comedy\"}],\"countries\":[{\"id\":3,\"name\":\"США\",\"enName\":\"USA\"}]},{\"id\":535341,\"name\":\"1+1\",\"enName\":\"Intouchables\",\"posterPreviewURL\":\"https://st.kp.yandex.net/images/film_iphone/iphone360_535341.jpg\",\"premiereRussia\":\"2012-04-26T00:00:00.000Z\",\"hasIMAX\":false,\"year\":2011,\"ageRating\":16,\"ratingKp\":8.805,\"votesKp\":1580297,\"movieLength\":112,\"genres\":[{\"id\":1,\"name\":\"драма\",\"enName\":\"drama\"},{\"id\":2,\"name\":\"комедия\",\"enName\":\"comedy\"},{\"id\":3,\"name\":\"биография\",\"enName\":\"biography\"}],\"countries\":[{\"id\":1,\"name\":\"Франция\",\"enName\":\"France\"}]},{\"id\":251733,\"name\":\"Аватар\",\"enName\":\"Avatar\",\"posterPreviewURL\":\"https://st.kp.yandex.net/images/film_iphone/iphone360_251733.jpg\",\"premiereRussia\":\"2009-12-17T00:00:00.000Z\",\"hasIMAX\":true,\"year\":2009,\"ageRating\":12,\"ratingKp\":7.971,\"votesKp\":976171,\"movieLength\":162,\"genres\":[{\"id\":8,\"name\":\"фантастика\",\"enName\":\"fantasy\"},{\"id\":5,\"name\":\"боевик\",\"enName\":\"action\"},{\"id\":1,\"name\":\"драма\",\"enName\":\"drama\"},{\"id\":9,\"name\":\"приключения\",\"enName\":\"adventures\"}],\"countries\":[{\"id\":3,\"name\":\"США\",\"enName\":\"USA\"}]},{\"id\":41520,\"name\":\"Брат 2\",\"enName\":\"\",\"posterPreviewURL\":\"https://st.kp.yandex.net/images/film_iphone/iphone360_41520.jpg\",\"premiereRussia\":\"2000-05-11T00:00:00.000Z\",\"hasIMAX\":false,\"year\":2000,\"ageRating\":16,\"ratingKp\":8.181,\"votesKp\":846177,\"movieLength\":127,\"genres\":[{\"id\":5,\"name\":\"боевик\",\"enName\":\"action\"},{\"id\":4,\"name\":\"криминал\",\"enName\":\"crime\"}],\"countries\":[{\"id\":4,\"name\":\"Россия\",\"enName\":\"Russia\"}]}]`,
        );
    });
    test('case "best-movies" getCollection should return an array filtered by ratingKp', () => {
        const result = getCollection('best-movies', moviesTest, genersTest, countriesTest);
        expect(JSON.stringify(result)).toBe(
            `[{\"id\":535341,\"name\":\"1+1\",\"enName\":\"Intouchables\",\"posterPreviewURL\":\"https://st.kp.yandex.net/images/film_iphone/iphone360_535341.jpg\",\"premiereRussia\":\"2012-04-26T00:00:00.000Z\",\"hasIMAX\":false,\"year\":2011,\"ageRating\":16,\"ratingKp\":8.805,\"votesKp\":1580297,\"movieLength\":112,\"genres\":[{\"id\":1,\"name\":\"драма\",\"enName\":\"drama\"},{\"id\":2,\"name\":\"комедия\",\"enName\":\"comedy\"},{\"id\":3,\"name\":\"биография\",\"enName\":\"biography\"}],\"countries\":[{\"id\":1,\"name\":\"Франция\",\"enName\":\"France\"}]},{\"id\":1143242,\"name\":\"Джентльмены\",\"enName\":\"The Gentlemen\",\"posterPreviewURL\":\"https://st.kp.yandex.net/images/film_iphone/iphone360_1143242.jpg\",\"premiereRussia\":\"2020-02-13T00:00:00.000Z\",\"hasIMAX\":true,\"year\":2019,\"ageRating\":18,\"ratingKp\":8.548,\"votesKp\":1398268,\"movieLength\":113,\"genres\":[{\"id\":4,\"name\":\"криминал\",\"enName\":\"crime\"},{\"id\":2,\"name\":\"комедия\",\"enName\":\"comedy\"},{\"id\":5,\"name\":\"боевик\",\"enName\":\"action\"}],\"countries\":[{\"id\":2,\"name\":\"Великобритания\",\"enName\":\"Great Britain\"},{\"id\":3,\"name\":\"США\",\"enName\":\"USA\"}]},{\"id\":41520,\"name\":\"Брат 2\",\"enName\":\"\",\"posterPreviewURL\":\"https://st.kp.yandex.net/images/film_iphone/iphone360_41520.jpg\",\"premiereRussia\":\"2000-05-11T00:00:00.000Z\",\"hasIMAX\":false,\"year\":2000,\"ageRating\":16,\"ratingKp\":8.181,\"votesKp\":846177,\"movieLength\":127,\"genres\":[{\"id\":5,\"name\":\"боевик\",\"enName\":\"action\"},{\"id\":4,\"name\":\"криминал\",\"enName\":\"crime\"}],\"countries\":[{\"id\":4,\"name\":\"Россия\",\"enName\":\"Russia\"}]},{\"id\":462682,\"name\":\"Волк с Уолл-стрит\",\"enName\":\"The Wolf of Wall Street\",\"posterPreviewURL\":\"https://st.kp.yandex.net/images/film_iphone/iphone360_462682.jpg\",\"premiereRussia\":\"2014-02-06T00:00:00.000Z\",\"hasIMAX\":false,\"year\":2013,\"ageRating\":18,\"ratingKp\":7.972,\"votesKp\":1113124,\"movieLength\":180,\"genres\":[{\"id\":1,\"name\":\"драма\",\"enName\":\"drama\"},{\"id\":4,\"name\":\"криминал\",\"enName\":\"crime\"},{\"id\":3,\"name\":\"биография\",\"enName\":\"biography\"},{\"id\":2,\"name\":\"комедия\",\"enName\":\"comedy\"}],\"countries\":[{\"id\":3,\"name\":\"США\",\"enName\":\"USA\"}]},{\"id\":251733,\"name\":\"Аватар\",\"enName\":\"Avatar\",\"posterPreviewURL\":\"https://st.kp.yandex.net/images/film_iphone/iphone360_251733.jpg\",\"premiereRussia\":\"2009-12-17T00:00:00.000Z\",\"hasIMAX\":true,\"year\":2009,\"ageRating\":12,\"ratingKp\":7.971,\"votesKp\":976171,\"movieLength\":162,\"genres\":[{\"id\":8,\"name\":\"фантастика\",\"enName\":\"fantasy\"},{\"id\":5,\"name\":\"боевик\",\"enName\":\"action\"},{\"id\":1,\"name\":\"драма\",\"enName\":\"drama\"},{\"id\":9,\"name\":\"приключения\",\"enName\":\"adventures\"}],\"countries\":[{\"id\":3,\"name\":\"США\",\"enName\":\"USA\"}]}]`,
        );
    });

    test('case "imax-movies" getCollection should return an array filtered by hasIMAX', () => {
        const result = getCollection('imax-movies', moviesTest, genersTest, countriesTest);
        expect(JSON.stringify(result)).toBe(
            `[{\"id\":1143242,\"name\":\"Джентльмены\",\"enName\":\"The Gentlemen\",\"posterPreviewURL\":\"https://st.kp.yandex.net/images/film_iphone/iphone360_1143242.jpg\",\"premiereRussia\":\"2020-02-13T00:00:00.000Z\",\"hasIMAX\":true,\"year\":2019,\"ageRating\":18,\"ratingKp\":8.548,\"votesKp\":1398268,\"movieLength\":113,\"genres\":[{\"id\":4,\"name\":\"криминал\",\"enName\":\"crime\"},{\"id\":2,\"name\":\"комедия\",\"enName\":\"comedy\"},{\"id\":5,\"name\":\"боевик\",\"enName\":\"action\"}],\"countries\":[{\"id\":2,\"name\":\"Великобритания\",\"enName\":\"Great Britain\"},{\"id\":3,\"name\":\"США\",\"enName\":\"USA\"}]},{\"id\":251733,\"name\":\"Аватар\",\"enName\":\"Avatar\",\"posterPreviewURL\":\"https://st.kp.yandex.net/images/film_iphone/iphone360_251733.jpg\",\"premiereRussia\":\"2009-12-17T00:00:00.000Z\",\"hasIMAX\":true,\"year\":2009,\"ageRating\":12,\"ratingKp\":7.971,\"votesKp\":976171,\"movieLength\":162,\"genres\":[{\"id\":8,\"name\":\"фантастика\",\"enName\":\"fantasy\"},{\"id\":5,\"name\":\"боевик\",\"enName\":\"action\"},{\"id\":1,\"name\":\"драма\",\"enName\":\"drama\"},{\"id\":9,\"name\":\"приключения\",\"enName\":\"adventures\"}],\"countries\":[{\"id\":3,\"name\":\"США\",\"enName\":\"USA\"}]}]`,
        );
    });

    test('case "fantasy" getCollection should return an array filtered by genre="fantasy"', () => {
        const result = getCollection('fantasy', moviesTest, genersTest, countriesTest);
        expect(JSON.stringify(result)).toBe(
            `[{\"id\":251733,\"name\":\"Аватар\",\"enName\":\"Avatar\",\"posterPreviewURL\":\"https://st.kp.yandex.net/images/film_iphone/iphone360_251733.jpg\",\"premiereRussia\":\"2009-12-17T00:00:00.000Z\",\"hasIMAX\":true,\"year\":2009,\"ageRating\":12,\"ratingKp\":7.971,\"votesKp\":976171,\"movieLength\":162,\"genres\":[{\"id\":8,\"name\":\"фантастика\",\"enName\":\"fantasy\"},{\"id\":5,\"name\":\"боевик\",\"enName\":\"action\"},{\"id\":1,\"name\":\"драма\",\"enName\":\"drama\"},{\"id\":9,\"name\":\"приключения\",\"enName\":\"adventures\"}],\"countries\":[{\"id\":3,\"name\":\"США\",\"enName\":\"USA\"}]}]`,
        );
    });

    test('case "default" getCollection should return a filtered array, under the terms of which is not present in the case', () => {
        const result = getCollection('France', moviesTest, genersTest, countriesTest);
        expect(JSON.stringify(result)).toBe(
            `[{\"id\":535341,\"name\":\"1+1\",\"enName\":\"Intouchables\",\"posterPreviewURL\":\"https://st.kp.yandex.net/images/film_iphone/iphone360_535341.jpg\",\"premiereRussia\":\"2012-04-26T00:00:00.000Z\",\"hasIMAX\":false,\"year\":2011,\"ageRating\":16,\"ratingKp\":8.805,\"votesKp\":1580297,\"movieLength\":112,\"genres\":[{\"id\":1,\"name\":\"драма\",\"enName\":\"drama\"},{\"id\":2,\"name\":\"комедия\",\"enName\":\"comedy\"},{\"id\":3,\"name\":\"биография\",\"enName\":\"biography\"}],\"countries\":[{\"id\":1,\"name\":\"Франция\",\"enName\":\"France\"}]}]`,
        );
    });
});

describe('GETMOVIESBYGENRE TESTS', () => {
    test('getMoviesByGenre should return an array filtered by genre="biography"', () => {
        const result = getMoviesByGenre(moviesTest, 'biography');
        expect(JSON.stringify(result)).toBe(
            `[{\"id\":535341,\"name\":\"1+1\",\"enName\":\"Intouchables\",\"posterPreviewURL\":\"https://st.kp.yandex.net/images/film_iphone/iphone360_535341.jpg\",\"premiereRussia\":\"2012-04-26T00:00:00.000Z\",\"hasIMAX\":false,\"year\":2011,\"ageRating\":16,\"ratingKp\":8.805,\"votesKp\":1580297,\"movieLength\":112,\"genres\":[{\"id\":1,\"name\":\"драма\",\"enName\":\"drama\"},{\"id\":2,\"name\":\"комедия\",\"enName\":\"comedy\"},{\"id\":3,\"name\":\"биография\",\"enName\":\"biography\"}],\"countries\":[{\"id\":1,\"name\":\"Франция\",\"enName\":\"France\"}]},{\"id\":462682,\"name\":\"Волк с Уолл-стрит\",\"enName\":\"The Wolf of Wall Street\",\"posterPreviewURL\":\"https://st.kp.yandex.net/images/film_iphone/iphone360_462682.jpg\",\"premiereRussia\":\"2014-02-06T00:00:00.000Z\",\"hasIMAX\":false,\"year\":2013,\"ageRating\":18,\"ratingKp\":7.972,\"votesKp\":1113124,\"movieLength\":180,\"genres\":[{\"id\":1,\"name\":\"драма\",\"enName\":\"drama\"},{\"id\":4,\"name\":\"криминал\",\"enName\":\"crime\"},{\"id\":3,\"name\":\"биография\",\"enName\":\"biography\"},{\"id\":2,\"name\":\"комедия\",\"enName\":\"comedy\"}],\"countries\":[{\"id\":3,\"name\":\"США\",\"enName\":\"USA\"}]}]`,
        );
    });
});

describe('GETMOVIESBYCOUNTRY TESTS', () => {
    test('getMoviesByCountry should return an array filtered by country="Great Britain"', () => {
        const result = getMoviesByCountry(moviesTest, 'Great Britain');
        expect(JSON.stringify(result)).toBe(
            `[{\"id\":1143242,\"name\":\"Джентльмены\",\"enName\":\"The Gentlemen\",\"posterPreviewURL\":\"https://st.kp.yandex.net/images/film_iphone/iphone360_1143242.jpg\",\"premiereRussia\":\"2020-02-13T00:00:00.000Z\",\"hasIMAX\":true,\"year\":2019,\"ageRating\":18,\"ratingKp\":8.548,\"votesKp\":1398268,\"movieLength\":113,\"genres\":[{\"id\":4,\"name\":\"криминал\",\"enName\":\"crime\"},{\"id\":2,\"name\":\"комедия\",\"enName\":\"comedy\"},{\"id\":5,\"name\":\"боевик\",\"enName\":\"action\"}],\"countries\":[{\"id\":2,\"name\":\"Великобритания\",\"enName\":\"Great Britain\"},{\"id\":3,\"name\":\"США\",\"enName\":\"USA\"}]}]`,
        );
    });
});

describe('GETMOVIESBYFOREIGN TESTS', () => {
    test('getMoviesByForeign should return only foreign movies', () => {
        const result = getMoviesByForeign(moviesTest);
        expect(JSON.stringify(result)).toBe(
            `[{\"id\":535341,\"name\":\"1+1\",\"enName\":\"Intouchables\",\"posterPreviewURL\":\"https://st.kp.yandex.net/images/film_iphone/iphone360_535341.jpg\",\"premiereRussia\":\"2012-04-26T00:00:00.000Z\",\"hasIMAX\":false,\"year\":2011,\"ageRating\":16,\"ratingKp\":8.805,\"votesKp\":1580297,\"movieLength\":112,\"genres\":[{\"id\":1,\"name\":\"драма\",\"enName\":\"drama\"},{\"id\":2,\"name\":\"комедия\",\"enName\":\"comedy\"},{\"id\":3,\"name\":\"биография\",\"enName\":\"biography\"}],\"countries\":[{\"id\":1,\"name\":\"Франция\",\"enName\":\"France\"}]},{\"id\":1143242,\"name\":\"Джентльмены\",\"enName\":\"The Gentlemen\",\"posterPreviewURL\":\"https://st.kp.yandex.net/images/film_iphone/iphone360_1143242.jpg\",\"premiereRussia\":\"2020-02-13T00:00:00.000Z\",\"hasIMAX\":true,\"year\":2019,\"ageRating\":18,\"ratingKp\":8.548,\"votesKp\":1398268,\"movieLength\":113,\"genres\":[{\"id\":4,\"name\":\"криминал\",\"enName\":\"crime\"},{\"id\":2,\"name\":\"комедия\",\"enName\":\"comedy\"},{\"id\":5,\"name\":\"боевик\",\"enName\":\"action\"}],\"countries\":[{\"id\":2,\"name\":\"Великобритания\",\"enName\":\"Great Britain\"},{\"id\":3,\"name\":\"США\",\"enName\":\"USA\"}]},{\"id\":462682,\"name\":\"Волк с Уолл-стрит\",\"enName\":\"The Wolf of Wall Street\",\"posterPreviewURL\":\"https://st.kp.yandex.net/images/film_iphone/iphone360_462682.jpg\",\"premiereRussia\":\"2014-02-06T00:00:00.000Z\",\"hasIMAX\":false,\"year\":2013,\"ageRating\":18,\"ratingKp\":7.972,\"votesKp\":1113124,\"movieLength\":180,\"genres\":[{\"id\":1,\"name\":\"драма\",\"enName\":\"drama\"},{\"id\":4,\"name\":\"криминал\",\"enName\":\"crime\"},{\"id\":3,\"name\":\"биография\",\"enName\":\"biography\"},{\"id\":2,\"name\":\"комедия\",\"enName\":\"comedy\"}],\"countries\":[{\"id\":3,\"name\":\"США\",\"enName\":\"USA\"}]},{\"id\":251733,\"name\":\"Аватар\",\"enName\":\"Avatar\",\"posterPreviewURL\":\"https://st.kp.yandex.net/images/film_iphone/iphone360_251733.jpg\",\"premiereRussia\":\"2009-12-17T00:00:00.000Z\",\"hasIMAX\":true,\"year\":2009,\"ageRating\":12,\"ratingKp\":7.971,\"votesKp\":976171,\"movieLength\":162,\"genres\":[{\"id\":8,\"name\":\"фантастика\",\"enName\":\"fantasy\"},{\"id\":5,\"name\":\"боевик\",\"enName\":\"action\"},{\"id\":1,\"name\":\"драма\",\"enName\":\"drama\"},{\"id\":9,\"name\":\"приключения\",\"enName\":\"adventures\"}],\"countries\":[{\"id\":3,\"name\":\"США\",\"enName\":\"USA\"}]}]`,
        );
    });
});

describe('GETMOVIES TESTS', () => {
    test('getMovies should return an array filtered by 2000 year', () => {
        const result = getMovies(moviesTest, '2000', genersTest, countriesTest);
        expect(JSON.stringify(result)).toBe(
            `[{\"id\":41520,\"name\":\"Брат 2\",\"enName\":\"\",\"posterPreviewURL\":\"https://st.kp.yandex.net/images/film_iphone/iphone360_41520.jpg\",\"premiereRussia\":\"2000-05-11T00:00:00.000Z\",\"hasIMAX\":false,\"year\":2000,\"ageRating\":16,\"ratingKp\":8.181,\"votesKp\":846177,\"movieLength\":127,\"genres\":[{\"id\":5,\"name\":\"боевик\",\"enName\":\"action\"},{\"id\":4,\"name\":\"криминал\",\"enName\":\"crime\"}],\"countries\":[{\"id\":4,\"name\":\"Россия\",\"enName\":\"Russia\"}]}]`,
        );
    });

    test('getMovies should return an array filtered by genre="adventures"', () => {
        const result = getMovies(moviesTest, 'adventures', genersTest, countriesTest);
        expect(JSON.stringify(result)).toBe(
            `[{\"id\":251733,\"name\":\"Аватар\",\"enName\":\"Avatar\",\"posterPreviewURL\":\"https://st.kp.yandex.net/images/film_iphone/iphone360_251733.jpg\",\"premiereRussia\":\"2009-12-17T00:00:00.000Z\",\"hasIMAX\":true,\"year\":2009,\"ageRating\":12,\"ratingKp\":7.971,\"votesKp\":976171,\"movieLength\":162,\"genres\":[{\"id\":8,\"name\":\"фантастика\",\"enName\":\"fantasy\"},{\"id\":5,\"name\":\"боевик\",\"enName\":\"action\"},{\"id\":1,\"name\":\"драма\",\"enName\":\"drama\"},{\"id\":9,\"name\":\"приключения\",\"enName\":\"adventures\"}],\"countries\":[{\"id\":3,\"name\":\"США\",\"enName\":\"USA\"}]}]`,
        );
    });

    test('getMovies should return an array filtered by country="Russia"', () => {
        const result = getMovies(moviesTest, 'Russia', genersTest, countriesTest);
        expect(JSON.stringify(result)).toBe(
            `[{\"id\":41520,\"name\":\"Брат 2\",\"enName\":\"\",\"posterPreviewURL\":\"https://st.kp.yandex.net/images/film_iphone/iphone360_41520.jpg\",\"premiereRussia\":\"2000-05-11T00:00:00.000Z\",\"hasIMAX\":false,\"year\":2000,\"ageRating\":16,\"ratingKp\":8.181,\"votesKp\":846177,\"movieLength\":127,\"genres\":[{\"id\":5,\"name\":\"боевик\",\"enName\":\"action\"},{\"id\":4,\"name\":\"криминал\",\"enName\":\"crime\"}],\"countries\":[{\"id\":4,\"name\":\"Россия\",\"enName\":\"Russia\"}]}]`,
        );
    });
});

describe('GETDYNAMICURL TESTS', () => {
    test('getMovies should return dynamic url', () => {
        const result = getDynamicUrl({
            genres: ['action'],
            countries: ['Russia'],
            ratingKp: 0,
            votesKp: 846177,
            director: '',
            actor: '',
        });
        expect(JSON.stringify(result)).toBe(`\"/action/russia?votesKp_gte=846177\"`);
    });
});
