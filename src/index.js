import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import http from "http";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import DataLoader from "dataloader";
import express from "express";
import { ApolloServer, AuthenticationError } from "apollo-server-express";

import schema from "./schema";
import resolvers from "./resolvers";
import models, { sequelize } from "./models";
import loaders from "./loaders";

const app = express();

app.use(cors("*"));

app.use(morgan("dev"));

const transporter = nodemailer.createTransport({
	service: "Gmail",
	auth: {
		user: process.env.GMAIL_USER,
		pass: process.env.GMAIL_PASS
	}
});

const getMe = async req => {
	const token = req.headers["x-token"];

	if (token) {
		try {
			return await jwt.verify(token, process.env.SECRET);
		} catch (e) {
			throw new AuthenticationError("Your session expired. Sign in again.");
		}
	}
};

const server = new ApolloServer({
	introspection: true,
	playground: true,
	typeDefs: schema,
	resolvers,
	formatError: error => {
		// remove the internal sequelize error message
		// leave only the important validation error
		const message = error.message
			.replace("SequelizeValidationError: ", "")
			.replace("Validation error: ", "");

		return {
			...error,
			message
		};
	},
	context: async ({ req, connection }) => {
		if (connection) {
			return {
				emailSecret: process.env.SECRET_EMAIL,
				models,
				loaders: {
					user: new DataLoader(keys => loaders.user.batchUsers(keys, models))
				}
			};
		}

		if (req) {
			const me = await getMe(req);

			return {
				transporter,
				models,
				me,
				secret: process.env.SECRET,
				emailSecret: process.env.SECRET_EMAIL,
				loaders: {
					user: new DataLoader(keys => loaders.user.batchUsers(keys, models))
				}
			};
		}
	}
});

server.applyMiddleware({ app, path: "/graphql" });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

const isTest = !!process.env.TEST_DATABASE;
const isProduction = !!process.env.DATABASE_URL;
const port = process.env.PORT || 8000;

sequelize.sync({ force: isTest || isProduction }).then(async () => {
	if (isTest || isProduction) {
		createUsersWithMessages(new Date());
	}

	httpServer.listen({ port }, () => {
		console.log(`Apollo Server on http://localhost:${port}/graphql`);
	});
});

const createUsersWithMessages = async date => {
	await models.User.create(
		{
			firstname: "Lisa",
			lastname: "mezziele",
			phone: "23553244342334",
			email: "hello@123speedracer.com",
			password: "123123123",
			messages: [
				{
					text: "I've seen the character somewhere..hmmmm..",
					createdAt: date.setSeconds(date.getSeconds() + 1)
				}
			]
		},
		{
			include: [models.Message]
		}
	);

	await models.User.create(
		{
			firstname: "Dustin",
			lastname: "Hirtinoshi",
			phone: "235532443434",
			email: "hello@speedracer.com",
			password: "123123123",
			messages: [
				{
					text: "This app is the best! I think it's sooo cool!",
					createdAt: date.setSeconds(date.getSeconds() + 1)
				}
			]
		},
		{
			include: [models.Message]
		}
	);

	await models.User.create(
		{
			firstname: "lemonade",
			lastname: "Da Ninja",
			phone: "23553532434",
			email: "hello@tomoko.com",
			password: "123123123",
			confirmed: true,
			messages: [
				{
					text: "I have to find images to test the machine!",
					createdAt: date.setSeconds(date.getSeconds() + 1)
				}
			]
		},
		{
			include: [models.Message]
		}
	);

	await models.User.create(
		{
			firstname: "henry",
			lastname: "lemonade",
			phone: "401312321312",
			email: "hn473adsa3@gmail.com",
			password: "123123123",
			confirmed: true,
			messages: [
				{
					text: "Thanks everyone :)",
					createdAt: date.setSeconds(date.getSeconds() + 1)
				}
			]
		},
		{
			include: [models.Message]
		}
	);
};
