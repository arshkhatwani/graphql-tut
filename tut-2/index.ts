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
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`🚀 Server ready at: ${url}`);
