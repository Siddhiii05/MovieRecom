const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
    try {
        const filePath = path.join(__dirname, '../CustomData/SearchPagesData.json');
        const raw = fs.readFileSync(filePath, 'utf-8');
        const json = JSON.parse(raw);

        const movies = json.results;

        for (const movie of movies) {
            await prisma.tbl_searchpages.upsert({
                where: { id: movie.id },
                update: {},
                create: {
                    id: movie.id,
                    page: json.page,
                    total_pages: json.total_pages,
                    total_results: json.total_results,

                    title: movie.title,
                    original_title: movie.original_title,
                    original_language: movie.original_language,
                    overview: movie.overview,

                    release_date: movie.release_date ? new Date(movie.release_date) : null,
                    popularity: movie.popularity,

                    poster_path: movie.poster_path,
                    backdrop_path: movie.backdrop_path,

                    vote_average: movie.vote_average,
                    vote_count: movie.vote_count,

                    adult: movie.adult,
                    video: movie.video,

                    genre_ids: movie.genre_ids?.join(',') || null
                },
            });
        }

        console.log('✅ Search pages data inserted successfully');

    } catch (err) {
        console.error('❌ Error inserting search pages data:', err);
    } finally {
        await prisma.$disconnect();
    }
}

main();