import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import db from "./_db";

const resolvers = {
    Query: {
        games() {
            return db.games;
        },

        game: (_: any, { id }: { id: string }) =>
            db.games.find((el) => el.id === id),

        reviews: () => {
            return db.reviews;
        },

        review: (_: any, { id }: { id: string }) =>
            db.reviews.find((el) => el.id === id),

        authors: () => db.authors,

        author: (_: any, { id }: { id: string }) =>
            db.authors.find((el) => el.id === id),
    },
    Game: {
        reviews: (parent: (typeof db.games)[0]) =>
            db.reviews.filter((el) => el.game_id === parent.id),
    },
    Author: {
        reviews(parent: (typeof db.authors)[0]) {
            return db.reviews.filter((el) => el.author_id === parent.id);
        },
    },
    Review: {
        game: (parent: (typeof db.reviews)[0]) =>
            db.games.find((el) => el.id === parent.game_id),
        author: (parent: (typeof db.reviews)[0]) =>
            db.authors.find((el) => el.id === parent.author_id),
    },
    Mutation: {
        deleteGame: (_: any, { id }: { id: string }) => {
            db.games = db.games.filter((game) => game.id !== id);
            return db.games;
        },
        addGame: (
            _: any,
            { game }: { game: { title: string; platform: string[] } }
        ) => {
            const newGame = {
                id: Math.floor(Math.random() * 10000).toString(),
                ...game,
            };
            db.games.push(newGame);
            return newGame;
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`🚀 Server ready at: ${url}`);
