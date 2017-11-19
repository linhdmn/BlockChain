var config = {
	expressPort: 3001,
	client: {
		mongodb: {
			defaultDatabase: "BlockChain",
			defaultCollection: "users",
			defaultUri: "mongodb://localhost:27017"
		},
		//mockarooUrl: "http://www.mockaroo.com/536ecbc0/download?count=1000&key=48da1ee0"
	},
	makerMongoDBURI: "mongodb://localhost:27017/BlockChain",
	userCollection: "users",
	walletCollection: "wallets"
};

module.exports = config;
