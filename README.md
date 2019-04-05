# IFTTT Foxx Example Webhook

This Foxx service demonstrates using Foxx for an applet action in IFTTT.

## Installing the service

This example service can be installed using the [ArangoDB web interface](https://docs.arangodb.com/latest/Manual/Programs/WebInterface/Services.html) or the [Foxx CLI](https://github.com/arangodb/foxx-cli):

```sh
$ npm install --global foxx-cli
$ foxx install -u root -P -H http://localhost:8529 -D _system /myfoxx https://github.com/arangodb-foxx/ifttt-example/archive/master.zip

# or without installing foxx-cli:

$ npx foxx-cli install -u root -P -H http://localhost:8529 -D _system /myfoxx https://github.com/arangodb-foxx/ifttt-example/archive/master.zip
```

## Creating the applet

For this demonstration we'll create an applet that calls the Foxx service whenever someone Tweets about ArangoDB.

Start out by [creating a new applet](https://ifttt.com/create) and selecting a Twitter trigger. We'll use the _New tweet from search_ trigger and search for the hashtag `#arangodb`.

![IFTTT Twitter Trigger](ifttt-trigger.png)

Next find and select the _Webhooks_ action.

![Webhooks](ifttt-step1.png)

There's only one possible action using webhooks, so select _Make a web request_.

![Make a web request](ifttt-step2.png)

The next screen allows us to specify how the hook should be invoked.

![Configuring the webhook](ifttt-step3.png)

In order for IFTTT to be able to invoke your webhook, the Foxx service must be accessible from the public internet.

We recommend using a tool like nginx to expose only the routes you want to be public. You can find an example of using nginx in the [ArangoDB Foxx documentation](https://docs.arangodb.com/latest/Manual/Foxx/Guides/Browser.html#using-a-reverse-proxy).

We'll use basic authentication to make this slightly more secure than just leaving this service open to everyone. If you are using this service with the default configuration, this means the username is expected to be `ifttt` with the password `secret`.

In IFTTT these credentials can be passed directly in the URL field. Assuming the service is accessible at `http://example.com/myfoxx/hook` this means the full URL you would use is `http://ifttt:secret@example.com/myfoxx/hook`.

The service expects a request using the `POST` _method_ with an `application/json` _content-type_ and the following _body_:

```json
{
  "user": "<<<{{UserName}}>>>",
  "url": "<<<{{LinkToTweet}}>>>",
  "text": "<<<{{Text}}>>>"
}
```

Note that the `{{double braces}}` are replaced by the actual values of those ingredients. In order to be valid JSON these values also need to be escaped using `<<<triple brackets>>>`. At the time of this writing the IFTTT website indicates that double brackets would be sufficient but this seems to be untrue.

Finally review the applet in the next step and check the _Activity_ tab to ensure the applet is running. You should eventually see entries indicating that the applet ran successfully when revisiting that tab later.

## License

Copyright (c) 2019 ArangoDB Inc. All rights reserved.
