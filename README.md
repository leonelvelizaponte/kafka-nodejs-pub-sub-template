# Kafka with Node.js - TEMPLATE

This code sets up a Kafka consumer and publisher in Node.js using the `kafkajs` library. The environment variables needed to connect to the Kafka broker are set in a `.env` file and accessed using the `dotenv` library.

## ✅  Requirements

To run this code, you'll need:

-   Node.js installed on your machine
-   A Kafka broker to connect to
-   A `.env` file with the following environment variables:
    -   `NODE_ENV`: the environment (e.g. "production")
    -   `KAFKA_CLIENT_ID`: the client ID for your Kafka application
    -   `KAFKA_BROKERS`: comma-separated list of Kafka brokers to connect to
    -   `KAFKA_USERNAME`: username for SASL authentication
    -   `KAFKA_PASSWORD`: password for SASL authentication
    -   `KAFKA_GROUP_ID`: (optional) group ID for the Kafka consumer
    -   `KAFKA_ACTION`: set to "CONSUMER" for the consumer, or "PUBLISHER" for the publisher
    -   `KAFKA_TOPIC_1`: the name of the first Kafka topic to subscribe to or publish to
    -   `KAFKA_TOPIC_2`: the name of the second Kafka topic to subscribe to or publish to

## 🤖 Installation

1.  Clone this repository to your local machine
2.  Navigate to the repository directory in your terminal
3.  Run `npm install` to install the required dependencies
4.  Create a `.env` file with the environment variables listed above
5. Run `node .` 

## Usage

To run the `consumer` mode or `publisher` mode, set on `.env` the variable `KAFKA_ACTION` to "CONSUMER" or "PUBLISHER".

Note that the consumer and publisher cannot be run at the same time, since they use the same environment variable (`KAFKA_ACTION`) to determine their behavior.

When the consumer is running, it will log the messages it receives from the subscribed Kafka topics to the console. When the publisher is running, it will publish two messages to the specified Kafka topics.

## About author - Leonel Veliz 👾

- [Github](https://github.com/leonelvelizaponte "@leonelvelizaponte")
- [Website](http://leonelveliz.com/ "leonelveliz.com")

## 🤝 Support

Contributions, issues, and feature requests are welcome!

Give a ⭐️ if you like this project!

## License

This code is licensed under the MIT License.
